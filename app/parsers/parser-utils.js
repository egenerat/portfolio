"use strict";
const cheerio = require("cheerio");
const logger = require("../core/logger.js");
const http = require("../core/http.js");
const map = require("../config/mappings/parser-mapping.js");

const getPageParser = ($) => {
    const head = $("title").text();
    const pattern = Object.keys(map.PARSER_MAP)
        .find(key => head.includes(key));
    if (pattern) {
        const parser = map.PARSER_MAP[pattern];
        return Promise.resolve(parser($));
    }
    else {
        return Promise.reject("No parser found for this page");
    }
};

module.exports.parsePage = (url) => {
    const transform = (body) => {
        return cheerio.load(body);
    };
    return http.openPage(url, transform)
        .then(getPageParser)
        .catch(err => logger.error(`${url}\n${err}`));
};

module.exports.aggregate = (dictList) => {
    return dictList.reduce((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue };
    }, {});
};

module.exports.parseMultiPages = (urlList) => {
    let promises = [];
    urlList.forEach(element => {
        promises.push(module.exports.parsePage(element));
    });
    return Promise.all(promises)
        .then(module.exports.aggregate)
        .catch(reason => {
            if (reason.name === "RequestError") {
                logger.error(reason.message);
            }
            else if (reason.name === "StatusCodeError") {
                logger.error(`Status ${reason.statusCode}, ${reason.options.uri}`);
            }
            else {
                logger.error(`Status ${reason.statusCode}, ${reason.options.uri}`);
            }
        });
};
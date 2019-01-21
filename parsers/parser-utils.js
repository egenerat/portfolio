"use strict";
const cheerio = require("cheerio");
const constants = require("../constants/constants.js");
const rpn = require("request-promise-native");
const logger = require("../logger.js");
const map = require("./parser-mapping.js");

const getPageParser = (url) => {
    const res = Object.entries(map.PARSER_MAP)
        .find(([key, value]) => url.includes(key));
    if (res) {
        const [pattern, parser] = res;
        return parser;
    }
    else {
        return null;
    }
}

module.exports.parsePage = (url) => {
    const extractFunction = getPageParser(url);
    if (extractFunction) {
        let options = {
            uri: url,
            headers: constants.HEADERS,
            transform: (body) => {
                return cheerio.load(body);
            }
        };
        return rpn(options)
            .then(extractFunction)
    }
    else {
        logger.error(`No parser found for the url: ${url}`);
        return Promise.resolve(null);
    }
};

module.exports.aggregate = (dictList) => {
    return dictList.reduce((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue };
    }, {});
};

module.exports.parseMultiPages = (urlDict, extractFunctionDict) => {
    let promises = [];
    Object.keys(urlDict).forEach(element => {
        promises.push(module.exports.parsePage(urlDict[element], extractFunctionDict[element]));
    });
    return Promise.all(promises)
        .then(module.exports.aggregate)
        .catch(reason => {
            if (reason.name === "RequestError") {
                console.log(reason.message);
            }
            else if (reason.name === "StatusCodeError") {
                console.log(`Status ${reason.statusCode}, ${reason.options.uri}`);
            }
        });
};

module.exports.extractLinesTable = ($, selector, skip_lines, column_value) => {
    const result = {};
    skip_lines = skip_lines !== undefined ? skip_lines: 1;
    column_value = column_value !== undefined ? column_value : 1;
    $(selector).slice(skip_lines).each( function() {
        const children = $(this).children();
        result[children.eq(0).text()] = parseFloat(children.eq(column_value).text());
    });
    return result;
};
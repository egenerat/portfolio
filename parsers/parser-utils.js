"use strict";
const cheerio = require("cheerio");
const constants = require("../constants/constants.js");
const rpn = require("request-promise-native");

module.exports.parsePage = (url, extractFunction) => {
    let options = {
        uri: url,
        headers: constants.HEADERS,
        transform: (body) => {
            return cheerio.load(body);
        }
    };
    return rpn(options)
        .then(extractFunction)
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
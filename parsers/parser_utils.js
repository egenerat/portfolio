"use strict";
const cheerio = require("cheerio");
const constants = require("../constants");
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
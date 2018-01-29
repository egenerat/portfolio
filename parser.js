"use strict";
const business = require("./business");
const constants = require("./constants");
const utils = require("./utils");
const parserUtils = require("./parsers/parser_utils");


Promise.all(constants.URLS.map((url) =>
    parserUtils.parsePage(url, extractEtfInformation)
        .then(business.filter)
        .catch(reason => {
            if (reason.name === "RequestError") {
                console.log(reason.message);
            }
            else if (reason.name === "StatusCodeError") {
                console.log(`Status ${reason.statusCode}, ${reason.options.uri}`);
            }
        })
))
    .then(utils.removeEmptyValues)
    .then(utils.transformToCsv)
    .then(result => utils.saveFile(constants.exportFile, result))
    .catch(console.error);

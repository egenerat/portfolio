"use strict";
const business = require("./business");
const constants = require("./constants/constants.js");
const utils = require("./utils");
const parser_utils = require("./parsers/parser-utils");


Promise.all(constants.URLS.map((url) =>
    parser_utils.parsePage(url, extractEtfInformation)
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

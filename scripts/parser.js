#! /usr/bin/env node
"use strict";
const business = require("./business.js");
const constants = require("./constants/constants.js");
const logger = require("./logger.js");
const utils = require("./utils.js");
const parser_utils = require("./parsers/parser-utils.js");


Promise.all(constants.URLS.map((url) =>
    parser_utils.parsePage(url)
        .then(business.filter)
        .catch(reason => {
            if (reason.name === "RequestError") {
                logger.info(reason.message);
            }
            else if (reason.name === "StatusCodeError") {
                logger.info(`Status ${reason.statusCode}, ${reason.options.uri}`);
            }
        })
))
    .then(utils.removeEmptyValues)
    .then(utils.transformToCsv)
    .then(result => utils.saveFile(constants.EXPORT_FILE, result))
    .catch(logger.error);

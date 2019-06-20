#! /usr/bin/env node
"use strict";
const business = require("../app/core/business.js");
const constants = require("../app/config/constants/constants.js");
const logger = require("../app/core/logger.js");
const utils = require("../app/core/utils.js");
const parser_utils = require("../app/parsers/parser-utils.js");


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

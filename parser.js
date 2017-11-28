"use strict";
const business = require("./business");
const constants = require("./constants");
const utils = require("./utils");
const parserUtils = require("./parser_utils");
var errors = require("request-promise-native/errors");


Promise.all(constants.URLS.map((url) =>
    parserUtils.parsePage(url, extractEtfInformation)
        .then(business.filter)
        .catch(errors.StatusCodeError, function (reason) {
            // The server responded with a status codes other than 2xx.
            console.error(`Status code ${reason.statusCode}`);
            console.error(reason.options.uri);
        })
        // .catch(errors.RequestError, (reason) => {
        //     // The request failed due to technical reasons.
        //     // reason.cause is the Error object Request would pass into a callback.
        //     console.log(reason)
        // })
))
    .then(utils.removeEmptyValues)
    .then(utils.transformToCsv)
    .then(result => utils.saveFile(constants.exportFile, result))
    .catch(console.error);

"use strict";
const rpn = require("request-promise-native");
const cheerio = require("cheerio");
const ycharts = require("./ycharts");
const business = require("./business");
const constants = require("./constants");
const utils = require("./utils");

function parsePage(url, extractFunction) {
    let options = {
        uri: url,
        headers: constants.HEADERS,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return rpn(options)
        .then(extractFunction);
}

const exportFile = constants.EXPORT_FOLDER + utils.formatDate(new Date()) + ".csv";

Promise.all(constants.URLS.map((element) => parsePage(element, ycharts.extractEtfInformation)))
    .then(business.filter)
    .then(result => utils.transformToCsv(result))
    .then(result => utils.saveFile(exportFile, result));
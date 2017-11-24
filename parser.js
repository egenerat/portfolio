"use strict";
const rpn = require("request-promise-native");
const cheerio = require("cheerio");
const business = require("./business");
const constants = require("./constants");
const utils = require("./utils");

const exportFile = constants.EXPORT_FOLDER + utils.formatDate(new Date()) + ".csv";

Promise.all(constants.URLS.map((url) => utils.parsePage(url, extractEtfInformation)))
    .then(business.filter)
    .then(result => utils.transformToCsv(result))
    .then(result => utils.saveFile(exportFile, result));
"use strict";
const fs = require("fs");
const utils = require("../../core/utils.js");

let constants;
if (fs.existsSync("./app/config/constants/constants-private.js", "utf-8")) {
    constants = require("./constants-private.js");
}
else {
    constants = require("./constants-public.js");
}

module.exports.EXPORT_FILE = constants.EXPORT_FILE;
module.exports.EXPORT_FOLDER = constants.EXPORT_FOLDER;
module.exports.DB_FOLDER = constants.DB_FOLDER;
module.exports.HEADERS = constants.HEADERS;
module.exports.CORRELATION_BLACKLIST = constants.CORRELATION_BLACKLIST;
module.exports.PARSER_BLACKLIST = constants.PARSER_BLACKLIST;

// Email
module.exports.EMAIL_ACCOUNT_USERNAME = constants.EMAIL_ACCOUNT_USERNAME;
module.exports.EMAIL_ACCOUNT_PASSWORD = constants.EMAIL_ACCOUNT_PASSWORD;
module.exports.EMAIL_TO = constants.EMAIL_TO;

// Variables depending on the environment
const OUTPUT_FOLDER = "data/output";
if (process.env.NODE_ENV === "production") {
    module.exports.URLS = constants.ETF_URLS;
    module.exports.EXPORT_FOLDER = `${OUTPUT_FOLDER}/prod/csv/`;
    module.exports.DB_FOLDER = `${OUTPUT_FOLDER}/prod/db/`;
}
else {
    module.exports.URLS = constants.TEST_URLS;
    module.exports.EXPORT_FOLDER = `${OUTPUT_FOLDER}/tests/csv/`;
    module.exports.DB_FOLDER = `${OUTPUT_FOLDER}/tests/db/`;
}

module.exports.EXPORT_FILE = module.exports.EXPORT_FOLDER + utils.formatDate(new Date()) + ".csv";
module.exports.CORRELATION_URI = "http://localhost:5000/correlations";
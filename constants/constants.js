"use strict";
const fs = require("fs");
const utils = require("../utils.js");

let constants;
if (fs.existsSync("./constants/constants-private.js", "utf-8")) {
    constants = require("./constants-private.js");
}
else {
    constants = require("./constants-public.js");
}

module.exports.EXPORT_FILE = constants.EXPORT_FILE;
module.exports.EXPORT_FOLDER = constants.EXPORT_FOLDER;
module.exports.DB_FOLDER = constants.DB_FOLDER;
module.exports.HEADERS = constants.HEADERS;

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
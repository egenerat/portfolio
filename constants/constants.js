"use strict";
const fs = require("fs");

if (fs.existsSync("./constants/constants-private.js", "utf-8")) {
    const constants = require("./constants-private.js");
    module.exports.URLS = constants.URLS;
    module.exports.PARSER_MAP = constants.PARSER_MAP;
    module.exports.EXPORT_FILE = constants.EXPORT_FILE;
}
else {
    // Declare variables if needed
}
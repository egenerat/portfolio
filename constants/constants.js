"use strict";
const fs = require("fs");

if (fs.existsSync("./constants/constants-private.js", "utf-8")) {
    const { URLS } = require("./constants-private.js");
    module.exports.URLS = URLS;
}
else {
    // TODO
}
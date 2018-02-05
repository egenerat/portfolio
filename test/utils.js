"use strict";
const cheerio = require("cheerio");
const fs = require("fs");

// Synchronized function at the moment
module.exports.loadHtml = (path, extractFunction) => {
    let html = fs.readFileSync(path, "utf-8");
    let $ = cheerio.load(html);
    return extractFunction($);
};
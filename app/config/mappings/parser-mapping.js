"use strict";
const fs = require("fs");

let mapping;
if (fs.existsSync("./app/config/mappings/parser-mapping-private.js", "utf-8")) {
    mapping = require("./parser-mapping-private.js");
}
else {
    mapping = require("./parser-mapping-public.js");
}

module.exports.getPageParser = ($) => {
    const head = $("title").text();
    const pattern = Object.keys(mapping)
        .find(key => head.includes(key));
    if (pattern) {
        const parser = mapping[pattern];
        return Promise.resolve(parser($));
    }
    else {
        return Promise.reject("No parser found for this page");
    }
};
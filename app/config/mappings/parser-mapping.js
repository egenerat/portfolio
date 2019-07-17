"use strict";
const fs = require("fs");

let mapping;
if (fs.existsSync("./app/config/mappings/parser-mapping-private.js", "utf-8")) {
    mapping = require("./parser-mapping-private.js").PARSER_MAP;
}
else {
    mapping = require("./parser-mapping-public.js").PARSER_MAP;
}

module.exports.getPageParser = ($, map = mapping) => {
    const head = $("title").text();
    if (head) {
        const pattern = Object.keys(map)
            .find(key => head.includes(key));
        if (pattern) {
            const parser = map[pattern];
            return Promise.resolve(parser($));
        }
        else {
            return Promise.reject("No parser found for this page");
        }
    }
    else {
        return Promise.reject("The text is empty");
    }
};
"use strict";
const fs = require("fs");

let mapping;
if (fs.existsSync("./app/config/mappings/parser-mapping-private.js", "utf-8")) {
    // This file is part of .gitignore
    mapping = require("./parser-mapping-private.js").PARSER_MAP;
}
else {
    mapping = require("./parser-mapping-public.js").PARSER_MAP;
}

module.exports.getPageParser = ($, map = mapping) => {
    const head = $("title").text();
    if (head) {
        const keys = Object.keys(map);
        if (keys.length > 0) {
            const pattern = keys.find(key => head.includes(key));
            if (pattern) {
                const parser = map[pattern];
                return Promise.resolve(parser($));
            }
            else {
                return Promise.reject("No matching parser found for this page");
            }
        }
        else {
            return Promise.reject("No parser defined, please check your configuration files");
        }
    }
    else {
        return Promise.reject("The text is empty");
    }
};
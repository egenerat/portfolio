"use strict";
const fs = require("fs");

let mapping;
if (fs.existsSync("./parsers/mappings/parser-mapping-private.js", "utf-8")) {
    mapping = require("./parser-mapping-private.js");
}
else {
    mapping = require("./parser-mapping-public.js");
}

module.exports.PARSER_MAP = mapping.PARSER_MAP;
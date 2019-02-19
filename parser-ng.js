"use strict";

// This will be the next generation parser.
// For any URL, it will be able to detect what is the correct parser to be used, based on a mapping available in a private file

const { parsePage } = require("./parsers/parser-utils.js");
const logger = require("./logger.js");

var args = process.argv.slice(2);
if (args.length > 0) {
    args.forEach(url => 
        parsePage(url)
            .then(logger.info)
    );
}
else {
    console.log("No argument passed");
}
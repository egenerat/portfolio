#! /usr/bin/env node

"use strict";

// This will be the next generation parser.
// For any URL, it will be able to detect what is the correct parser to be used, based on a mapping available in a private file

const { parsePage } = require("./parsers/parser-utils.js");
const logger = require("./logger.js");
const program = require("commander");

let urlValue;

program
    .version("0.0.1")
    .arguments("<url>")
    // .option("-u, --url <value>", "Page URL")
    .action( (url) => {
        urlValue = url;
    })
    .parse(process.argv);

if (typeof urlValue === "undefined") {
    console.error("No URL given!");
    process.exit(1);
}

parsePage(program.url)
    .then(logger.info);

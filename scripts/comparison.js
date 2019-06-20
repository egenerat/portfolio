#! /usr/bin/env node
"use strict";

const logger = require("../app/core/logger.js");
const { Database } = require("../app/persistence/db.js");
const { compareEtfs } = require("../app/core/comparison-utils.js");

const db = new Database("securities.db");

let args = process.argv.slice(2);
if (args.length > 0) {
    Promise.all(args.map(x => db.findOne({key: x}) ))
        .then(compareEtfs);
}
else {
    logger.warning("No argument passed");
}


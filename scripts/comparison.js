#! /usr/bin/env node
"use strict";

const logger = require("../app/core/logger.js");
const { Database } = require("../app/persistence/db.js");
const { compareEtfs } = require("../app/core/comparison-utils.js");
const { correlations } = require("./correlations.js");

const db = new Database("securities.db");

let args = process.argv.slice(2);
if (args.length === 2) {
    Promise.all(args.map(x => db.findOne({key: x}, true) ))
        .then(securities => {
            compareEtfs(securities);
            correlations(securities);
        })
        .catch(logger.error);
}
else {
    logger.warning("No argument passed");
}


#! /usr/bin/env node
"use strict";
const rpn = require("request-promise-native");
const logger = require("../app/core/logger.js");
const { Database } = require("../app/persistence/db.js");

const postJson = (uri, body) => {
    const options = {
        method: "POST",
        uri: uri,
        body: body,
        json: true // Stringify body to JSON
    };
    return rpn(options);
};

const db = new Database("securities.db");
const uri = "http://localhost:5000/correlations";

// For instance the securities without enough history
let BLACKLIST = ["Name A", "Name B"];

// For being on purpose duplicates in the portfolio (Same tracker in a different currency)
BLACKLIST = BLACKLIST.concat(["Name C", "Name D"]);

logger.info("Blacklist:");
logger.info(BLACKLIST);

db.find()
    .then(securities => securities.map(x => { return {security: x.key, performances: x.quarterlyReturns}; } ) )
    .then(x => x.filter(y => !BLACKLIST.includes(y.security)))
    .then(body => postJson(uri, body))
    .then(res => logger.info(res))
    .catch(res => logger.error(`${res.message}`));

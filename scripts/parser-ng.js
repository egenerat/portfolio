#! /usr/bin/env node

"use strict";

const { Database } = require("../app/persistence/db.js");
const { parsePage } = require("./parsers/parser-utils.js");
const logger = require("./logger.js");
const utils = require("./utils.js");


const portfolioDb = new Database("portfolio.db");
const securitiesDb = new Database("securities.db");
const today = utils.formatDate(new Date());

var args = process.argv.slice(2);
if (args.length > 0) {
    args.forEach(url => 
        parsePage(url)
            .then(x => {
                x.date = today;
                if (x.portfolioName) {
                    portfolioDb.insert(x);
                }
                else {
                    securitiesDb.insert(x);
                }
                
            })
            .catch(err => logger.error(`${url}: ${err}`))
    );
}
else {
    logger.warning("No argument passed");
}
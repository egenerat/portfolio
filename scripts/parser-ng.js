#! /usr/bin/env node

"use strict";

const cli = require("cli");
const { Database } = require("../app/persistence/db.js");
const { parsePage } = require("../app/parsers/parser-utils.js");
const logger = require("../app/core/logger.js");
const utils = require("../app/core/utils.js");

const portfolioDb = new Database("portfolio.db");
const securitiesDb = new Database("securities.db");
const today = utils.formatDate(new Date());

const cliArgs = cli.parse({
    save: [ "s", "save", "boolean"],
});

let save = cliArgs.save;
const args = cli.args;

if (args.length > 0) {
    args.forEach(url => 
        parsePage(url)
            .then(x => {
                if (x !== undefined) {
                    x.date = today;
                    if (save) {
                        if (x.portfolioName) {
                            portfolioDb.insert(x);
                        }
                        else {
                            securitiesDb.insert(x);
                        }
                    }
                    else {
                        logger.log(x);
                    }
                }
            })
            .catch(err => logger.error(`${url}: ${err}`))
    );
}
else {
    logger.warning("No argument passed");
}
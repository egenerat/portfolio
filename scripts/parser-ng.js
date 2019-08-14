#! /usr/bin/env node

"use strict";

const cli = require("cli");
const { Database } = require("../app/persistence/db.js");
const { parsePage } = require("../app/parsers/parser-utils.js");
const logger = require("../app/core/logger.js");
const utils = require("../app/core/utils.js");
const { PARSER_BLACKLIST } = require("../app/config/constants/constants.js");

const portfolioDb = new Database("portfolio.db");
const securitiesDb = new Database("securities.db");
const today = utils.formatDate(new Date());

const cliArgs = cli.parse({
    save: [ "s", "Save output to database", "boolean" ],
    url: [ "u", "URL to be parsed", "url" ],
    portfolio: [ "p", "Portolio name to be parsed/refreshed", "string" ],
});

let save = cliArgs.save;
const url = cliArgs.url;
const portfolio = cliArgs.portfolio;

if (url !== null) {
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
                    logger.info(x);
                }
            }
        })
        .catch(err => logger.error(`${url}: ${err}`));
}
else if (portfolio !== null) {
    portfolioDb.findMostRecent({portfolioName: portfolio})
        .then(pf => {
            const { parseOneFund } = require(`../app/parsers/${pf.type}.js`);
            return Promise.all(pf.securities
                .filter(sec => !PARSER_BLACKLIST.includes(sec))
                // .slice(0, 1) // Limit to 1 (for testing purposes)
                .map(x => parseOneFund(x)
                    .catch(logger.error))
            )
                .then(res => {
                    if (save) {
                        securitiesDb.insert(res);
                    }
                    else {
                        logger.info(res);
                    }
                })
                .catch(logger.error);
        })
        .catch(logger.error);
}
else {
    logger.warning("No argument passed");
}

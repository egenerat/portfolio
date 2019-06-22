#! /usr/bin/env node
"use strict";
const logger = require("../app/core/logger.js");
const http = require("../app/core/http.js");

// Documentation: https://www.frankfurter.app/docs/
// http://frankfurter.app/latest?base=GBP
// http://frankfurter.app/2000-01-03?base=GBP


const computeChanges = (resultList) => {
    interestingCurrencies.forEach(currency => {
        const oldRate = resultList[0].rates[currency];
        const newRate = resultList[1].rates[currency];
        const variation = ((newRate / oldRate) -1) * 100;
        logger.info(`GBP/${currency}: ${oldRate.toFixed(2)} ${newRate.toFixed(2)} ${variation.toFixed(0)}%`);
    });
};

const base = "GBP";
const interestingCurrencies = ["EUR", "USD"];
let dates;
const args = process.argv.slice(2);
if (args.length == 2) {
    dates = args;
}
else {
    logger.warning("No argument passed, using default");
    dates = ["2014-10-30", "latest"];
}
logger.info(`Comparing ${base} versus ${interestingCurrencies} between ${dates[0]} and ${dates[1]}`);
Promise.all(dates
    .map(date => http.getJson(`http://frankfurter.app/${date}?base=${base}`))
)
    .then(computeChanges)
    .catch(logger.error);

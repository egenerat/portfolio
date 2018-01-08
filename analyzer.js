"use strict";

const analyzerUtils = require("./analyzerUtils");
const cli = require("cli");
const utils = require("./utils");
const { calculateAverageMetric } = require("./portfolio/portfolio");
const { PortfolioSecurity } = require("./portfolio/portfolioSecurity");

const cliArgs = cli.parse({
    criteria: [ "c", "Criteria to be used for filtering/ordering", "string", "pe" ], //--criteria STRING
    begin: [ "b", "First date", "string"],
    end: [ "e", "End date", "string"],
    threshold: [ "t", "Threshold", "int", 0], // --threshold 5, to display only changes higher than 5%
});

const checkCliArguments = (cliArgs) => {
    let result = true;
    if (!cliArgs.begin) {
        cli.error("--begin date required");
        result = false;
    }
    
    if (!cliArgs.end) {
        cli.error("--end date required");
        result = false;
    }
    return result;
};

let path = [cliArgs.begin, cliArgs.end];
const INTERESTING_METRICS = ["pe", "forecastPe"];

const portfolio = [];
portfolio.push(new PortfolioSecurity("EEM", 10));
portfolio.push(new PortfolioSecurity("EWS", 10));
portfolio.push(new PortfolioSecurity("EWZ", 10));
// console.log(portfolio);


if (checkCliArguments(cliArgs) ) {
    Promise.all(path
        .map((x) => analyzerUtils.constructFilePath(x)
            .then(utils.readFromCsv)))
        .then(res => {
            // analyzerUtils.computeChangesEtf(res, cliArgs.criteria)
            // res => analyzerUtils.displayResults(res, cliArgs.criteria, cliArgs.threshold));
            let oldFundamentals, fundamentals;
            [oldFundamentals, fundamentals] = res;
            console.log("old");
            INTERESTING_METRICS.forEach(metric => {
                console.log(metric);
                calculateAverageMetric(portfolio, oldFundamentals, metric);
            }
            );
            console.log(`\nnew`);
            INTERESTING_METRICS.forEach(metric => {
                console.log(metric);
                calculateAverageMetric(portfolio, fundamentals, metric)
            }
            );
        })
        .catch(cli.error);
}
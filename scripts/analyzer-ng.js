#! /usr/bin/env node
"use strict";

const analyzerUtils = require("../app/core/analyzer-utils.js");
const cli = require("cli");
const { Database } = require("../app/persistence/db.js");

const cliArgs = cli.parse({
    criteria: [ "c", "Criteria to be used for filtering/ordering", "string", "pe" ], //--criteria STRING
    begin: [ "b", "First date", "date"],
    end: [ "e", "End date", "date"],
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

let dates = [cliArgs.begin, cliArgs.end];
let securities = ["My security"];
const criteria = cliArgs.criteria;

if (checkCliArguments(cliArgs) ) {
    const securitiesDb = new Database("securities.db");
    Promise.all(dates
        .map((x) => securitiesDb.findOne( {key: securities[0], valueDate: x} ) ))
        .then(res => analyzerUtils.computeChangesEtf(res, criteria))
        .then(res => analyzerUtils.displayResults(res, criteria, cliArgs.threshold))
        .catch(cli.error);
}
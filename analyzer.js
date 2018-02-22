"use strict";

const analyzerUtils = require("./analyzer-utils");
const cli = require("cli");
const utils = require("./utils");

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
const criteria = cliArgs.criteria;

if (checkCliArguments(cliArgs) ) {
    Promise.all(path
        .map((x) => analyzerUtils.constructFilePath(x)
            .then(utils.readFromCsv)))
        .then(res => analyzerUtils.computeChangesEtf(res, criteria))
        .then(res => analyzerUtils.displayResults(res, criteria, cliArgs.threshold))
        .catch(cli.error);
}
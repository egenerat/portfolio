"use strict";
const utils = require("./utils");
const financials = require("./financials");
const constants = require("./constants");
const cli = require("cli");
var colors = require("colors");

const cliArgs = cli.parse({
    criteria: [ "c", "Criteria to be used for filtering/ordering", "string", "pe" ],  //     --work STRING What kind of work to do
    begin: [ "b", "First date", "string"],//, "2017-09-24" ],
    end: [ "e", "End date", "string"]//, "2017-11-25" ],
});
let path = [cliArgs.begin, cliArgs.end];
const CRITERIA = cliArgs.criteria;
// utils.list_files(OUTPUT_FOLDER)
//     .then(console.log);

const constructFilePath = (date) => {
    return Promise.resolve(constants.EXPORT_FOLDER + date + ".csv");
};

const computeChangesEtf = (resultList) => {
    let cheaperList = [];
    let moreExpensiveList = [];
    let tickerList = resultList[0].reduce( (total, elt) => {
        total.push(elt.name);
        return total;
    }, []);
    for (const ticker of tickerList) {
        // TODO should be compared over tickers, but were not available in oldest datasets
        let old = resultList[0].find(x => x.name === ticker);
        let n = resultList[1].find(x => x.name === ticker);
        if (old !== undefined && n !== undefined) {
            // let earningsUpdate = financials.haveEarningsChanged(old.price, old.pe, n.price, n.pe);
            // console.log(ticker + " " + priceVariation);
            const oldValue = parseFloat(old[CRITERIA]);
            const newValue = parseFloat(n[CRITERIA]);
            let listToAppend;
            if (!financials.areFloatEqual(oldValue, newValue)) {
                let variation = newValue / oldValue;
                if (variation < 1) {
                    listToAppend = cheaperList;
                }
                else {
                    listToAppend = moreExpensiveList;
                }
                listToAppend.push({
                        old: old,
                        n: n,
                        variation: variation
                    });
                }
            }
        }
    cheaperList.sort( (a, b) => {
        return a.variation - b.variation;
    });
    moreExpensiveList.sort( (a, b) => {
        return b.variation - a.variation;
    });
    return {
        cheaperList: cheaperList,
        moreExpensiveList: moreExpensiveList,
        criteria: CRITERIA
    };
};

const displaySubList = (subList, criteria) => {
    let old, n, variation;
    for (let e of subList) {
        ({ old, n, variation } = e);
        let priceVariation = utils.prettyPrintPercentage(n.price / old.price);
        console.log(n.name + " " + priceVariation);
        console.log(old[criteria] + " => " + n[criteria]);
        if (variation < 1) {
            console.log(`↘ ${utils.prettyPrintPercentage(variation)}`.green);
        }
        else {
            console.log(`↗ ${utils.prettyPrintPercentage(variation)}`.red);
        }
    }
};

const displayResults = (res) => {
    let cheaperList, moreExpensiveList, criteria;
    ({ cheaperList, moreExpensiveList, criteria } = res);

    console.log(`Based on ${criteria}`);
    if (cheaperList.length > 0) {
        console.log("============================\nCheaper\n");
    displaySubList(cheaperList, criteria);
    }
    if (moreExpensiveList.length > 0) {
        console.log("============================\nMore expensive");
    displaySubList(moreExpensiveList, criteria);
    }
};

Promise.all(path
    .map((x) => constructFilePath(x)
        .then(utils.readFromCsv)))
    .then(computeChangesEtf)
    .then(displayResults)
    .catch(console.err);
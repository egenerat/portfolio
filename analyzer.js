"use strict";
const utils = require("./utils");
const financials = require("./financials");
const constants = require("./constants");

const OUTPUT_FOLDER = "data/output/";
// utils.list_files(OUTPUT_FOLDER)
//     .then(console.log);

const constructFilePath = (date) => {
    return Promise.resolve(constants.EXPORT_FOLDER + date + ".csv");
};

const computeChangesEtf = (resultList) => {
    const CRITERIA = "forecastPe";
    let cheaperList = [];
    let moreExpensiveList = [];
    let ticketList = resultList[0].reduce( (total, elt) => {
        total.push(elt.name);
        return total;
    }, []);
    for (const ticket of ticketList) {
        // TODO should be compared over tickets, but were not available in oldest datasets
        let old = resultList[0].find(x => x.name === ticket);
        let n = resultList[1].find(x => x.name === ticket);
        if (old !== undefined && n !== undefined) {
            // let earningsUpdate = financials.haveEarningsChanged(old.price, old.pe, n.price, n.pe);
            // console.log(ticket + " " + priceVariation);
            const oldValue = parseFloat(old[CRITERIA]);
            const newValue = parseFloat(n[CRITERIA]);
            if (!financials.areFloatEqual(oldValue, newValue)) {
                let variation = newValue / oldValue;
                if (variation > 1) {
                    cheaperList.push({
                        old: old,
                        n: n,
                        variation: variation
                    });
                }
                else {
                    moreExpensiveList.push({
                        old: old,
                        n: n,
                        variation: variation
                    });
                }
            }
        }
    }
    cheaperList.sort(function (a, b) {
        return a.variation - b.variation;
    });
    moreExpensiveList.sort(function (a, b) {
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
            console.log("↘ " + utils.prettyPrintPercentage(variation));
        }
        else {
            console.log("↗ " + utils.prettyPrintPercentage(variation));
        }
    }
};

const displayResults = (res) => {
    let cheaperList, moreExpensiveList, criteria;
    ({ cheaperList, moreExpensiveList, criteria } = res);

    console.log("Based on " + criteria);
    console.log("============================");
    console.log("Cheaper");
    displaySubList(cheaperList, criteria);
    console.log("============================");
    console.log("More expensive");
    displaySubList(moreExpensiveList, criteria);
};

let path = ["test-2017-10-29", "test-2017-10-30"];
path = ["2017-09-24", "2017-11-4"];
Promise.all(path
    .map((x) => constructFilePath(x)
        .then(utils.readFromCsv)))
    .then(computeChangesEtf)
    .then(displayResults)
    .catch(console.err);
"use strict";

const colors = require("colors");
const constants = require("./constants/constants.js");
const financials = require("./financials");
const utils = require("./utils");

module.exports.constructFilePath = (date) => {
    return Promise.resolve(constants.EXPORT_FOLDER + date + ".csv");
};

module.exports.computeChangesEtf = ([oldSecurities, newSecurities], criteria) => {
    let cheaperList = [];
    let moreExpensiveList = [];
    let tickerList = oldSecurities.reduce( (total, elt) => {
        total.push(elt.name);
        return total;
    }, []);
    for (const ticker of tickerList) {
        // TODO should be compared over tickers, but were not available in oldest datasets
        let old = oldSecurities.find(x => x.name === ticker);
        let n = newSecurities.find(x => x.name === ticker);
        if (old !== undefined && n !== undefined) {
            let oldValue = old[criteria];
            let newValue = n[criteria];
            if ( !isNaN(oldValue) && !isNaN(newValue) ) {
                oldValue = parseFloat(old[criteria]);
                newValue = parseFloat(n[criteria]);
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
    }
    cheaperList.sort( (a, b) => {
        return a.variation - b.variation;
    });
    moreExpensiveList.sort( (a, b) => {
        return b.variation - a.variation;
    });
    return {
        cheaperList: cheaperList,
        moreExpensiveList: moreExpensiveList
    };
};

const displaySubList = (subList, criteria, threshold) => {
    let old, n, variation;
    for (let e of subList) {
        ({ old, n, variation } = e);
        let priceVariation = utils.prettyPrintPercentage(n.price / old.price);
        // Only display changes over the threshold
        if ( Math.abs(variation - 1) * 100 > threshold ) {
            console.log(n.name + " " + priceVariation);
            console.log(old[criteria] + " => " + n[criteria]);
            if (variation < 1) {
                console.log(`↘ ${utils.prettyPrintPercentage(variation)}`.green);
            }
            else {
                console.log(`↗ ${utils.prettyPrintPercentage(variation)}`.red);
            }
        }
    }
};

module.exports.displayResults = (res, criteria, threshold) => {
    let cheaperList, moreExpensiveList;
    ({ cheaperList, moreExpensiveList } = res);

    console.log(`Based on ${criteria}`);
    if (cheaperList.length > 0) {
        console.log("\n============================\nCheaper\n");
        displaySubList(cheaperList, criteria, threshold);
    }
    else {
        console.log("∅");
    }
    if (moreExpensiveList.length > 0) {
        console.log("\n============================\nMore expensive\n");
        displaySubList(moreExpensiveList, criteria, threshold);
    }
    else {
        console.log("∅");
    }
};
module.exports.displaySubList = displaySubList;
"use strict";

// In progress

// The purpose of comparison is not to parse any data, but to compare data already extracted and saved for instance in a database.
// data.js is here to simulate a pre-filled database.
const data = require("../data.js");

const compareEtfs = (arr) => {
    const [a, b] = arr;
    console.log(`${"".padEnd(25)}|${a.ticker.padEnd(6)}|${b.ticker.padEnd(6)}|`);
    
    const criteria = ["forecastPe", "pb", "dividend", "longTermEarningGrowth", "historicalEarningGrowth", "bookValueGrowth", "cashFlowGrowth", "salesGrowth"];
    for (const c of criteria) {
        // print field name
        let line = `${c.padEnd(25)}|`;
        let min = undefined;
        let max = undefined;
        
        // print field value for all the securities
        for (const f of arr) {
            const val = f[c];
            line += `${val.toString().padEnd(6)}|`;
            min = min === undefined ? val : Math.min(min, val);
            max = max === undefined ? val : Math.max(max, val);
        }
    }
};

const southKorea = {ticker:"EWY"};
const singapore = {ticker: "EWS"};

const etf = [southKorea, singapore];
Promise.all(etf.map(data.find))
    .then(compareEtfs);

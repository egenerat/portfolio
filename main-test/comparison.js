"use strict";

const data = require("../data.js");

const compareEtfs = (arr) => {
    const [a, b] = arr;
    console.log(`${"".padEnd(25)}|${a.ticker.padEnd(6)}|${b.ticker.padEnd(6)}|`);
    
    const criteria = ["forecastPe", "pb", "dividend", "longTermEarningGrowth", "historicalEarningGrowth", "bookValueGrowth", "cashFlowGrowth", "salesGrowth"];
    for (const c of criteria) {
        // print field name
        let line = `${c.padEnd(25)}|`;
        
        // print field value for all the securities
        for (const f of arr) {
            let val = "";
            if (c in f) {
                val = f[c];
            }
            line += `${val.toString().padEnd(6)}|`;
        }
        console.log(line);
    }
};

const southKorea = {ticker:"EWY"};
const singapore = {ticker: "EWS"};

const etf = [southKorea, singapore];
Promise.all(etf.map(data.find))
    .then(compareEtfs);

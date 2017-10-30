"use strict";
const currencies = require("./currencies");

const interestingCurrencies = ['EUR', 'USD']

const computeChanges = (resultList) => {
    // resultList.reduce(() => );
    // forEach(x => console.log(x.rates.EUR));
    for (const currency of interestingCurrencies) {
        let variation = resultList[1].rates[currency] / resultList[0].rates[currency];
        console.log("GBP/" + currency + ": " + variation.toFixed(2));
    }
};

let dates = ["2016-10-30", "latest"];
Promise.all(dates.map(date => currencies.getFxRates("GBP", date)
)).then(computeChanges);

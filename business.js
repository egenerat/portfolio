"use strict";
const sumHoldings = (holdings) => {
    // ["SYMBOL", "Company Ltd", 5.23]
    return holdings.reduce( (total, elt) => {
        if (Array.isArray(elt)) {
            return total + elt[2];
        }
        else {
            return total + elt["% weight"];
        }
    }, 0);
};

module.exports.filter = (element) => {
    element.pePb = (element.pe * element.pb).toFixed(1);
    element.forecastPePb = (element.forecastPe * element.forecastPb).toFixed(1);
    element.percentageTop10 = sumHoldings(element.top10Holdings).toFixed(2);
    delete element.stockStyleExposure;
    delete element.stockStyleExposure;
    delete element.sectors;
    delete element.marketCapitalizations;
    delete element.regions;
    delete element.top10Holdings;
    return Promise.resolve(element);
};
module.exports.sumHoldings = sumHoldings;
"use strict";
const sumTop10Holdings = (top10Holdings) => {
    // ["SYMBOL", "Company Ltd", 5.23]
    return top10Holdings.reduce( (total, elt) => {
        return total + elt[2];
    }, 0);
};

module.exports.filter = (element) => {
    element.pePb = (element.pe * element.pb).toFixed(1);
    element.forecastPePb = (element.forecastPe * element.forecastPb).toFixed(1);
    element.percentageTop10 = sumTop10Holdings(element.top10Holdings).toFixed(2);
    delete element.stockStyleExposure;
    delete element.stockStyleExposure;
    delete element.sectors;
    delete element.marketCapitalizations;
    delete element.regions;
    delete element.top10Holdings;
    return Promise.resolve(element);
};
module.exports.sumTop10Holdings = sumTop10Holdings;
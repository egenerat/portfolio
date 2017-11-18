"use strict";
const sumTop10Holdings = (top10Holdings) => {
    // ["SYMBOL", "Company Ltd", "5.23%"]
    return top10Holdings.reduce( (total, elt) => {
        return total + parseFloat(elt[2].replace("%", ""));
    }, 0);
};

module.exports.filter = (data) => {
    data.forEach( (element) => {
        element.pePb = (element.pe * element.pb).toFixed(1);
        element.forecastPePb = (element.forecastPe * element.forecastPb).toFixed(1);
        element.percentageTop10 = sumTop10Holdings(element.top10Holdings).toFixed(2);
        delete element.stockStyleExposure;
        delete element.stockStyleExposure;
        delete element.sectors;
        delete element.marketCapitalizations;
        delete element.regions;
        delete element.top10Holdings;
    });
    return Promise.resolve(data);
};
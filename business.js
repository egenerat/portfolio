"use strict";
function sumTop10Holdings(top10Holdings) {
    let result = 0;
    top10Holdings.forEach( function(element) {
        // ["SYMBOL", "Company Ltd", "5.23%"]
        result += parseFloat(element[2].replace("%", "")).toFixed(2);
    });
    return result;
}

exports.filter = (data) => {
    data.forEach( function(element) {
        element.pePb = (element.pe * element.pb).toFixed(1);
        element.forecastPePb = (element.forecastPe * element.forecastPb).toFixed(1);
        element.percentageTop10 = sumTop10Holdings(element.top10Holdings);
        delete element.stockStyleExposure;
        delete element.stockStyleExposure;
        delete element.sectors;
        delete element.marketCapitalizations;
        delete element.regions;
        delete element.top10Holdings;
        delete element.percentageTop10;
    });
    return Promise.resolve(data);
};
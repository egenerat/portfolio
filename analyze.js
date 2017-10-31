"use strict";
const utils = require("./utils");

const OUTPUT_FOLDER = "data/output/";
utils.list_files(OUTPUT_FOLDER)
    .then(console.log);

const constructFilePath = (date) => {
    return Promise.resolve(OUTPUT_FOLDER + date + ".csv");
};

const computeChangesEtf = (resultList) => {
    // resultList.reduce(() => );
    // forEach(x => console.log(x.rates.EUR));
    for (const currency of ["EEM"]) {
        let variation = resultList[1].rates[currency] / resultList[0].rates[currency];
        console.log("GBP/" + currency + ": " + variation.toFixed(2));
    }
};

let path = ["test-2017-10-29", "test-2017-10-30"];
Promise.all(path
    .map((x) => constructFilePath(x)
        .then(utils.readFromCsv)
        .then(computeChangesEtf)));
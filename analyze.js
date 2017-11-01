"use strict";
const utils = require("./utils");
const financials = require("./financials");

const OUTPUT_FOLDER = "data/output/";
// utils.list_files(OUTPUT_FOLDER)
//     .then(console.log);

const constructFilePath = (date) => {
    return Promise.resolve(OUTPUT_FOLDER + date + ".csv");
};

const computeChangesEtf = (resultList) => {
    let foo = resultList[0].reduce( (total, elt) => {
        total.push(elt.name);
        return total;
    }, []);
    for (const ticket of foo) {
        let old = resultList[0].find(x => x.name === ticket);
        let n = resultList[1].find(x => x.name === ticket);
        if (old !== undefined && n !== undefined) {
            let priceVariation = (n.price / old.price).toFixed(2);
            // let earningsUpdate = financials.haveEarningsChanged(old.price, old.pe, n.price, n.pe);
            console.log(ticket + " " + priceVariation);
            if (financials.hasPeChanged(old.pe, n.pe)) {
                console.log(old.pe + " => " + n.pe);
                let change = (n.pe / old.pe).toFixed(2);
                if (old.pe > n.pe) {
                    console.log("↘ " + change);
                }
                else {
                    console.log("↗ " + change);
                }
            }
        }
    }
};

let path = ["test-2017-10-29", "test-2017-10-30"];
path = ["2017-10-21", "2017-10-28"];
Promise.all(path
    .map((x) => constructFilePath(x)
        .then(utils.readFromCsv)))
    .then(computeChangesEtf)
    .catch(console.err);
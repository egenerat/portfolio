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
    let cheaperList = [];
    let moreExpensiveList = [];
    let ticketList = resultList[0].reduce( (total, elt) => {
        total.push(elt.name);
        return total;
    }, []);
    for (const ticket of ticketList) {
        let old = resultList[0].find(x => x.name === ticket);
        let n = resultList[1].find(x => x.name === ticket);
        if (old !== undefined && n !== undefined) {
            // let earningsUpdate = financials.haveEarningsChanged(old.price, old.pe, n.price, n.pe);
            // console.log(ticket + " " + priceVariation);
            if (financials.hasPeChanged(old.pe, n.pe)) {
                let change = n.pe / old.pe;
                if (old.pe > n.pe) {
                    cheaperList.push({
                        old: old,
                        n: n,
                        change: change
                    });
                }
                else {
                    moreExpensiveList.push({
                        old: old,
                        n: n,
                        change: change
                    });
                }
            }
        }
    }
    cheaperList.sort(function (a, b) {
        return a.change - b.change;
    });
    moreExpensiveList.sort(function (a, b) {
        return b.change - a.change;
    });
    return {
        cheaperList: cheaperList,
        moreExpensiveList: moreExpensiveList
    };
};

const displaySubList = (subList) => {
    let old, n, change;
    for (let e of subList) {
        ({ old, n, change } = e);
        let priceVariation = (n.price / old.price).toFixed(2);
        console.log(n.name + " " + priceVariation);
        console.log(old.pe + " => " + n.pe);
        if (change < 1) {
            console.log("↘ " + change.toFixed(2));
        }
        else {
            console.log("↗ " + change.toFixed(2));
        }
    }
};

const displayResults = (res) => {
    let cheaperList, moreExpensiveList;
    ({ cheaperList, moreExpensiveList } = res);

    console.log("============================");
    console.log("Cheaper");
    displaySubList(cheaperList);
    console.log("============================");
    console.log("More expensive");
    displaySubList(moreExpensiveList);
};

let path = ["test-2017-10-29", "test-2017-10-30"];
path = ["2017-09-24", "2017-11-4"];
Promise.all(path
    .map((x) => constructFilePath(x)
        .then(utils.readFromCsv)))
    .then(computeChangesEtf)
    .then(displayResults)
    .catch(console.err);
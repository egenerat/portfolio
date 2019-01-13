"use strict";
// Entrypoint for all the data request
// If the result is not stored in database, call the appropriate service

// As a first step, it will return mock data
const find = (query) => {
    if (query.ticker === "EWS") {
        return {
            ticker: "EWS",
            pb: 2
        };
    }
    else if (query.ticker === "EWY") {
        return {
            ticker: "EWY",
            pb: 1.5
        };
    }
};
module.exports.find = find;
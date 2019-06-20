"use strict";
const rpn = require("request-promise-native");
const constants = require("../config/constants/constants.js");
// Documentation: http://fixer.io/

// http://api.fixer.io/latest?base=GBP
// http://api.fixer.io/2000-01-03?base=GBP

module.exports.getFxRates = (base, day) => {
    let options = {
        uri: `https://api.fixer.io/${day}?base=${base}`,
        headers: constants.HEADERS,
        transform: function (body) {
            return JSON.parse(body);
        }
    };
    return rpn(options);
};
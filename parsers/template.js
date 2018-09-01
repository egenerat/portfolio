"use strict";
// This is a parser template

const { cleanupStringFloat } = require("../utils");

module.exports.extractEtfInformation = ($) => {

    return {
        ticker: $("").text(),
        name: $("").text(),
        price: cleanupStringFloat($("").text()),
        dividend: cleanupStringFloat($("").text()),
        pe: cleanupStringFloat($("").text()),
        pb: cleanupStringFloat($("").text()),
        forecastPe: cleanupStringFloat($("").text()),
        forecastPb: cleanupStringFloat($("").text()),
        expense: cleanupStringFloat($("").text().trim()),
        discount: cleanupStringFloat($("").text().trim()),
        currency: $("").text(),
        stockStyleExposure: null,
        sectors: null,
        marketCapitalizations: null,
        regions: null,
        top10Holdings: null,
        assets: null
    };
};
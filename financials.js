"use strict";
module.exports.computeForwardPeRatio = (currentPeRatio, earningsGrowth)=> {
    // TODO not implemented yet
    let forwardPeRatio = 0;
    return 0;
};

module.exports.haveEarningsChanged = (oldPrice, oldPe, newPrice, newPe) => {
    let oldEps = oldPrice / oldPe;
    let newEps = newPrice / newPe;
    return oldEps !== newEps;
};

module.exports.areFloatEqual = (oldFloat, newFloat) => {
    const MARGIN = 0.01;
    return Math.abs(newFloat/oldFloat - 1) < MARGIN;
};

module.exports.computeStatistics = (securities) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let sum_weights = 0;
    let sum_weighted_pe = 0;
    let averagePe = 0;
    let nb = 0;
    let nbNegativeEarnings = 0;
    securities.forEach(sec => {
        if (sec.eps < 0) {
            nbNegativeEarnings++;
        }
        if (sec.pe < min) {
            min = sec.pe;
        }
        if (sec.pe > max) {
            max = sec.pe;
        }
        const weight = sec["% weight"];
        sum_weights += weight;
        sum_weighted_pe += weight*sec.pe;
        nb++;
    });
    if (sum_weights > 0) {
        averagePe = sum_weighted_pe / sum_weights;
    }
    return {
        min: min,
        max: max,
        averagePe: averagePe.toFixed(2),
        nbNegativeEarnings: nbNegativeEarnings,
        totalSecurities: nb
    };
};
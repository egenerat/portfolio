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
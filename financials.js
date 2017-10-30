"use strict";
module.exports.computeForwardPeRatio = (currentPeRatio, earningsGrowth)=> {
    let forwardPeRatio = 0;
    return 0;
};

module.exports.haveEarningsChanged = (oldPrice, oldPe, newPrice, newPe) => {
    let oldEarnings = oldPe / oldPrice;
    let newEarnings = newPe / newPrice;
    return oldEarnings !== newEarnings;
};
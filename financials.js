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

module.exports.hasPeChanged = (oldPe, newPe) => {
    const margin = 0.01;
    return newPe < (1 - margin) * oldPe || newPe > (1 + margin) * oldPe;
};
"use strict";

const calculateAverageMetric = (portfolio, fundamentals, metric) => {
    let amount, fundamental;
    let result = portfolio.reduce((acc, security) => {
        fundamental = fundamentals.find(e => e.ticker == security.ticker);
        amount = security.qty * fundamental.price;
        acc.totalAmount += amount;
        acc.weightedSum += amount * fundamental[metric];
        return acc;
    }, {
        totalAmount: 0,
        weightedSum: 0
    });
    return result.weightedSum / result.totalAmount;
};

module.exports.calculateAverageMetric = calculateAverageMetric;
"use strict";
const colors = require("colors/safe");
const logger = require("./logger.js");

module.exports.compareEtfs = (arr) => {
    const [a, b] = arr;

    const COLUMN_SMALL_WIDTH = 25;
    const COLUMN_WIDTH = 65;
    logger.info(`${"".padEnd(COLUMN_SMALL_WIDTH)}|${a.key.padEnd(COLUMN_WIDTH)}|${b.key.padEnd(COLUMN_WIDTH)}|`);
    
    const criteria = ["forecastPe", "pb", "dividend", "longTermEarningGrowth", "historicalEarningGrowth", "bookValueGrowth",
        "cashFlowGrowth", "salesGrowth", "lastQuarter", "bestQuarter", "worstQuarter", "cumulatedPerformance"];
    for (const c of criteria) {
        // print field name
        let line = `${c.padEnd(COLUMN_SMALL_WIDTH)}|`;
        let min = undefined;
        let max = undefined;
        
        // print field value for all the securities
        for (const f of arr) {
            const val = f[c];
            line += `${val.toString().padEnd(COLUMN_WIDTH)}|`;
            min = min === undefined ? val : Math.min(min, val);
            max = max === undefined ? val : Math.max(max, val);
        }

        // Print the statistics for the criteria
        line += colors.yellow(`${( ((max/min) - 1) * 100 ).toFixed(0)}%`);

        logger.info(line);
    }
};
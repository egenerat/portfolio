"use strict";
const colors = require("colors/safe");
const logger = require("./logger.js");

const COLUMN_SMALL_WIDTH = 25;
const COLUMN_WIDTH = 10;

const colorizeLine = (arr, min, max) => {
    const middle = (max + min) / 2;
    return arr.reduce((acc, curr) => {
        const val = curr.toFixed(2);
        let colourFunc;
        if (curr < middle) {
            colourFunc = colors.green;
        }
        else if (curr > middle) {
            colourFunc = colors.red;
        }
        else {
            colourFunc = colors.yellow;
        }
        acc += `${colourFunc(val.padEnd(COLUMN_WIDTH))}|`;
        return acc;
    }, "");
};

module.exports.compareEtfs = (arr) => {
    const [a, b] = arr;

    logger.info(`${"".padEnd(COLUMN_SMALL_WIDTH)}|${a.key.padEnd(COLUMN_WIDTH)}|${b.key.padEnd(COLUMN_WIDTH)}|`);
    
    const FIELDS = ["forecastPe", "pb", "dividend", "longTermEarningGrowth", "historicalEarningGrowth", "bookValueGrowth",
        "cashFlowGrowth", "salesGrowth", "lastQuarter", "bestQuarter", "worstQuarter", "cumulatedPerformance"];
    for (const f of FIELDS) {
        // print field name
        let line = `${f.padEnd(COLUMN_SMALL_WIDTH)}|`;

        const values = [];
        for (const sec of arr) {
            values.push(sec[f]);
        }
        const min = Math.min(...values);
        const max = Math.max(...values);
        line += colorizeLine(values, min, max);

        // Print the statistics for the field
        const difference = ( ((max/min) - 1) * 100 ).toFixed(0);
        if (difference >= 5) {
            line += colors.green(`+${difference}%`);
        }
        else if (difference <= -5) {
            line += colors.red(`${difference}%`);
        }
        else {
            line += colors.yellow(`${difference}%`);
        }          

        logger.info(line);
    }
};
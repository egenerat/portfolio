"use strict";
const financials = require("../financials");
const assert = require("assert");

describe("financials", () => {
    describe("detectEarningChanged", () => {
        it("should return true when the earnings have changed", () => {
            assert.equal(true, financials.haveEarningsChanged(10, 10, 12, 10));
        });
        it("should return false when the earnings are constant", () => {
            assert.equal(false, financials.haveEarningsChanged(10, 10, 12, 12));
        });
    });

    describe("computeForwardPeRatio", () => {
        it("should compute forward P/E ratio", () => {
            assert.equal(10, financials.computeForwardPeRatio(11, 10));
        });
    });

    describe("computeStatistics", () => {
        it("should return 0 if the list is empty", () => {
            const securities = [];
            const result = financials.computeStatistics(securities);
            assert.equal(0.0, result.averagePe);
        });
        it("should return average if several values", () => {
            const securities = [{
                pe: 10,
                "% weight": 10
            }, {
                pe: 20,
                "% weight": 90
            }];
            const result = financials.computeStatistics(securities);
            assert.equal(19, result.averagePe);
        });
    });
});

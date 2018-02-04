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
});

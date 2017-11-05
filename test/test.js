const financials = require("../financials");

var assert = require("assert");
describe("financials", function() {
    describe("detectEarningChanged", function() {
        it("should return true when the earnings have changed", function() {
            assert.equal(true, financials.haveEarningsChanged(10, 10, 12, 10));
        });
        it("should return false when the earnings are constant", function() {
            assert.equal(false, financials.haveEarningsChanged(10, 10, 12, 12));
        });
    });
});

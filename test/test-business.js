"use strict";
const business = require("../app/core/business.js");
const assert = require("assert");

describe("business", () => {
    describe("sumHoldings", () => {
        it("should return the sum of percentages of an array of arrays", () => {
            const holdings = [["AA", "Alberto Antonio", 9.45], ["BB", "Brais Bernard", 7.55]];
            assert.equal(business.sumHoldings(holdings), 17);
        });

        it("should return the sum of percentages of an array of dictionaries", () => {
            const holdings = [{
                symbol: "AA",
                name: "Alberto Antonio",
                "% weight": 9.45
            }, {
                symbol: "BB",
                name: "Brais Bernard",
                "% weight": 7.55
            }];
            assert.equal(business.sumHoldings(holdings), 17);
        });
    });
});

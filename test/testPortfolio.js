const parser = require("../portfolio.js");

var assert = require("assert");
describe("portfolio", () => {
    describe("calculateAverageMetric", () => {
        const portfolio = [{
            ticker: "ABC",
            qty: 1
        }, {
            ticker: "DEF",
            qty: 3
        }];

        const fundamentals = [{
            ticker: "ABC",
            price: 90,
            pe: 10,
            forwardPe: 8
        }, {
            ticker: "DEF",
            price: 70,
            pe: 20,
            forwardPe: 18
        }];
        it("should return the portfolio average for a specific metric", () => {
            assert.equal(17, parser.calculateAverageMetric(portfolio, fundamentals, "pe"));
        });
        it("should return the portfolio average for another metric", () => {
            assert.equal(15, parser.calculateAverageMetric(portfolio, fundamentals, "forwardPe"));
        });
        
    });
});

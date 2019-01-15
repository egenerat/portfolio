"use strict";
const analyzerUtils = require("../analyzer-utils.js");
const assert = require("assert");

describe("analyzerUtils", () => {
    describe("computeChangesEtf", () => {
        it("should return [] when the input is empty", () => {
            const oldSecurities = [{}];
            const newSecurities = [{}];
            assert.deepEqual([], analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").cheaperList);
            assert.deepEqual([], analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").moreExpensiveList);
        });

        it("should identify one security more expensive", () => {
            const oldSecurities = [{"name": "A", "pe": 10}];
            const newSecurities = [{"name": "A", "pe": 11}];
            assert.equal(0, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").cheaperList.length);
            assert.equal(1, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").moreExpensiveList.length);
        });

        it("should identify one cheaper security", () => {
            const oldSecurities = [{"name": "A", "pe": 10}];
            const newSecurities = [{"name": "A", "pe": 9}];
            assert.equal(1, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").cheaperList.length);
            assert.equal(0, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").moreExpensiveList.length);
        });

        it("should not return anything, as security has not changed", () => {
            const oldSecurities = [{"name": "A", "pe": 10}];
            const newSecurities = [{"name": "A", "pe": 10}];
            assert.equal(0, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").cheaperList.length);
            assert.equal(0, analyzerUtils.computeChangesEtf([oldSecurities, newSecurities], "pe").moreExpensiveList.length);
        });
    });
});

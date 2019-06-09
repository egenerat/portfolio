"use strict";
const parserUtils = require("../parsers/parser-utils.js");
const assert = require("assert");

describe("parser utils", () => {
    it("aggregate", () => {
        it("should aggregate list of dictionaries", () => {
            assert.deepEqual({a: 1, b: 2}, parserUtils.aggregate([{a: 1}, {b: 2}]));
        });
    });
});

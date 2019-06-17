"use strict";
const utils = require("../app/core/utils.js");
const assert = require("assert");

describe("utils", () => {
    describe("strToDate", () => {
        it("should create a date from a string in the format DD/MM/YYYY", () => {
            assert.deepEqual(utils.strToDate("23/06/2016"), new Date(Date.UTC(2016, 5, 23)));
        });
    });
});
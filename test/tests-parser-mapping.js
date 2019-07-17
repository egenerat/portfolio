"use strict";
const parserMapping = require("../app/config/mappings/parser-mapping.js");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("parser mapping", () => {
    describe("getPageParser", () => {
        const parsingFunction = ($) => {
            return {
                extracted: $("").text().split(" ")[2]
            };
        };
        const page = () => {
            return {
                text: () => "This is the header of the page"
            };
        };
        const mapping = {
            "header of the page": parsingFunction
        };
        it("should return the correct parser for a page", () => {  
            return expect(parserMapping.getPageParser(page, mapping)).to.eventually.deep.equal({
                extracted: "the"
            });
        });
        it("should reject if there is no parser for this page", () => {
            const emptyMapping = {};
            return expect(parserMapping.getPageParser(page, emptyMapping)).to.eventually
                .be.rejectedWith("No parser found for this page");
        });
        it("should reject if the page has no content", () => {
            const emptyPage = () => {
                return {
                    text: () => ""
                };
            };
            return expect(parserMapping.getPageParser(emptyPage, mapping)).to.eventually
                .be.rejectedWith("The text is empty");
        });
    });
});

#! /usr/bin/env node
"use strict";

const logger = require("../app/core/logger.js");
const { Database } = require("../app/persistence/db.js");
const { compareEtfs } = require("../app/core/comparison-utils.js");
const { correlations } = require("../app/core/correlations.js");
const dao = require("../app/persistence/dao.js"); 

const db = new Database("securities.db");

let args = process.argv.slice(2);
if (args.length === 2) {
    Promise.all(args.map(x => {
        return db.find({key: {$regex : new RegExp(x, "i")}}, true)
            .then(securities => {
                if (securities.length > 1) {
                    return Promise.reject(`Too many items for ${x}`);
                }
                return securities[0];
            });
    }))
        .then(securities => securities.filter(x => x !== undefined))
        .then(securities => {
            if (securities.length >= 2) {
                compareEtfs(securities);
                correlations(securities);
            }
            else {
                return Promise.reject("Could not find data for the requested securities");
            }            
        })
        .catch(err => {
            logger.error(err);
            logger.error("Possible values are:");
            dao.listSecurityNames()
                .then(logger.error);
        });
}
else {
    logger.warning("No/not enough argument passed");
    logger.warning(`Possible values are:\n${dao.listSecurities()}`);
}
#! /usr/bin/env node
"use strict";
const { Database } = require("../app/persistence/db.js");
const { correlations } = require("../app/core/correlations.js");

const db = new Database("securities.db");

db.find()
    .then(correlations);

module.exports.correlations = correlations;
#! /usr/bin/env node
"use strict";
const constants = require("../app/config/constants/constants.js");
const logger = require("../app/core/logger.js");
const http = require("../app/core/http.js");
const { Database } = require("../app/persistence/db.js");

const db = new Database("securities.db");
const uri = "http://localhost:5000/correlations";

logger.info("Securities excluded from the correlation computation:");
logger.info(constants.CORRELATION_BLACKLIST);

db.find()
    .then(securities => securities.map(x => { return {security: x.key, performances: x.quarterlyReturns}; } ) )
    .then(x => x.filter(y => !constants.CORRELATION_BLACKLIST.includes(y.security)))
    .then(body => http.postJson(uri, body))
    .then(res => logger.info(res))
    .catch(res => logger.error(`${res.message}`));

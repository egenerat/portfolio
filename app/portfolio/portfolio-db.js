"use strict";

const { PortfolioSecurity } = require("./portfolio_security.js");
const { calculateAverageMetric } = require("./portfolio.js");

const analyzerUtils = require("../analyzerUtils.js");
const utils = require("../utils.js");

const portfolio = [];
portfolio.push(new PortfolioSecurity("EEM", 10));
portfolio.push(new PortfolioSecurity("EWS", 10));
portfolio.push(new PortfolioSecurity("EWZ", 10));

const INTERESTING_METRICS = ["pe", "forecastPe"];

const path = "2018-1-6";
analyzerUtils.constructFilePath(path)
    .then(utils.readFromCsv)
    .then(fundamentals => INTERESTING_METRICS.forEach(metric => 
        calculateAverageMetric(portfolio, fundamentals, metric)
    ));
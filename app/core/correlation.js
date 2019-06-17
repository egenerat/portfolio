const Correlation = require("node-correlation");
const logger = require("./logger.js");

const a = [1, 2, 3, 4, 5];
const b = [0, 6, 2, 10, 4];
logger.info(Correlation.calc(a, b));
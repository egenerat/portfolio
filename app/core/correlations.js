"use strict";
const http = require("./http.js");
const logger = require("./logger.js");
const constants = require("../config/constants/constants");


const displayCorrelations = (res) => {
    logger.info("Securities excluded from the correlation computation:");
    logger.info(constants.CORRELATION_BLACKLIST);

    res.correlations.sort((a, b) => {
        return b[0] - a[0];
    });
    logger.info("\nHighly correlated securities");
    logger.info(res.correlations.slice(0, 10));

    logger.info("\nNon-correlated securities");
    logger.info(res.correlations.slice(-10));

    logger.info(`\nCorrelations calculated over ${res.min_size / 4} years`);
    logger.info("Securities with limited history:");
    logger.info(res.limiting);
};

module.exports.correlations = (securities) => {
    Promise.resolve(securities.map(x => {
        return {security: x.key, performances: x.quarterlyReturns};
    }))
        .then(x => x.filter(y => !constants.CORRELATION_BLACKLIST.includes(y.security)))
        .then(body => http.postJson(constants.CORRELATION_URI, body))
        .then(displayCorrelations)
        .catch(res => logger.error(`${res.message}`));
};
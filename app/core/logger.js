"use strict";

const colors = require("colors/safe");

module.exports.info = (message) => {
    console.log(message);
};

module.exports.warning = (message) => {
    console.warn(message);
};

module.exports.error = (message) => {
    console.error(colors.red(message));
};
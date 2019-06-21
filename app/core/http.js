"use strict";
const rpn = require("request-promise-native");
const constants = require("../config/constants/constants.js");

module.exports.postJson = (uri, body) => {
    const options = {
        method: "POST",
        uri: uri,
        body: body,
        json: true // Stringify body to JSON
    };
    return rpn(options);
};

module.exports.getJson = (uri) => {
    return module.exports.openPage(uri, JSON.parse);
};

module.exports.openPage = (url, transform = null) => {
    let options = {
        uri: url,
        headers: constants.HEADERS,
        transform: transform
    };
    return rpn(options);
};
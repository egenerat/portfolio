const { Database } = require("./db.js");

const listSecurityNames = () => {
    const db = new Database("securities.db");
    return db.find({}, {key: 1, _id: 0});
};

module.exports.listSecurityNames = listSecurityNames;
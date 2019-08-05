const { Database } = require("./db.js");

module.exports.listSecurityNames = () => {
    const db = new Database("securities.db");
    return db.find({}, {key: 1, _id: 0});
};
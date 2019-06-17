const { Database } = require("../db.js");
const logger = require("./logger.js");

const db = new Database("trash.db");
// Creating another instance, pointing to the same DB file
const db2 = new Database("trash.db");

db.insert([{ price: 123 }, {price: 456}, {price: 7890}])
    .then(logger.info);
db2.insert({ price: 789 })
    .then(logger.info);
db.find({ price: { $lt: 1000 } })
    .then(logger.info);
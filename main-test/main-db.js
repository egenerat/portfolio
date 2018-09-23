const { Database } = require("../db.js");

const db = new Database("trash.db");
// Creating another instance, pointing to the same DB file
const db2 = new Database("trash.db");

db.insert([{ price: 123 }, {price: 456}, {price: 7890}])
    .then(console.log);
db2.insert({ price: 789 })
    .then(console.log);
db.find({ price: { $lt: 1000 } })
    .then(console.log);

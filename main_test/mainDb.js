const db = require("../db");

db.insert({ price: 1 })
    .then(console.log);
db.find({ price: { $lt: 10 } })
    .then(console.log);

const db = require("../db");

db.insert([{ price: 123 }, {price: 456}])
    .then(console.log);
db.find({ price: { $lt: 1000 } })
    .then(console.log);

const Nedb = require("nedb");

const securities = new Nedb({ filename: "data/output/data.db", autoload: true });
// Data insertion
securities.insert({ name: "A", price: 1 }, (err) => {
    securities.insert({ name: "B", price: 2 }, (err) => {
        // Queries
        securities.find({ price: { $lt: 10 } }, (err, docs) => {
            // docs is an array containing A and B
            console.log(docs);
        });
    });
});
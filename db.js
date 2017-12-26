const Nedb = require("nedb");

const securities = new Nedb({ filename: "data/output/data.db", autoload: true });

const insert = (obj) => {
    return new Promise((resolve, reject) => {
        securities.insert(obj, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

const find = (filter) => {
    return new Promise((resolve, reject) => {
        securities.find(filter, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

module.exports.insert = insert;
module.exports.find = find;
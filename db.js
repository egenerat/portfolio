const Nedb = require("nedb");

class Database {

    constructor(dbName) {
        this.securities = new Nedb({ filename: `data/output/${dbName}`, autoload: true });
    }

    find(filter) {
        return new Promise((resolve, reject) => {
            this.securities.find(filter, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    insert(obj) {
        if (Array.isArray(obj)) {
            obj = obj.filter(x => x !== undefined);
        }
        return new Promise((resolve, reject) => {
            this.securities.insert(obj, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}

module.exports.Database = Database;
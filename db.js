const Nedb = require("nedb");
const constants = require("./constants/constants.js");

const instances = {};

class Database {

    constructor(filename) {
        filename = filename || "data.db";
        const db_path = constants.DB_FOLDER + filename;
        this.db = this.getInstance(db_path);
    }

    getInstance(db_path) {
        if (instances[db_path]) {
            console.log("retrieve instance");
            return instances[db_path];
        }
        console.log("create new instance");
        instances[db_path] = new Nedb({ filename: db_path, autoload: true });
        return instances[db_path];
    }

    insert(obj) {
        if ( Array.isArray(obj) ) {
            obj = obj.filter(x => x !== undefined);
        }
        return new Promise((resolve, reject) => {
            this.db.insert(obj, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    find(filter) {
        return new Promise((resolve, reject) => {
            this.db.find(filter, (err, docs) => {
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
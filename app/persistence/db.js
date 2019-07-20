const Nedb = require("nedb");
const constants = require("../config/constants/constants.js");
// const logger = require("../core/logger.js");

const instances = {};

class Database {

    constructor(filename) {
        filename = filename || "data.db";
        const db_path = constants.DB_FOLDER + filename;
        this.db = this.getInstance(db_path);
    }

    getInstance(db_path) {
        if (instances[db_path]) {
            // logger.info("retrieve instance");
            return instances[db_path];
        }
        // logger.info("create new instance");
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

    find(filter, fields) {
        return new Promise((resolve, reject) => {
            this.db.find(filter, fields, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    findMostRecent(filter, failIfEmpty) {
        return new Promise((resolve, reject) => {
            this.db.find(filter).sort({ date: -1 }).limit(1).exec( (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    if (docs === null && failIfEmpty) {
                        reject(`No document found ${JSON.stringify(filter)}`);
                    }
                    resolve(docs[0]);
                }
            });
        });
    }

    findOne(filter, failIfEmpty) {
        return new Promise((resolve, reject) => {
            this.db.findOne(filter, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    if (docs === null && failIfEmpty) {
                        reject(`No document found ${JSON.stringify(filter)}`);
                    }
                    resolve(docs);
                }
            });
        });
    }
}

module.exports.Database = Database;
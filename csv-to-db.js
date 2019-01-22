"use strict";

const constants = require("./constants/constants.js");
const utils = require("./utils.js");
const { Database } = require("./db.js");

const db = new Database("csv-import.db");
utils.list_files(constants.EXPORT_FOLDER)
    .then(files =>
        files.map(filename => {
            utils.readFromCsv(`${constants.EXPORT_FOLDER}/${filename}`)
                .then(x => db.insert(x));
        })
    );
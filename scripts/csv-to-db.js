#! /usr/bin/env node
"use strict";

const constants = require("../app/config/constants/constants.js");
const utils = require("../app/core/utils.js");
const { Database } = require("../app/persistence/db.js");

const db = new Database("csv-import.db");
utils.list_files(constants.EXPORT_FOLDER)
    .then(files =>
        files.map(filename => {
            utils.readFromCsv(`${constants.EXPORT_FOLDER}/${filename}`)
                .then(x => db.insert(x));
        })
    );
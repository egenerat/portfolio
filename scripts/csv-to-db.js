#! /usr/bin/env node
"use strict";

const cli = require("cli");
const constants = require("../app/config/constants/constants.js");
const logger = require("../app/core/logger.js");
const utils = require("../app/core/utils.js");
const { Database } = require("../app/persistence/db.js");

const cliArgs = cli.parse({
    save: [ "s", "Save output to database", "boolean" ],
});

const db = new Database("csv-import.db");
utils.list_files(constants.EXPORT_FOLDER)
    .then(files =>
        files.map(filename => {
            utils.readFromCsv(`${constants.EXPORT_FOLDER}${filename}`)
                .then(x => {
                    logger.info(`Extracted from file ${filename}`);
                    if (cliArgs.save) {
                        db.insert(x);
                    }
                    else {
                        logger.info(x);
                    }
                })
                .catch(logger.error);
        })
    );
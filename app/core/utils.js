"use strict";
const csv = require("fast-csv");
const fsPromises = require("fs").promises;
const logger = require("./logger.js");

module.exports.createFolder = (folderName) => {
    fsPromises.mkdir(folderName, { recursive: true })
        .catch(logger.error);
};

module.exports.saveFile = (filePath, content) => {
    return fsPromises.writeFile(filePath, content)
        .then((filename) => {
            logger.info(filename);
        })
        .catch((err) => {
            logger.error(err);
        });
};

module.exports.cleanupStringFloat = (text) => {
    return parseFloat(
        text
            .replace("EUR", "")
            .replace(/[%$,]/g,"")
    );
};

module.exports.cleanupText = (text) => {
    return text.replace("\n\t", "").trim();
};

module.exports.formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports.transformDictToCsvLine = (dictionaryList) => {
    return dictionaryList.map((dict) => Object.keys(dict).map(k => dict[k]).join(",")).join("\n");
};

module.exports.removeEmptyValues = (data) => {
    return data.filter(elt => elt !== undefined);
};

module.exports.transformToCsv = (listResults) => {
    if (listResults.length > 0) {
        let header = Object.keys(listResults[0]).join(",");
        let body = exports.transformDictToCsvLine(listResults);
        return Promise.resolve(header + "\n" + body);
    } else {
        return Promise.reject("empty list");
    }
};

module.exports.readFromCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        let result = [];
        let options = {
            headers: true
        };
        csv
            .fromPath(filePath, options)
            .on("data", (data) => {
                result.push(data);
            })
            .on("end", () => {
                return resolve(result);
            })
            .on("error", (error) => {
                return reject(`Error when parsing ${filePath}\n${error.message}`);
            });
    });
};


module.exports.list_files = (folderPath) => {
    return fsPromises.readdir(folderPath);
};

module.exports.prettyPrintPercentage = (floatValue) => {
    return ((floatValue - 1) * 100).toFixed(2) + "%";
};

module.exports.strToDate = (str_date) => {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    return new Date(str_date.replace(pattern, "$3-$2-$1"));
};
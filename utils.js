"use strict";
const mkdirp = require("mkdirp-promise");
const write = require("fs-writefile-promise/lib/node6");
const csv = require("fast-csv");
const readdir = require("fs-readdir-promise");

module.exports.createFolder = (folderName) => {
    mkdirp(folderName)
        .catch(console.error);
};

module.exports.saveFile = (filePath, content) => {
    return write(filePath, content)
        .then((filename) => {
            console.log(filename);
        })   
        .catch((err) => {
            console.error(err);
        });
};

module.exports.formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports.transformDictToCsvLine = (dictionaryList) => {
    return dictionaryList.map((dict) => Object.keys(dict).map(k => dict[k]).join(",")).join("\n");
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
            });
    });
};


module.exports.list_files = (folderPath) => {
    return readdir(folderPath);
};

module.exports.prettyPrintPercentage = (floatValue) => {
    return ((floatValue - 1) * 100).toFixed(2) + "%";
};
const utils = require('./utils');

const OUTPUT_FOLDER = "data/output/";
utils.list_files(OUTPUT_FOLDER)
.then(console.log)

const constructFilePath = (date) => {
    return OUTPUT_FOLDER + path[0] + ".csv"
}

let path = ["2017-10-21", "2017-10-28"];
path.forEach(x => {
    let path = constructFilePath(x);
    utils.readFromCsv(path);
});
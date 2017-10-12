const fs = require('fs');

const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const write = require('fs-writefile-promise/lib/node6')
const business = require('./business');
const constants = require('./constants');
const utils = require('./utils');

function parsePage(url, extractFunction) {
  let options = {
    uri: url,
    headers: constants.HEADERS,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
	return rpn(options)
    .then(extractFunction);
}

const EXPORT_FILE = constants.EXPORT_FOLDER + utils.formatDate(new Date()) + '.csv';
console.log(EXPORT_FILE);

Promise.all(constants.URLS.map((element) => parsePage(element, extractEtfInformation)))
  .then(business.filter)
  .then(result => utils.transformToCsv(result))
  .then(console.log())
  .then(result => saveFile(constants.EXPORT_FILE, result));
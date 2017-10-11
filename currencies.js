const rpn = require('request-promise-native');
const constants = require('constants');
// Documentation: http://fixer.io/

// http://api.fixer.io/latest?base=GBP
// http://api.fixer.io/2000-01-03?base=GBP

exports.getFxRates = (base, day) => {
    let options = {
      uri: `http://api.fixer.io/${day}?base=${base}`,
      headers: constants.HEADERS,
      transform: function (body) {
        return JSON.parse(body);
      }
    };
    return rpn(options)
  }

exports.getFxRates('GBP', 'latest')
.then(res => console.log(res.rates.EUR));

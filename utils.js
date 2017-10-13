const mkdirp = require('mkdirp-promise');
const write = require('fs-writefile-promise/lib/node6');

exports.createFolder = (folderName) => {
	mkdirp(folderName)
	.catch(console.error)
}

exports.saveFile = (filePath, content)=> { 
  return write(filePath, content)
    .then(function (filename) {
      console.log(filename)
    })   
    .catch(function (err) {
      console.error(err)
    });
}

exports.formatDate = (date) => {	
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 1}`;
};

exports.transformDictToCsvLine = (dictionaryList) => {
  return dictionaryList.map((dict) => Object.keys(dict).map(k => dict[k]).join(',')).join('\n');
};
  
exports.transformToCsv = (listResults) => {
	if (listResults.length > 0) {
	  let header = Object.keys(listResults[0]).join(',');
	  let body = exports.transformDictToCsvLine(listResults);
	  return Promise.resolve(header + '\n' + body);
	} else {
	  return Promise.reject("empty list");
	}
}
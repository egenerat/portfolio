const mkdirp = require('mkdirp-promise');
const write = require('fs-writefile-promise/lib/node6');
const csv = require("fast-csv");

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
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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

exports.readFromCsv = (filePath) => {	
  let options = {
		headers: true
	};
	csv
		.fromPath(filePath, options)
		.on("data", function(data){
			console.log(data);
		})
		.on("end", function(){
			console.log("done");
		});
	}
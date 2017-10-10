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
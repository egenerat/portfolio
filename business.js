exports.filter = (data) => {
	data.forEach( function(element) {;
		delete element.stockStyleExposure;
		delete element.stockStyleExposure;
		delete element.sectors;
		delete element.marketCapitalizations;
		delete element.regions;
	});
	return Promise.resolve(data);
}
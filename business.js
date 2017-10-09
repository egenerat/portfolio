exports.filter = (data) => {
	data.forEach( function(element) {;
		delete element.stockStyleExposure;
		delete element.stockStyleExposure;
		delete element.sectors;
		delete element.marketCapitalizations;
		delete element.regions;
		element.pePb = (element.pe * element.pb).toFixed(1);
		element.forwardPePb = (element.forwardPe * element.forwardPb).toFixed(1);
	});
	return Promise.resolve(data);
}
exports.conmputeFuturePeRatio = (currentPeRatio, growth)=> { 
    return 
}

exports.haveEarningsChanged = (oldPrice, oldPe, newPrice, newPe) => {
	let oldEarnings = oldPe / oldPrice;
	let newEarnings = newPe / newPrice;
	return oldEarnings !== newEarnings;
}
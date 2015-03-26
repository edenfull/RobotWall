var getCountdown = function() {
		var moment = require("moment");
		
		var andieBday = 137, // May 17
				edenBday = 31, // Jan 31
				andieCount, edenCount,
				allCountdowns = [];

		// If birthday has already passed, count down for next year's.
		if (moment().isAfter(moment().dayOfYear(andieBday))) andieCount = (365 - moment().dayOfYear()) + andieBday;
		else if (moment().isBefore(moment().dayOfYear(andieBday))) andieCount = moment().dayOfYear() - andieBday;

		if (moment().isAfter(moment().dayOfYear(edenBday))) edenCount = (365 - moment().dayOfYear()) + edenBday;
		else if (moment().isBefore(moment().dayOfYear(edenBday))) edenCount = moment().dayOfYear() - edenBday;

		if (andieCount) allCountdowns.push([Math.abs(andieCount) + " days until", "Andie's birthday!"]);
		else allCountdowns.push(["Happy birthday", "Andie!"]);

		if (edenCount) allCountdowns.push([Math.abs(edenCount) + " days until", "Eden's birthday!"]);
		else allCountdowns.push(["Happy birthday", "Eden!"]);

		return allCountdowns;
};

module.exports.getCountdown = getCountdown;

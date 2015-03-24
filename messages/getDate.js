var getDate = function() {
		var moment = require("moment"),
				today = moment().format("ddd, MMM Do"),
				time = moment().format("h:mm a");
		
		return [today, time];
};

module.exports.getDate = getDate;

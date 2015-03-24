var getDate = function() {
		var moment = require("moment"),
				today = moment().format("Q: ddd, MMM Do"),
				time = moment().format("h:mm a");
		
		return ["Q" + today, time];
};

module.exports.getDate = getDate;

var rp = require("request-promise"),
		Promise = require("bluebird");

var key = "d92fae1687d55d691bf54f9722f1f8a6",
		city = "5128581", units = ["metric", "imperial"];

var json = {};

var getWeatherData = function() {
		var promises = [];
		
		units.forEach(function(unit) {
				var options = {
						uri: "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + city + "&mode=json&units=" + unit + "&APPID=" + key,
						method: "GET" };

				promises.push(rp(options).then(function(res) {
						json[unit] = res;
				}, function(err) {
						console.log(err);
				}));
		});

		return Promise.all(promises);
};

getWeatherData().then(function() {
		console.log(json);
});

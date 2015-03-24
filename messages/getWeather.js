var rp = require("request-promise"),
				Promise = require("bluebird");

var getWeather = function() {
		var key = "d92fae1687d55d691bf54f9722f1f8a6",
				city = "5128581",
				displayMsg = [];

		var options = {
				uri: "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + city + "&units=metric&mode=json&cnt=1&APPID=" + key,
				method: "GET" };

		var promise = rp(options).then(function(res) {
				var raw = JSON.parse(res);

				var highC = Math.round(raw.list[0].temp.max),
						lowC = Math.round(raw.list[0].temp.min),
						highF = Math.round(highC * 9 / 5 + 32),
						lowF = Math.round(lowC * 9 / 5 + 32);
				
				displayMsg.push(raw.list[0].weather[0].main);
				displayMsg.push(lowC + "/" + highC + String.fromCharCode(130) + "C, " + lowF + "/" + highF + String.fromCharCode(130) + "F");

				return displayMsg;
		}, function(err) {
				console.log(err);
		});

		return promise;
};

module.exports.getWeather = getWeather;

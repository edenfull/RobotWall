var Promise = require("bluebird"),
		Repeat = require("repeat"),
		client = require("./signClient.js"),
		weather = require("../messages/getWeather.js"),
		today = require("../messages/getDate.js"),
		pwd = __dirname,
		glyphsPath = "./glyphs/";

var current = new client.SignClient(glyphsPath, pwd);

// Welcome message.
current.sendTextToSign(["Andie + Eden", "= Awesomeness"]);

// Change the display every 30 seconds.
var displayWeather = function() {
		weather.getWeather().then(function(weatherData) {
				current.sendTextToSign(weatherData);
		});	
};

var displayDay = function() {
		current.sendTextToSign(today.getDate());				
};
		
Repeat(displayDay).every("30", "s").for("60", "min").start.in("15", "s");
Repeat(displayWeather).every("30", "s").for("60", "min").start.in("30", "s");

var Promise = require("bluebird"),
		Repeat = require("repeat"),
		client = require("./signClient.js"),
		weather = require("../messages/getWeather.js"),
		today = require("../messages/getDate.js"),
		pwd = __dirname,
		glyphsPath = "./glyphs/";

var current = new client.SignClient(glyphsPath, pwd);

// Custom  message.
var displayText = function() {
		current.sendTextToSign(["Andie + Eden", "= Awesomeness"]);		
};

var displayWeather = function() {
		weather.getWeather().then(function(weatherData) {
				current.sendTextToSign(weatherData);
		});	
};

var displayDay = function() {
		current.sendTextToSign(today.getDate());				
};

// Change the display every 15 seconds.
Repeat(displayText).every("45", "s").for("60", "min").start.now();
Repeat(displayDay).every("45", "s").for("60", "min").start.in("15", "s");
Repeat(displayWeather).every("45", "s").for("60", "min").start.in("30", "s");

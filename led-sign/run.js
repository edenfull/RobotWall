var Promise = require("bluebird"),
		fs = require("fs"),
		Repeat = require("repeat"),
		client = require("./signClient.js"),
		weather = require("../messages/getWeather.js"),
		today = require("../messages/getDate.js"),
		countdown = require("../messages/getCountdown.js"),
		pwd = __dirname,
		glyphsPath = "./led-sign/glyphs/";

var current = new client.SignClient(glyphsPath, pwd),
		weatherDisplay = new weather.Display();

var updateWeather = function() { weatherDisplay.storeWeather(); };

var countdownData = countdown.getCountdown();

// Custom message.
var displayText = function() { current.sendTextToSign(["Andie + Eden", "= Awesomeness"]); };

var displayWeather = function() {
		var weatherData = fs.readFileSync("./weather.txt").toString().trim().split("\n");
		
		current.sendTextToSign([weatherData[0],
														weatherData[1] + "/" + weatherData[2] + String.fromCharCode(130) + "C, " + weatherData[3] + "/" + weatherData[4] + String.fromCharCode(130) + "F"]);
};

var displayDay = function() {	current.sendTextToSign(today.getDate()); };

var displayCountdowns = function() {
		current.sendTextToSign(countdownData[0]);

		var secondCountdown = function() {
				current.sendTextToSign(countdownData[1]);
		};

		Repeat(secondCountdown).every("1", "s").for("1", "s").start.in("5", "s");
};

// GET request for new weather data every 15 min.
Repeat(updateWeather).every("15", "min").for("60", "min").start.now();

// Change the display every 15 seconds.
Repeat(displayText).every("60", "s").for("60", "min").start.now();
Repeat(displayDay).every("60", "s").for("60", "min").start.in("15", "s");
Repeat(displayWeather).every("60", "s").for("60", "min").start.in("30", "s");
Repeat(displayCountdowns).every("60", "s").for("60", "min").start.in("45", "s");

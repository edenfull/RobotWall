var fontObj = require("./font.js"),
		signObj = require("./sign.js");

var SignClient = function(glyphsPath, lowLevelPath) {
		this.glyphsPath = glyphsPath;
		this.lowLevelPath = lowLevelPath;
};

SignClient.prototype.sendTextToSign = function(data) {
		var font = fontObj.returnSignFont(this.glyphsPath);
		var LEDsign = new signObj.Sign(this.lowLevelPath);

		var matrix = font.multilineRender(data, LEDsign.SCREEN_HEIGHT/2,
																			{	"ignore_shift_h": true,
																				"distance": 0,
																				"fixed_width": LEDsign.SCREEN_WIDTH });
		
		if (!matrix) return false;

		LEDsign.pic(matrix);
		return true;
};

module.exports.SignClient = SignClient;

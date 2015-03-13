var child = require("child_process");

var Sign = function(lowLevelPath) {
		this.SCREEN_WIDTH = 96, this.SCREEN_HEIGHT = 16;
		
		this.SCRIPT = lowLevelPath + "/lowlevel.pl";
};

Sign.prototype.pic = function(data) {
		var argms = [this.SCRIPT, "--type=pic"];
		var p = child.spawn("/usr/bin/perl", argms);
//		p.stdin.pipe(data);
};

var SpecialArray = function() {
		this.zeroOne = function(data) {
				return data.map(function(row) {
						row.join("");
				}).join("\n");
		};
};

module.exports.Sign = Sign;
module.exports.SpecialArray = SpecialArray;

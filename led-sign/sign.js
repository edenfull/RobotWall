var child = require("child_process");

var Sign = function(lowLevelPath) {
		this.SCREEN_WIDTH = 96, this.SCREEN_HEIGHT = 16;
		
		this.SCRIPT = lowLevelPath + "/lowlevel.pl";
};

Sign.prototype.pic = function(data) {
		var argms = [this.SCRIPT, "--type=pic"];
		var p = child.spawn("/usr/bin/perl", argms);
		console.log(data);
		p.stdin.write(data);
		p.stdin.end();
};

module.exports.Sign = Sign;

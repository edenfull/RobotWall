var client = require("./signClient.js");

var pwd = __dirname, glyphsPath = "./glyphs/";

new client.SignClient(glyphsPath, pwd).sendTextToSign(["Hello", "World"]);

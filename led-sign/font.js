var fs = require("fs");

// Reads font files and renders text.
var Font = function(data) {
		this.glyphs = {};
		this.loadGlyphs(data);
};

// Load glyphs from data.
Font.prototype.loadGlyphs = function(data) {
		var lines = data.split("\n");
		var isHeader = true, writeTo, bitmap, m, self = this;
		
		lines.forEach(function(line) {
				line.trim();
				
				// Check for RegExp matches to 3 numbers with spaces in between.
				var re = /(\d+) (\d+) (\d+)/;
				var results = re.exec(line);
				
				// If this is a glyph header (3 numbers and then the symbol).
				if (isHeader && results) {
						bitmap = [];

						// Split the 3-number header code to get the shift spec.
						m = line.split(" ");
						writeTo = { "shift_h": m[1], "shift_v": m[2]};

						self.glyphs[m[0]] = writeTo;

						// Switch the mode to the next line of a glyph.
						isHeader = false;
				} else if (!isHeader) {
						// If the next line doesn't exist, switch it back to the glyph header mode.
						if (!line) {
								isHeader = true;
								writeTo["bitmap"] = bitmap;
								self.glyphs[m[0]] = writeTo;
						} else {
								bitmap.push(line.split(""));
						}
				}
		});
};

// Render an individual line.
Font.prototype.render = function(string, height, options) {
		var buf = {}, width = 0, self = this;

		// For each character in the line, render the glyph.
		for (var i = 0, len = string.length; i < len; i++) {
				var charCode = string.charCodeAt(i);
				var glyph = self.glyphs[charCode];
				var add_shift_h;
				
				// Include the horizontal shift if applicable.
				add_shift_h = options["ignore_shift_h"] ? 0 : glyph["shift_h"];
				
				// Get the 0s and 1s for each row of the bitmap.
				glyph["bitmap"].forEach(function(row, i) {
						row.forEach(function(bit, j) {
								var bit_row = (glyph["shift_v"] - 1) - i;
								var bit_col = width + j + add_shift_h;
								
								buf[[bit_row, bit_col]] = bit;
								
								if (bit_row < 0) console.log("Negative value for" + charCode);		
						});
				});
				
				// Compute the new width.
				width += (glyph["bitmap"][0] || []).length;
				
				// Insert interval between letters.
				width += 1 + add_shift_h;				
		}

		// Render the final array.
		var result = [];
		for (var xy in buf) {
				var xySplit = xy.split(",");
				var row = (height - 1) - parseInt(xySplit[0]), col = parseInt(xySplit[1]);
				
				if (!result[row]) result[row] = [];
				result[row][col] = buf[xy];
		}
		
		var text_width = width;
		var image_width = options["fixed_width"] || width;
		
		// Fill the rest of the matrix with 0's.
		var newResult = result.map(function(row) {
				var expanded_row = row;

				// Add some 0's if the row is shorter than the text_width.
				if (expanded_row.length < text_width) {
						var zeroesToAdd = text_width - expanded_row.length;
						while (zeroesToAdd) {
								expanded_row.push(0);
								zeroesToAdd--;
						}
				}
				
				// Check how much to fill or remove.
				var slice_total = expanded_row.length - image_width,
						slice_left = Math.floor(slice_total/2);
				
				if (slice_total < 0) {
						var zeroesToPrepend = -slice_left, zeroesToAppend = (-slice_total + slice_left);

						// Prepend 0's to the beginning of the row.
						while (zeroesToPrepend) {
								expanded_row.unshift(0);
								zeroesToPrepend--;
						}

						// Append 0's to the end of the row.
						while (zeroesToAppend) {
								expanded_row.push(0);
								zeroesToAppend--;
						}
				} else if (slice_total > 0) {
						// Slice off the rest of the row.
						expanded_row = expanded_row.slice(slice_left, image_width);
				}

				// Replace empty slots with 0's.
				for (var i = 0, len = expanded_row.length; i < len; i++) {
						if (Number(expanded_row[i]) != 1) expanded_row[i] = 0;
						else expanded_row[i] = Number(expanded_row[i]);
				}
				
				return expanded_row;
		});

		return newResult;
};

Font.prototype.multilineRender = function(lines, lineHeight, options) {
		var self = this;

		var renderedLines = lines.map(function(line) {
				return self.render(line, lineHeight, options);
		});
		
		var canvas = "";
		for (var i = 0, len = renderedLines.length; i < len; i++) {
				for (var j = 1, lenj = renderedLines[i].length; j < lenj; j++) {
						for (var k = 2, lenk = renderedLines[i][j].length; k < lenk; k++) {
								canvas += renderedLines[i][j][k];
						}

						canvas += "\n";
				}
		}
		
		return canvas.trim();
};

var returnSignFont = function(glyphsPath) {
		// Load the generated font.
		var sf = new Font(fs.readFileSync(glyphsPath + "7x7.simpleglyphs").toString());

		// Load amendments.
		sf.loadGlyphs(fs.readFileSync(glyphsPath + "amends.simpleglyphs").toString());
		sf.loadGlyphs(fs.readFileSync(glyphsPath + "specific.simpleglyphs").toString());

		return sf;
};

module.exports.Font = Font;
module.exports.returnSignFont = returnSignFont;

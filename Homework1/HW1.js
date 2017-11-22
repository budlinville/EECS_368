var main = function() {
	chalk.println("Enter size of the box: ");
	var p1 = chalk.entrybox();
	p1.then(function(o) {
		makeSquare(parseInt(o));
	});
}

var makeSquare = function makeSquare(size) {
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			if (i =
			= 0 || i == (size - 1)) {
				chalk.print("*");
			} else {
				if (j == 0 || j == (size - 1)) {
					chalk.print("*");
				} else {
					chalk.print(" ");
				}
			}
		}
		chalk.println("");	
	}
}
		
		
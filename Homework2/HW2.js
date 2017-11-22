var main = function() {
	testSpaceInvader();
}

function spaceInvader() {
	//Point (0,0) on this grid is top left corner
	this.XLocation = 0;		//x coordinate
	this.YLocation = 0;		//y coordinate
	this.invadingDirection = "Right";		//holds string value of "left" or "right"
	
	//assumes screen size of 64 x 64
	this.move = function() {				
		if (this.XLocation == 0 && this.YLocation == 63) {		//if reached bottom of screen, reset to top
			this.XLocation = 0;
			this.YLocation = 0;
			this.invadingDirection = "Right";
		} else {
			if (this.invadingDirection == "Right") {
				if (this.XLocation == 63) {
					this.YLocation++;
					this.invadingDirection = "Left";
				} else {
					this.XLocation++;
				}
			} else {	//invadingDirection = "Left"
				if (this.XLocation == 0) {
					this.YLocation++;
					this.invadingDirection = "Right";
				} else {
					this.XLocation--;
				}
			}
		}
	}
}

var testSpaceInvader = function() {
	var myAlien = new spaceInvader();
	
	console.log("Iteration\tAlien Coordinates\tInvading Direction");
	/*
	 *4500 = arbitrary number of alien movements
	 *If I were to implement this graphically, I would 
	 *probably put this in a loop with an 'End-Game' Flag
	 */
	for (var i = 0; i < 4500; i++) {		
		chalk.println(i + ")\t\t(" + myAlien.XLocation + "," + myAlien.YLocation + ")\t\t\t" + myAlien.invadingDirection);
		myAlien.move();
	}
}

/*
var testGraphically = function() {
	var myAlien = new spaceInvader();
	var x = 0;
	var y = 0;
	
	console.log("Iteration\tAlien Coordinates\tInvading Direction");
	
    for (var i = 0; i < 200; i++) {
		chalk.moveCanvasObject(x, y);
		chalk.println(i + ")\t\t(" + myAlien.XLocation + "," + myAlien.YLocation + ")\t\t\t" + myAlien.invadingDirection);
		myAlien.move();
		x = myAlien.XLocation;
		y = myAlien.YLocation;
		setTimeout(function(){}, 2000);
	}
}
*/	
		
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var fps = 30;
var interval = 1000/fps;

//background
var backgroundTotalSeconds = 0;
var backgroundVx = 5;
var backgroundNumImages = Math.ceil(canvas.width / 3500) + 1;
var backgroundXpos = 0;

//sounds
var sounds = {"engine": new Audio("sounds/590329main_ringtone_SDO_launchNats.mp3"),
			  "weathertest": new Audio("sounds/581100main_Apollo-12_All-Weather-Testing.m4r"),
			  "countdown": new Audio("sounds/590319main_ringtone_apollo11_countdown.m4r"),
			  "clockstart": new Audio("sounds/582399main_Mercury-4_Clock-Started.m4r"),
			  "cardiacsim": new Audio("sounds/584851main_Apollo-12_Cardiac-Sim.mp3")};
var audioPlayer = document.getElementById('audioplayer');

//background
var backgroundImage = new Image();
backgroundImage.onload = function () {	
	settings.backgroundImageReady = true;
};
backgroundImage.src = "images/clouds.jpg";

//launchpad
var launchpadImage = new Image();
launchpadImage.onload = function () {	
	settings.launchpadImageReady = true;
	ctx.drawImage(launchpadImage, 0, 0);
};
launchpadImage.src = "images/launchpad.png";

//rocket
var rocketImage = new Image();
rocketImage.onload = function () {	
	settings.rocketImageReady = true;
};
rocketImage.src = "images/rocket.png";

//moon
var moonImage = new Image();
moonImage.onload = function () {	
	settings.moonImageReady = true;
};
moonImage.src = "images/moon.png";

//rocket split parts
var stage1Image = new Image();
stage1Image.onload = function () {	
	settings.stage1ImageReady = true;
};
stage1Image.src = "images/stage-1.png";

var stage2Image = new Image();
stage2Image.onload = function () {	
	settings.stage2ImageReady = true;
};
stage2Image.src = "images/stage-2.png";

var stage3Image = new Image();
stage3Image.onload = function () {	
	settings.stage3ImageReady = true;
};
stage3Image.src = "images/stage-3.png";

var stage4Image = new Image();
stage4Image.onload = function () {	
	settings.stage4ImageReady = true;
};
stage4Image.src = "images/stage-4.png";

//lunarmodule
var lunarmoduleImage = new Image();
lunarmoduleImage.onload = function () {	
	settings.lunarmoduleImageReady = true;
};
lunarmoduleImage.src = "images/lunarmodule.png";

//exhaust
var exhaustImage = new Image();
exhaustImage.onload = function () {	
	settings.exhaustImageReady = true;
};
exhaustImage.src = "images/exhaust.gif";

//general game settings
var settings = {
	fall: false,
	finish: false,
	gameover: false,
	planetImageReady: false,
	rocketImageReady: false,
	backgroundImageReady: false,
	exhaustImageReady: false,
	ignition: false,
	rocketX: 123,
	rocketY: 322,
	lunarModuleX: 90,
	lunarModuleY: 90,
	lunarModuleMovementDirection: "right",
	gamestatus: "launch",
	stage1x: 0,
	stage1y: 460,
	stage2x: 38,
	stage2y: 423,
	stage3x: 61,
	stage3y: 399,
	stage4x: 86,
	stage4y: 374,
	decouple: false,
	currentStage: 0
}

var performCheck = function(param) {
	document.getElementById(param).classList.add("button-square-click");
	switch(param) {
		case "weathertest":
		case "clockstart":		
		case "cardiacsim":
			sounds[param].play();
			setTimeout(confirmButton, 1000);
			setTimeout(confirmCheck, 4000);
			document.getElementById("console").value = "Performing " + param + "...\n";
			break;
		case "boostpreparation":			
		case "systemscheck":			
		case "communicationscheck":
			//in need for some sounds! Please help me out and send them so I can update thx!	
			setTimeout(confirmButton, 1000);			
			setTimeout(confirmCheck, 4000);
			document.getElementById("console").value = "Performing " + param + "...\n";
			break;
		default:
			console.log("invalid parameters");
	}
}
var confirmButton = function() {
	var buttons = document.querySelectorAll(".button-square");
	[].forEach.call(buttons, function(button) {
		button.classList.remove("button-square-click");
	});
}

var confirmCheck = function() {	
	document.getElementById("console").value = document.getElementById("console").value + "status...ok \n";
}

var keysDown = {};
addEventListener("keydown", function (e) {
	//lunarmodule movement
	if(e.keyCode == 37) {
		settings.lunarModuleMovementDirection = "left";
	}
	if(e.keyCode == 39) {
		settings.lunarModuleMovementDirection = "right";
	}
	//decouple initiate
	//space button
	if(e.keyCode == 32) {
		settings.decouple = true;
		settings.currentStage += 1;
	}
}, false);

var update = function(delta) {
	//rocket
	if(settings.ignition) {
		audioPlayer.play();
		settings.rocketY -= 10 * delta;
	}

	//rocket in space
	if(settings.gamestatus == "launched") {
		if(settings.stage4x > 400) {
			if(settings.decouple == false) {
				settings.gameover = true;
			} else {
				settings.gamestatus = "landing";
				backgroundImage.src = "images/moonsurface.jpg";			
				//show userinfo
				document.getElementById("controlpanel").innerHTML = "<h2>Navigate left and right to land the Apollo Lunar Module Eagle on the moon.</h2>";
			}
			
		} else if(settings.decouple) {
			settings.rocketSaturnX -= 1 * delta;
			settings.rocketSaturnY += 1 * delta;
			switch(settings.currentStage) {
				case 1:
					settings.stage1x -= 1 * delta;
			        settings.stage1y += 1 * delta;

					settings.stage2x += 5 * delta;
					settings.stage2y -= 5 * delta;

					settings.stage3x += 5 * delta;
					settings.stage3y -= 5 * delta;

					settings.stage4x += 5 * delta;
					settings.stage4y -= 5 * delta;
					break;
				case 2:
					settings.stage1x -= 1 * delta;
			        settings.stage1y += 1 * delta;
					
					settings.stage2x -= 1 * delta;
			        settings.stage2y += 1 * delta;

					settings.stage3x += 5 * delta;
					settings.stage3y -= 5 * delta;

					settings.stage4x += 5 * delta;
					settings.stage4y -= 5 * delta;
					break;
				case 3:
					settings.stage1x -= 1 * delta;
			        settings.stage1y += 1 * delta;

					settings.stage2x -= 1 * delta;
			        settings.stage2y += 1 * delta;

					settings.stage3x -= 1 * delta;
			        settings.stage3y += 1 * delta;
					
					settings.stage4x += 5 * delta;
					settings.stage4y -= 5 * delta;
					break;
				case 1:
					settings.stage1x -= 1 * delta;
			        settings.stage1y += 1 * delta;
					break;
				default:
					break;
			}
		} else {
			settings.stage1x += 5 * delta;
			settings.stage1y -= 5 * delta;
			settings.stage2x += 5 * delta;
			settings.stage2y -= 5 * delta;
			settings.stage3x += 5 * delta;
			settings.stage3y -= 5 * delta;
			settings.stage4x += 5 * delta;
			settings.stage4y -= 5 * delta;
		}
	}
	//lunarmodule landing
	if(settings.gamestatus == "landing" && settings.lunarModuleY < 504) {		
		settings.lunarModuleY += 5 * delta;
		switch(settings.lunarModuleMovementDirection) {
			case "left":
				settings.lunarModuleX -= 5 * delta;
				break;
			case "right":
				settings.lunarModuleX += 5 * delta;
				break;
		}
	}
	
	if(settings.lunarModuleY > 504) {
		settings.finish = true;
	}

	if(settings.gamestatus == "launch" && settings.rocketY < -250) {
		audioPlayer.src = "";
		audioPlayer.pause();		
		audioPlayer.currentTime = 0;		
	  
		settings.gamestatus = "launched";
		backgroundImage.src = "images/space.jpg";
		//remove controlpanel
		var list = document.getElementById("controlpanel");
		while(list.hasChildNodes()) {
			list.removeChild(list.firstChild);
		}
		//show userinfo
		document.getElementById("controlpanel").innerHTML = "<h2>Press space button to initiate new stages.</h2>";
	}
	
	//background
	if(settings.gamestatus == "launch") {
		backgroundTotalSeconds += delta;	
		backgroundXpos = backgroundTotalSeconds * backgroundVx % 3500;
	}
};

var render = function () {
	ctx.clearRect(0, 0, 800, 600);
	
	//background	
	ctx.drawImage(backgroundImage, 0, 0);
	if (settings.backgroundImageReady && settings.gamestatus == "launch") {
		ctx.save();
		ctx.translate(-backgroundXpos, 0);
		for (var i = 0; i < backgroundNumImages; i++) {
			ctx.drawImage(backgroundImage, i * 3500, 0);
		}
		ctx.restore();
	}
	
	if(settings.gamestatus == "launched") {
		ctx.drawImage(stage1Image, settings.stage1x, settings.stage1y);
		ctx.drawImage(stage2Image, settings.stage2x, settings.stage2y);
		ctx.drawImage(stage3Image, settings.stage3x, settings.stage3y);
		ctx.drawImage(stage4Image, settings.stage4x, settings.stage4y);
		ctx.drawImage(moonImage, 550, 50);
	}	
		
	if(settings.launchpadImageReady  && settings.gamestatus == "launch") {
		ctx.drawImage(launchpadImage, 90, 307);
	}

	if(settings.rocketImageReady && settings.gamestatus == "launch") {	
		ctx.drawImage(rocketImage, settings.rocketX, settings.rocketY);
		
		if(settings.exhaustImageReady && settings.ignition) {	
			ctx.drawImage(exhaustImage, settings.rocketX, settings.rocketY + 180);
		}
	}

	if(settings.lunarmoduleImageReady && settings.gamestatus == "landing") {
		ctx.drawImage(lunarmoduleImage, settings.lunarModuleX, settings.lunarModuleY);
	}

	if(settings.finish) {		
		ctx.font = "60px Arial";
		ctx.fillStyle = "green";
		ctx.fillText("You did it!", (canvas.width / 2) - 100, (canvas.height / 2) - 100);
	}

	if(settings.gameover && settings.decouple == false) {
		ctx.font = "20px Arial";
		ctx.fillStyle = "red";
		ctx.fillText("Game over! You didn't decouple on time!", (canvas.width / 2) - 250, (canvas.height / 2) - 100);
	}
};

var liftOff = function() {
	settings.ignition = true;
	document.getElementById("console").value = document.getElementById("console").value + "We have a liftoff...\n";
}

var launch = function() {	
	sounds["countdown"].play();
	document.getElementById("launch").classList.add("button-round-click");
	document.getElementById("console").value = "Launch sequence initiated. Lift off countdown...\n";
	setTimeout(liftOff, 10000);
}

addEventListener("keyup", function (e) {
}, false);

// The main game loop
var main = function (timestamp) {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now - (delta % interval);
	
	if(!settings.finish && !settings.gameover) {
		recAF = requestAnimationFrame(main);	
	} else {
		cancelAnimationFrame(recAF)
	}
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
cancelAnimationFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame;

var then = Date.now();
main();
var socket = io();

var num = document.querySelector("meta[name=num]").content;
var R = 0, G = 0, B = 0;
var c;
var x = 0, y = 0;
// var xspeed = 1; yspeed = 1;

socket.emit('join', num);

socket.on('color', function(r, g, b){
	R = r;
	G = g;
	B = b;
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	// x = Math.random() * windowWidth;
	// y = Math.random() * windowHeight;
}

function draw() {
	background(0);
	c = color(R, G, B);
	fill(c);
	noStroke();
	ellipse(x, y, 80, 80);
	// x+=xspeed;
	// y+=yspeed;
	// if (x > windowWidth || x < 0) {
	// 	xspeed *= -1;
	// }
	// if (y > windowHeight || y < 0) {
	// 	yspeed *= -1;
	// }
	// socket.emit('move', num, x, y);
}

function mousePressed() {
	x = mouseX;
	y = mouseY;
	socket.emit('move', num, x, y);
}
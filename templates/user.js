var socket = io();

var num = document.querySelector('meta[name=num]').content;
socket.emit('join', num);

var R = 0, G = 0, B = 0;
var c;
var x, y, xdest, ydest;
var xspeed = 0; yspeed = 0;

socket.on('color', function(r, g, b){
	R = r;
	G = g;
	B = b;
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	x = Math.random() * windowWidth;
	y = Math.random() * windowHeight;
	xdest = x;
	ydest = y;
	noStroke();
}

function draw() {
	background(0);
	c = color(R, G, B);
	fill(c);
	xspeed = (xdest - x)/50;
	yspeed = (ydest - y)/50;
	x += xspeed;
	y += yspeed;
	ellipse(x, y, 80, 80);
	socket.emit('move', num, x, y);
}

function mousePressed() {
	xdest = mouseX;
	ydest = mouseY;
}
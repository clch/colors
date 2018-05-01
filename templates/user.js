var socket = io();

var num = document.querySelector('meta[name=num]').content;

var R = 0, G = 0, B = 0;
var c;
var x, y, destX, destY, size;
var speedX = 0; speedY = 0;

socket.on('color', function(r, g, b){
	R = r;
	G = g;
	B = b;
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	x = random(windowWidth);
	y = random(windowHeight);
	destX = x;
	destY = y;
	size = random(50, 100);
	socket.emit('join', num, size);

	noStroke();
}

function draw() {
	background(0);
	c = color(R, G, B);
	fill(c);
	speedX = (destX - x)/50;
	speedY = (destY - y)/50;
	x += speedX;
	y += speedY;
	ellipse(x, y, size, size);
	socket.emit('move', num, x, y);
}

function mousePressed() {
	destX = mouseX;
	destY = mouseY;
}
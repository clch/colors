var socket = io();

var num = document.querySelector("meta[name=num]").content;
var R = 0, G = 0, B = 0;
var c;

socket.emit('move', num, 0, 0);
socket.emit('join', num);

socket.on('color', function(r, g, b){
	R = r;
	G = g;
	B = b;
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	console.log(c);
}

function draw() {
	background(0);
	c = color(R, G, B);
	fill(c);
	noStroke();
	ellipse(mouseX, mouseY, 80, 80);
	socket.emit('move', num, mouseX, mouseY);
}
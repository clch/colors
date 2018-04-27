var socket = io();

var num = document.querySelector("meta[name=num]").content;
var R = document.querySelector("meta[name=R]").content;
var G = document.querySelector("meta[name=G]").content;
var B = document.querySelector("meta[name=B]").content;
var c;

socket.emit('move', num, 0, 0);

function setup() {
	createCanvas(windowWidth,windowHeight);
	c = color(R, G, B);
	console.log(c);
	console.log(R);
	console.log(G);
	console.log(B);
}

function draw() {
	background(0);
	fill(c);
	noStroke();
	ellipse(mouseX, mouseY, 80, 80);
	socket.emit('move', num, mouseX, mouseY);
}
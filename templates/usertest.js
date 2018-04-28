var socket = io();

var num = 20;
var R = [], G = [], B = [];
var c = [];
var x = [], y = [];
var xspeed = []; yspeed = [];

socket.on('color', function(i, r, g, b){
	R[i] = r;
	G[i] = g;
	B[i] = b;
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	for (var i = 0; i < num; i++) {
		socket.emit('join', i);
		x[i] = Math.random() * windowWidth;
		y[i] = Math.random() * windowHeight;
		xspeed[i] = Math.random() + 1;
		yspeed[i] = Math.random() + 1;
	}
	noStroke();
}

function draw() {
	background(0);
	for (var i = 0; i < num; i++) {
		if (R[i] != null && G[i] != null & B[i] != null) {
			c[i] = color(R[i], G[i], B[i]);
			fill(c[i]);
			ellipse(x[i], y[i], 80, 80);
			x[i] += xspeed[i];
			y[i] += yspeed[i];
			if (x[i] > windowWidth || x[i] < 0) {
				xspeed[i] *= -1;
			}
			if (y[i] > windowHeight || y[i] < 0) {
				yspeed[i] *= -1;
			}
			socket.emit('move', i, x[i], y[i]);
		}
	}
}

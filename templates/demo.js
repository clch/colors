var socket = io();
socket.emit('demo');

var locMap = new Map();
var initColorMap = new Map();
var colorMap = new Map();
var sizeMap = new Map();
var particles = [];
var speedX = [], speedY = [];
var size;

const partNum = 60;
const partSpeed = 0.7;

function setup() {
	createCanvas(windowWidth,windowHeight);
	for (var i = 0; i < partNum; i++) {
		particles[i] = {x: random(windowWidth), y: random(windowHeight)};
		speedX[i] = random(-partSpeed, partSpeed);
		speedY[i] = random(-partSpeed, partSpeed);
	}
}

function draw() {
	background(0);
	fill(220);
	stroke(220);
	for (var i = 0; i < partNum; i++) {
		particles[i].x += speedX[i];
		particles[i].y += speedY[i];
		if (particles[i].x > windowWidth || particles[i].x < 0) {
			speedX[i] *= -1;
		}
		if (particles[i].y > windowHeight || particles[i].y < 0) {
			speedY[i] *= -1;
		}
		ellipse(particles[i].x, particles[i].y, 7, 7);
		for (var j = 0; j < partNum; j++) {
			var d = kdist(particles[i], particles[j], 50);
			if (d < 150) {
				strokeWeight((160-d)/110);
				line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
			}
		}
	}
	for (var i of initColorMap.keys()) {
		var vi = locMap.get(i);
		var ci = initColorMap.get(i).slice();
		for (var j of initColorMap.keys()) {
			// calculate color
			var vj = locMap.get(j);
			var cj = initColorMap.get(j);
			var d = kdist(vi, vj, 100);
			var cDiff = colorDiff(ci, cj, d/40);
			var cLine = colorMap.get(j).slice();
			for (var k = 0; k < 3; k++) {
				ci[k] -= cDiff[k];
				cLine[k] += cDiff[k]/2;
			}
			// draw lines
			if (i > j) {
				if (d < 300) {
					strokeWeight((300-d)/50);
					stroke(cLine[0], cLine[1], cLine[2]);
					line(vi.x, vi.y, vj.x, vj.y);
				}
			}
		}
		colorMap.set(i, ci);
		fill(ci[0], ci[1], ci[2]);
		socket.emit('color', i, ci[0], ci[1], ci[2]);
		noStroke();
		size = sizeMap.get(i);
		ellipse(vi.x, vi.y, size, size);
	}
}

socket.on('join', function(num, size){
	var pos = {x: 0, y: 0};
	locMap.set(num, pos);
	var c = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		c[i] = random(255);
	}
	initColorMap.set(num, c);
	colorMap.set(num, c);
	sizeMap.set(num, size);
});

socket.on('move', function(num, x, y){
	locMap.set(num, {x, y});
});

socket.on('disconnect', function(num){
	initColorMap.delete(num);
	locMap.delete(num);
	colorMap.delete(num);
});

function colorDiff(c1, c2, d) {
	return [(c1[0] - c2[0])/d, (c1[1] - c2[1])/d, (c1[2] - c2[2])/d];
}

function kdist(v1, v2, min) {
	var res = Math.sqrt(Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2));
	if (res < min) {
		res = min;
	}
	return res;
}
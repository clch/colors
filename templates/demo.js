var socket = io();
socket.emit('demo');

var locMap = new Map();
var initColorMap = new Map();
var colorMap = new Map();

socket.on('join', function(num){
	var pos = {x: 0, y: 0};
	locMap.set(num, pos);
	var c = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		c[i] = Math.floor(Math.random() * 230 + 25);
	}
	initColorMap.set(num, c);
	colorMap.set(num, c);
});

socket.on('move', function(num, x, y){
	locMap.set(num, {x, y});
});

socket.on('disconnect', function(num){
	initColorMap.delete(num);
	locMap.delete(num);
	colorMap.delete(num);
});

function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(0);
	console.log(initColorMap);
	for (var i of initColorMap.keys()) {
		var vi = locMap.get(i);
		var ci = initColorMap.get(i).slice();
		for (var j of initColorMap.keys()) {
			// calculate color
			var vj = locMap.get(j);
			var cj = initColorMap.get(j);
			var d = kdist(vi, vj);
			var cDiff = colorDiff(ci, cj, d/30);
			var cLine = colorMap.get(j).slice();
			for (var k = 0; k < 3; k++) {
				ci[k] -= cDiff[k];
				cLine[k] += cDiff[k]/2;
			}
			// draw lines
			stroke(155);
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
		ellipse(vi.x, vi.y, 80, 80);
	}
}

function colorDiff(c1, c2, d) {
	return [(c1[0] - c2[0])/d, (c1[1] - c2[1])/d, (c1[2] - c2[2])/d];
}

function kdist(v1, v2) {
	var res = Math.sqrt(Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2));
	if (res < 100) {
		res = 100;
	}
	return res;
}
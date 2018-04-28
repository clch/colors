var socket = io();
socket.emit('demo');

var locMap = new Map();
var colorMap = new Map();

socket.on('move', function(num, x, y){
	locMap.set(num, {x, y});
});

socket.on('disconnect', function(num){
	locMap.delete(num);
});

socket.on('color', function(num, r, g, b){
	colorMap.set(num, [r, g, b]);
});

function setup() {
	createCanvas(windowWidth,windowHeight);
	
}

function draw() {
	background(0);
	for (var k of colorMap.keys()) {
		if (locMap.get(k) != null) {
			noStroke();
			var v = locMap.get(k);
			var c = colorMap.get(k);
			fill(c[0], c[1], c[2]);
			ellipse(v.x, v.y, 80, 80);
			for (var j of colorMap.keys()) {
				stroke(155);
				if (k > j && locMap.get(j) != null) {
					var v2 = locMap.get(j);
					var d = kdist(v, v2);
					console.log(d);
					if (d < 300) {
						strokeWeight(d/50);
						line(v.x, v.y, v2.x, v2.y);
					}
				}
			}
		}
	}
}

function kdist(v1, v2) {
	var res = Math.sqrt(Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2));
	if (res < 100) {
		res = 100;
	}
	return res;
}
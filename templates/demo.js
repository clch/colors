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
	noStroke();
	for (var k of colorMap.keys()) {
		if (locMap.get(k) != null) {
			var v = locMap.get(k);
			var c = colorMap.get(k);
			fill(c[0], c[1], c[2]);
			ellipse(v.x, v.y, 80, 80);
		}		
	}
}
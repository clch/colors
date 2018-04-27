var socket = io();
socket.emit('demo');

var locMap = new Map();

socket.on('move', function(num, x, y){
	locMap.set(num, {x, y});
});


function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(0);
	noStroke();
	fill(255);
	for (var v of locMap.values()) {
		ellipse(v.x, v.y, 80, 80);
	}
}
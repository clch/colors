// var num = document.querySelector('meta[name=' + num + ']').content;
// socket.emit('move', num, 0, 0);

// var socket = io();
// socket.on('join', function(){

// });


// function mousePressed() {
// 	socket.emit('move', num, mouseX, mouseY);
// }

function setup() {
	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(100, 100, 200);
	fill(255);
	noStroke();
	ellipse(mouseX, mouseY, 80, 80);
}

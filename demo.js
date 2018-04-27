function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(200, 100, 100);
   if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);
}


socket.on('join', function(){

});
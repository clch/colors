function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(100, 100, 200);
   if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);
}
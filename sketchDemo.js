let hue = 180;
let saturation = 50;
let brightness = 50;
let largeness = 52.5;

function setup() {
  let circle = createCanvas(100, 100);
  circle.id('circle');
  circle.parent("#exampleCircle");
  noStroke();
  colorMode(HSB);
}

function draw() {
  background(255);
  fill(hue,saturation,brightness);
  ellipse(50,50,largeness,largeness);
}

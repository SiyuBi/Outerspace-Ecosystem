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

function createSystem(){

}

function createStar(){

}

function createPlanet(){

}

function createMoon(){

}

function createAsteroid(){

}

// preload artwork
function preload() {

}

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.id('p5canvas');
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {

}

class SolarSystem{
  constructor(x,y,z,star){
    //maybe allow multiple starts in 1 system
    this.stars = [];
    //positions of this system in galaxy
    this.x = x;
    this.y = y;
    this.z = z;
    //this.massCenter = ??;
    //list of planets
    this.planets = [];
    //list of asteroids
    this.asteroids = [];
  }
}

class Planet{
  constructor(x,y,appearance,mass,SolarSystem){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    //positions of this planet in solar system
    this.x = x;
    this.y = y;
    //this.distToStars = dist(SolarSystem.massCenter.x,SolarSystem.massCenter.y,this.x,this.y);
    //list of moons
    this.moons = [];
    //mass for calculating gravity
    this.mass = mass;
    SolarSystem.planets.push(this);
  }

  setAppearance(){

  }
}

class Moon{
  constructor(x,y,appearance,mass,Planet){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    this.x = x;
    this.y = y;
    this.distToPlanet = dist(Planet.x,Planet.y,this.x,this.y);
    //mass for calculating gravity
    this.mass = mass;
    Planet.moons.push(this);
  }

  setAppearance(){

  }
}

class Star{
  constructor(x,y,appearance,mass,SolarSystem){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    //positions of this star in solar system (maybe fix at center?)
    this.x = x;
    this.y = y;
    //mass for calculating gravity
    this.mass = mass;
    SolarSystem.stars.push(this);
  }

  setAppearance(){

  }
}

class Asteroid{
  constructor(x,y,appearance,mass,SolarSystem){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    //positions of this asteroid in solar system
    this.x = x;
    this.y = y;
    //not sure yet how to calculate gravity attraction
    //mass for calculating gravity
    this.mass = mass;
    SolarSystem.asteroids.push(this);
  }

  setAppearance(){

  }
}

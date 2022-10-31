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

  display(){

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

    //Acceleration of Planet
    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){

  }

  move(){

    const distanceFromSun = dist(this.x, this,y, width/2, height/2) // Calculates distance from planet to sun(middle of canvas)

    // The closer the planet is to the sun the faster it orbits
    this.accelerationX += (width/2 - this.x )/distanceFromSun 
    this.accelerationX += (height/2 - this.x )/distanceFromSun 

    this.x += this.accelerationX
    this.y += this.accelerationY



  }
}

class Moon{
  constructor(x,y,appearance,mass,Planet){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    this.planet = Planet;
    this.x = x;
    this.y = y;
    this.distToPlanet = dist(Planet.x,Planet.y,this.x,this.y);
    //mass for calculating gravity
    this.mass = mass;
    Planet.moons.push(this);


    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){

  }

  move(){

    this.accelerationX += (this.planet.x- this.x )/this.distToPlanet 
    this.accelerationX += (this.planet.y - this.x )/this.distToPlanet 

    this.x += this.accelerationX
    this.y += this.accelerationY


    
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


    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){

  }

  move(){

    //the closer the asteroid is to a planet, the faster it orbits
    this.accelerationX += (this.planet.x- this.x )/this.distToPlanet 
    this.accelerationX += (this.planet.y - this.x )/this.distToPlanet 

    this.x += this.accelerationX
    this.y += this.accelerationY

  }
}


let bg;
let p1=0;
let p2=1000;
let star1;
let star2;
let star3;
let stars=[];
let str;
let solar_s=false;
let click=false;
let d;
let solar;
let moon;
let planet;
let r;
let solar_system;
let currentSystem;
let planetPos;
let theta;
let theta2;
let moonPos;
let r2;

function preload() {
  bg=loadImage("images/bg4.jpeg");
  star1=loadImage("images/str1.png");
  star2=loadImage("images/str2.png");
  star3=loadImage("images/str3.png");
 // solar=loadImage("images/bg3.jpeg");
}

function setup() {
  let cnv = createCanvas(1000, 1000);
  cnv.id('p5canvas');
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  env=new Enviroment();

    currentSystem = new SolarSystem();
    str=new Star(250,500,500,currentSystem);

    planet=new Planet(100,800,800,0.01,currentSystem);
    moon = new Moon(20,850,850,0.05,planet);
}

function draw() {

   env.display();

   currentSystem.display();
   drawIndication();
}


class Enviroment{//where solar systems live
  constructor(){
    this.stars=[];
  }
  display(){
    image(bg,p1,500);
    image(bg,p2,500);
    p1-= 0.1;
    p2-= 0.1;
    if (p1<-500){
      p1 = 500;
    }
    if (p2<-500){
      p2 = 500;
    }
  }
}

class SolarSystem{
  constructor(){
    //maybe allow multiple starts in 1 system
    this.stars = [];
    //positions of this system in galaxy
    //this.x = x;
    //this.y = y;
    //this.z = z;
    //this.massCenter = ??;
    //list of planets
    this.planets = [];
    //list of asteroids
    this.asteroids = [];
  }

  display(){
    //instantiating star and planet objects
    for (let i = 0; i < this.stars.length; i++){
      ellipse(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
    }
    push();
    translate(500,500);
    for (let i = 0; i < this.planets.length; i++){
      this.planets[i].move();
      if (this.planets[i].mouseDistance < this.planets[i].size/2){
        fill(0,255,0);
      }
      else {
        fill(128);
      }
      ellipse(this.planets[i].x, this.planets[i].y, this.planets[i].size, this.planets[i].size);
      push();
      translate(this.planets[i].x, this.planets[i].y);
      for (let j = 0; j < this.planets[i].moons.length; j++){
        this.planets[i].moons[j].move();
        ellipse(this.planets[i].moons[j].x, this.planets[i].moons[j].y, this.planets[i].moons[j].size, this.planets[i].moons[j].size);
      }
      pop();
    }
    pop();
    for (let i = 0; i < this.asteroids.length; i++){
      ellipse(this.asteroids[i].x, this.asteroids[i].y, this.asteroids[i].size, this.asteroids[i].size);
    }
  }
}

class Star{
  //x,y,appearance,mass,SolarSystem
  constructor(size, x, y, SolarSystem){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    this.picture=`star${int(random(0,3))}`;
    //positions of this star in solar system (maybe fix at center?)
    //this.x = random(-500);
    //this.y = random(50,500);
    this.x = x;
    this.y = y;
    //mass for calculating gravity
    this.size = size;
    SolarSystem.stars.push(this);
  }

}

class Planet{
  constructor(size,x, y,vel,SolarSystem){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    //positions of this planet in solar system
    this.x = x;
    this.y = y;
    //this.distToStars = dist(SolarSystem.massCenter.x,SolarSystem.massCenter.y,this.x,this.y);
    //list of moons
    this.moons = [];
    //this.vel=vel;
    //mass for calculating gravity
    //this.mass = mass;
    this.theta=0;
    this.vel = vel;
    this.size=size;
    this.color=random(255);
    this.accleration = 1;
    this.system = SolarSystem;
    this.dist = dist(this.x,this.y,SolarSystem.stars[0].x,SolarSystem.stars[0].y)-this.size/*-SolarSystem.stars[0].size*/;
    this.mouseDistance = 500;
    console.log(SolarSystem);
    SolarSystem.planets.push(this);
  }

  move(){
    this.mouseDistance = dist(mouseX,mouseY,this.x,this.y);

    this.theta += this.vel;
    this.x = this.dist*cos(this.theta)*1.5
    this.y = this.dist*sin(this.theta)

  }

  destroy(){

  }
}

class Moon{
  constructor(size, x, y, vel, Planet){
    //let player choose or customize appearance
  //  this.appearance = this.setAppearance();
    //this.planet = Planet;
   // this.x = x;
   // this.y = y;
    //this.distToPlanet = dist(Planet.x,Planet.y,this.x,this.y);
    //mass for calculating gravity
    this.size = size;
    this.vel = vel;
    this.x = x;
    this.y = y;
    this.theta = 0;
  //  this.vel=vel;
    this.dist = dist(this.x,this.y,Planet.x,Planet.y)-this.size/*-SolarSystem.stars[0].size*/;
    Planet.moons.push(this);
    console.log(this.x,this.y,Planet.x,Planet.y);
  }

  move(){
    this.theta += this.vel;
    /*
    this.x = this.system.stars[0].size*cos(this.theta)*1.5
    this.y = this.system.stars[0].size*sin(this.theta)
    */
    this.x = this.dist*cos(this.theta)*1.5
    this.y = this.dist*sin(this.theta)* 1.5
  }
}

class Asteroid{
  constructor(size,x, y,vel,SolarSystem){
    //let player choose or customize appearance
    //this.appearance = this.setAppearance();
    //positions of this asteroid in solar system

    //not sure yet how to calculate gravity attraction
    //mass for calculating gravity
    this.size = size;
    this.vel = vel;
    this.x = x;
    this.y = y;
    SolarSystem.asteroids.push(this);
    console.log(SolarSystem);
  }

  setAppearance(){

  fill(128);
  ellipse(this.x,this.y,this.mass);
  }

  move(){
  }
}


//Cindy's part

let newElement = null;  //if there's an active newCreation, draw the new body at mouseX mouseY in draw() to indicate location until comfirmed

function initiate(element){
  newElement = element;
  //stopPropagation();
}

function cancelInit(){
  newElement = null;
}

function drawIndication(){
  //call this in draw()

  if (newElement){
    //image sth at mouseX mouseY
    colorMode(HSB);
    fill(hue,saturation,brightness);
    ellipse(mouseX,mouseY,largeness,largeness);
    colorMode(RGB);
  }
}

function mousePressed() {
  console.log(newElement);
  if (newElement != null){
    switch(newElement) {
      // case 'star':
      //   //can't create new stars for now
      //   break;
      case 'planet':
        //create new planet
        console.log(new Planet(largeness, mouseX,mouseY,int(random(1,9))*0.005, currentSystem));
        newElement = null;
        break;
      case 'moon':
        if (currentSystem.planets.length >= 1){
          //create new moon
          let closestPlanet = currentSystem.planets[0];
          for (let i = 0; i < currentSystem.planets.length; i++){
            if (dist(mouseX, mouseY, currentSystem.planets[i].x, currentSystem.planets[i].y) <
                dist(mouseX, mouseY, closestPlanet.x, closestPlanet.y)){
                  closestPlanet = currentSystem.planets[i];
                }
          }
          new Moon(largeness,mouseX,mouseY,int(random(1,9))*0.005, closestPlanet);
          newElement = null;
        }
        else{
          //fail if no planets exist
          //make it explode
        }
        break;
      case 'asteroid':
        //create new asteroid
        new Asteroid(largeness, mouseX,mouseY,60, currentSystem);
        newElement = null;
        break;
      case 'star':
        console.log("in")
        for (let i = 0; i < currentSystem.planets.length; i++){
          if (dist(mouseX, mouseY,currentSystem.planets[i].x,currentSystem.planets[i].y) > 50){
                currentSystem.planets.splice(i,1)
                console.log("in2")
              }
        }
        
        break;
      default:
        break;
    }
    //newElement = null;
  }
}
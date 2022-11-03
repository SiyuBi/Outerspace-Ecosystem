// preload artwork

let bg;
let p1=0;
let p2=1000;
let str;
let currentSystem;

function preload() {
  bg=loadImage("images/bg4.jpeg");
  star1=loadImage("images/str1.png");
  star2=loadImage("images/str2.png");
  star3=loadImage("images/str3.png")
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  
  colorMode(HSB);
  env=new Enviroment();

  currentSystem = new SolarSystem();
  str=new Star(250,width/2,height/2,currentSystem);

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
    //list of planets
    this.planets = [];
    //list of asteroids
    this.asteroids = [];
  }

  display(){
    //instantiating star and planet objects
    for (let i = 0; i < this.stars.length; i++){

      fill(60,90,90);
      ellipse(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
    }


    for (let i = 0; i < this.planets.length; i++){
      this.planets[i].moveAndDisplay();
      //ellipse(this.planets[i].x, this.planets[i].y, this.planets[i].size, this.planets[i].size);
    }

    for (let i = 0; i < this.asteroids.length; i++){

      this.asteroids[i].moveAndDisplay();

    }
  }


}

class Star{

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
  constructor(d,size,SolarSystem) {
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.d = d;
    this.angle = 0;
    this.x = 0;
    this.y = 0;
    this.size = largeness;
    this.moons = [];
    this.speed = random(0.5, 2);
    this.system = SolarSystem;
    SolarSystem.planets.push(this);
  }

  createMoon() {
    let moonDistance = dist(this.x, this.y, mouseX, mouseY) + 20 + random(20);
    this.moons.push( new Moon(this, moonDistance) );
  }

  moveAndDisplay() {
    this.x = sin(radians(this.angle)) * this.d + this.system.stars[0].x;
    this.y = cos(radians(this.angle)) * this.d + this.system.stars[0].y;

    fill(this.H,this.S,this.B);
    if (this.isMouseOver()) {
      fill(255);
    }

    ellipse(this.x, this.y, this.size, this.size);

    // draw our moons
    for (let i = 0; i < this.moons.length; i++) {
      this.moons[i].moveAndDisplay();
    }

    this.angle += this.speed;
  }

  isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<50){
      return true
    }

    return false;

  }

  createMoon(){
    let moonDist = dist(this.x,this.y,mouseX,mouseY) + 20 + random(20);

    this.moons.push( new Moon(moonDist,largeness,this));

  }


}

class Moon{
  constructor(d,size,planet) {
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
      this.planet = planet;
      this.size = size;
      this.d = d;
      this.angle = 0;
      this.speed = random(0.5, 3);
    }

    moveAndDisplay() {
    this.x = sin(radians(this.angle)) * this.d + this.planet.x;
    this.y = cos(radians(this.angle)) * this.d + this.planet.y;

    fill(this.H,this.S,this.B);
    ellipse(this.x, this.y, this.size, this.size);

    this.angle += this.speed;
  }

   isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<20){
      return true;

    }

    return false;

  }

  
}

class Asteroid{
  constructor(size,x,y,d,SolarSystem){
    //let player choose or customize appearance
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.size = size;
    this.vel = random(1,3);
    this.x = x;
    this.y = y;
    this.d=d;
    this.theta=0;
    this.system=SolarSystem;

    SolarSystem.asteroids.push(this);
    console.log(SolarSystem);
  }

 
  moveAndDisplay(){


    this.x = cos( radians(this.theta) )*1.5 * this.d + (width/2);
    this.y = sin( radians(this.theta) ) * this.d + (height/2);

    fill(this.H,this.S,this.B);
    ellipse(this.x,this.y,this.size,this.size);

    this.theta += this.vel;
  }

   isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<50){
      return true
    }

    return false;

  }
}


let newElement = null;  //if there's an active newCreation, draw the new body at mouseX mouseY in draw() to indicate location until comfirmed

function initiate(element){
  newElement = element;
  //stopPropagation();
}

function drawIndication(){
  //call this in draw()

  if (newElement && newElement!='destroy'){
    //image sth at mouseX mouseY
    fill(hue,saturation,brightness);
    ellipse(mouseX,mouseY,largeness,largeness);
  }
}

function mousePressed() {

  if (newElement != null){
    switch(newElement) {
      case 'star':
        //can't create new stars for now
        break;
      case 'planet':
        //create new planet
         

        let d = dist(mouseX,mouseY,currentSystem.stars[0].x,currentSystem.stars[0].y);
        new Planet(d,largeness,currentSystem);
        newElement = null;
        break;
      case 'moon':
        if (currentSystem.planets.length >= 1){
          //create new moon

        for(let i=0;i<currentSystem.planets.length;i++){
        if(currentSystem.planets[i].isMouseOver()){
          currentSystem.planets[i].createMoon();
          break;
        }
        }

          newElement = null;
        }
        else{
          //fail if no planets exist
          //make it explode
        }
        break;
      case 'asteroid':
        //create new asteroid
         let di = dist(mouseX,mouseY,500,500);
        console.log(new Asteroid(largeness, mouseX,mouseY,di, currentSystem));
        newElement = null;
        break;
      case 'destroy':
      console.log(newElement);
        //destory object if clicked on
        for (let i = 0; i < currentSystem.planets.length; i++){
          if (currentSystem.planets[i].isMouseOver()){
                currentSystem.planets.splice(i,1);
                
              }
        }

        for(let i=0;i<currentSystem.asteroids.length;i++){
          if(currentSystem.asteroids[i].isMouseOver()){
             currentSystem.asteroids.splice(i,1);

          }
        }
        break;
      default:
        break;
    }

  }
}


function keyPressed() {
  saveSolarSystem();
}

function saveSolarSystem() {
  let saved = [];
  for (let i = 0; i < currentSystem.planets.length; i++) {
    let tempPlanet = {};
    tempPlanet.x = currentSystem.planets[i].x;
    tempPlanet.y = currentSystem.planets[i].x;
    tempPlanet.angle = currentSystem.planets[i].theta;
    tempPlanet.d = currentSystem.planets[i].d;
    tempPlanet.speed = currentSystem.planets[i].vel;
    tempPlanet.moons = [];
    
    for (let j = 0; j < planets[i].moons.length; j++) {
      let tempMoon = {};
      tempMoon.x = currentSystem.planets[i].moons[j].x;
      tempMoon.y = currentSystem.planets[i].moons[j].y;
      tempMoon.angle = currentSystem.planets[i].moons[j].theta;
      tempMoon.speed = currentSystem.planets[i].moons[j].vel;
      tempMoon.d = currentSystem.planets[i].moons[j].d;
      tempPlanet.moons.push(tempMoon);
    }
    
    saved.push(tempPlanet);
  }
  
  let j = JSON.stringify(saved);
  console.log(j);
}

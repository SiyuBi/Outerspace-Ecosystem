// preload artwork

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
let created;

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
    if (p2>-500){
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
      fill(249,215,28);
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

  display(){

  }

}

class Planet{
  constructor(size,x,y,d,SolarSystem){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    //positions of this planet in solar system
    this.x = x;
    this.y = y;
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    //this.distToStars = dist(SolarSystem.massCenter.x,SolarSystem.massCenter.y,this.x,this.y);
    //list of moons
    this.moons = [];
    //this.vel=vel;
    //mass for calculating gravity
    //this.mass = mass;
    this.d=d;
    this.theta=0;
    this.vel = random(1,2);
    this.size=size;
    this.color=random(255);
    //this.accleration = 1;
    this.system = SolarSystem;
    //this.dist = dist(this.x,this.y,SolarSystem.stars[0].x,SolarSystem.stars[0].y)-this.size/*-SolarSystem.stars[0].size*/;
    //this.mouseDistance = 500;
    console.log(SolarSystem);
    SolarSystem.planets.push(this);
  }

  moveAndDisplay(){
    this.mouseDistance = dist(mouseX,mouseY,this.x,this.y);

    
    this.x = cos( radians(this.theta) )* this.d + (width/2)
    this.y = sin( radians(this.theta) )* this.d + (height/2)

    if(this.isMouseOver()){
      fill(255,0,0);
    }
   
    fill(this.H,this.S,this.B);
    ellipse(this.x,this.y,this.size,this.size);

    for(let i=0;i<this.moons.length;i++){
      this.moons[i].moveAndDisplay();
    }

    this.theta += this.vel;
 
  }

  isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<50){
      return true
    }

    return false;

  }

  createMoon(){
    let moonDist = dist(this.x,this.y,mouseX,mouseY) + 20 + random(20);
    this.moons.push( new Moon(largeness,moonDist,this));
  }


}

class Moon{
  constructor(size,d,Planet){
    //let player choose or customize appearance
  //  this.appearance = this.setAppearance();
    this.planet = Planet;
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
   // this.x = x;
   // this.y = y;
    //this.distToPlanet = dist(Planet.x,Planet.y,this.x,this.y);
    //mass for calculating gravity
    this.size = size;
    this.vel = int(random(4,5));
    //this.x = x;
    //this.y = y;
    this.d=d;
    this.theta = 0;
  //  this.vel=vel;
    //this.dist = dist(this.x,this.y,Planet.x,Planet.y)/*-SolarSystem.stars[0].size*/;
   // planet.moons.push(this);
    console.log(this.x,this.y,this.planet.x,this.planet.y);
  }

  moveAndDisplay(){
   
   
    this.x = cos( radians(this.theta) ) * this.d + this.planet.x;
    this.y = sin( radians(this.theta) ) * this.d + this.planet.y;

    //fill(220);
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

class Asteroid{
  constructor(size,x,y,d,SolarSystem){
    //let player choose or customize appearance
    //this.appearance = this.setAppearance();
    //positions of this asteroid in solar system
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    //not sure yet how to calculate gravity attraction
    //mass for calculating gravity
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
    ellipse(this.x,this.y,this.size,this.size+10);

    this.theta += this.vel;
  }

   isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<50){
      return true
    }

    return false;

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

  if (newElement && newElement!='destroy'){
    //image sth at mouseX mouseY
    fill(hue,saturation,brightness);
    ellipse(mouseX,mouseY,largeness,largeness);
  }
}

function mousePressed() {


  console.log(newElement);
  if (newElement != null){
    switch(newElement) {
      case 'star':
        //can't create new stars for now
        break;
      case 'planet':
        //create new planet
        created=false;
        let d = dist(mouseX,mouseY,currentSystem.stars[0].x,currentSystem.stars[0].y);
        console.log(new Planet(largeness, mouseX,mouseY, d,currentSystem));
                     
        newElement = null;
        break;
      case 'moon':
        if (currentSystem.planets.length >= 1){
          //create new moon
          let closestPlanet = currentSystem.planets[0];
          for (let i = 0; i < currentSystem.planets.length; i++){

                if(currentSystem.planets[i].isMouseOver()){
                  currentSystem.planets[i].createMoon();
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
    //newElement = null;
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
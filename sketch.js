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
 // imageMode(CENTER);

  env=new Enviroment;

    solar_system = new SolarSystem();
    currentSystem = solar_system;
    str=new Star(250,createVector(200,300),currentSystem);
    theta=random(TWO_PI);
    r = random(str.r,min(width/2,height/2));


    planetPos=createVector(abs(r*cos(theta)),abs(r*sin(theta)));
    planet=new Planet(100,planetPos,currentSystem);
    theta2=random(TWO_PI);
    r2=random(planet.r,min(width/2,height/2));
    moonPos=createVector(abs(r2*cos(theta2),r2*sin(theta2)));
    console.log(solar_system);
    moon = new Moon(20,moonPos,planet);
}

function draw() {

  //translate(width/2,height/2);
  background(0);//black background for now to represent space

   env.display();

   if(solar_s==false){//if they have no picked a star

   str.setAppearance();
   str.move();
   str.detect_click();


   }
   else if(solar_s==true){//if  player has chosen a star, display the moon and planet
      solar_system = new SolarSystem();
      solar_system.display();
      str.setAppearance();
      planet.setAppearance();
      moon.setAppearance();
   }

   currentSystem.display();
   drawIndication();
}

function mouseClicked(){

    click=true;

}


class Enviroment{//where solar systems live
  constructor(){


    this.stars=[];
  }

  display(){
    image(bg,p1,0,width,height);
    image(bg,p2,0,width,height);

    p1-=2;
    p2-=2;

    if (p1 <= -1000) {
    // move it back to the right of p2
    p1 = p2 + 1000;

    }
  if (p2 <= -1000) {
    // move it back to the right of p1
    p2 = p1 + 1000;

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
    image(bg,0,0,width,height);
    for (let i = 0; i < this.stars.length; i++){
      ellipse(this.stars[i].pos.x, this.stars[i].pos.x, this.stars[i].size, this.stars[i].size);
    }
    for (let i = 0; i < this.planets.length; i++){
      ellipse(this.planets[i].pos.x, this.planets[i].pos.x, this.planets[i].size, this.planets[i].size);
      for (let j = 0; j < this.planets[i].moons.length; j++){
        ellipse(this.planets[i].moons[j].pos.x, this.planets[i].moons[j].pos.x, this.planets[i].moons[j].size, this.planets[i].moons[j].size);
      }
    }
    for (let i = 0; i < this.asteroids.length; i++){
      ellipse(this.asteroids[i].pos.x, this.asteroids[i].pos.x, this.asteroids[i].size, this.asteroids[i].size);
    }
  }
}

class Star{
  //x,y,appearance,mass,SolarSystem
  constructor(size, pos, SolarSystem){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    this.star_type=int(random(0,3));
    //positions of this star in solar system (maybe fix at center?)
    //this.x = random(-500);
    //this.y = random(50,500);
    this.pos=pos;
    //this.vel=vel;
    //mass for calculating gravity
    this.size = size;
    this.pos.speed=random(2,5);
    this.r=this.mass;
    this.d;
    this.noiseLocation=random(0,1000);
    SolarSystem.stars.push(this);
  }

  setAppearance(){




    if(this.star_type==0){
      image(star1,this.pos.x,this.pos.y,this.r,this.r);


    }

    else if(this.star_type==1){

      image(star2,this.pos.x,this.pos.y,this.r,this.r);


    }

    else if(this.star_type==2){

      image(star3,this.pos.x,this.pos.y,this.r,this.r);

    }


    if(this.x>width){
      this.pos.x = random(-1000);
      this.pos.y = random(20,500);
      this.speed=random(2,5);
      this.star_type=int(random(0,3));
    }

    if(solar_s==true){
      this.pos.x=400;
      this.pos.y=400;
    }



  }


  move(){

    this.pos.x+=this.pos.speed;

    let moveAmount= map( noise(this.noiseLocation), 0,1,-1,1);
    this.pos.y+=moveAmount;
    this.noiseLocation+=0.02;
    this.pos.y=constrain(this.pos.y,50,800);


  }


  detect_click(){

    this.d=dist(mouseX, mouseY, this.pos.x,this.pos.y);


    //this.d = dist(mouseX, mouseY, this.x,this.y);
if(click==true){
    if(this.d<350){
      solar_s=true;
  }
}
  }
}

class Planet{
  constructor(size,pos,SolarSystem){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    //positions of this planet in solar system

    this.pos=pos;//position in space
    //this.distToStars = dist(SolarSystem.massCenter.x,SolarSystem.massCenter.y,this.x,this.y);
    //list of moons
    this.moons = [];
    //this.vel=vel;
    //mass for calculating gravity
    //this.mass = mass;
    this.size=size;
    this.color=random(255);
    console.log(SolarSystem);
    SolarSystem.planets.push(this);
  }

  setAppearance(){


    fill(0,0,255);
    ellipse(this.pos.x,this.pos.y,this.r,this.r);

    this.pos.x=constrain(this.pos.x,100,900);
    this.pos.y=constrain(this.pos.y,100,900);

  }

  move(){

    this.pos.x+=1;

  }
}

class Moon{
  constructor(size, pos, Planet){
    //let player choose or customize appearance
  //  this.appearance = this.setAppearance();
    //this.planet = Planet;
   // this.x = x;
   // this.y = y;
    //this.distToPlanet = dist(Planet.x,Planet.y,this.x,this.y);
    //mass for calculating gravity
    this.size = size;
    this.pos=pos;
  //  this.vel=vel;
    Planet.moons.push(this);
  }

  setAppearance(){

   // image(this.appearance,this.x,this.y,this.mass);

   fill(128);
   ellipse(this.pos.x,this.pos.y,this.mass);

   this.pos.y=constrain(this.pos.y,50,900);
   this.pos.x=constrain(this.pos.x,50,900);

  }

  move(){

  }
}

class Asteroid{
  constructor(size,pos,SolarSystem){
    //let player choose or customize appearance
    //this.appearance = this.setAppearance();
    //positions of this asteroid in solar system

    //not sure yet how to calculate gravity attraction
    //mass for calculating gravity
    this.size = size;
    this.pos = pos;
    SolarSystem.asteroids.push(this);
    console.log(SolarSystem);
  }

  setAppearance(){

  fill(128);
  ellipse(this.pos.x,this.pos.y,this.mass);
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

function keyPressed() {
  if (newElement != null){
    switch(newElement) {
      case 'star':
        //can't create new stars for now
        break;
      case 'planet':
        //create new planet
        console.log(new Planet(largeness, createVector(mouseX,mouseY), currentSystem));
        newElement = null;
        break;
      case 'moon':
        if (currentSystem.planets.length >= 1){
          //create new moon
          let closestPlanet = currentSystem.planets[0];
          for (let i = 0; i < currentSystem.planets.length; i++){
            if (dist(mouseX, mouseY, currentSystem.planets[i].positionX, currentSystem.planets[i].positionY) <
                dist(mouseX, mouseY, closestPlanet.positionX, closestPlanet.positionY)){
                  closestPlanet = currentSystem.planets[i];
                }
          }
          console.log(new Moon(largeness, createVector(mouseX,mouseY), closestPlanet));
          console.log(closestPlanet);
          newElement = null;
        }
        else{
          //fail if no planets exist
          //make it explode
        }
        break;
      case 'asteroid':
        //create new asteroid
        new Asteroid(largeness, createVector(mouseX,mouseY), currentSystem);
        newElement = null;
        break;
      default:
        break;
    }
    //newElement = null;
  }
}

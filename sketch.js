let state =1;

var starImage;

let starRandom1X ;
let starRandom1Y;


var yNoiseOffset
var yMovement

var OneyNoiseOffset
var OneyMovement

var TwoyNoiseOffset
var TwoyMovement

let starRandom3X ;
let starRandom3Y;


let starRandom2X ;
let starRandom2Y;

// preload artwork

let bg;
let star1;
let star2;
let star3;
let exp1;
let p1=window.innerWidth*0.5;
let p2=window.innerWidth*1.5;
let str;
let currentSystem;

function preload() {
  bg=loadImage("images/bg4.jpeg");
  bg.resize(window.innerWidth,window.innerHeight);
  star1=loadImage("images/str1.png");
  star2=loadImage("images/str2.png");
  star3=loadImage("images/str3.png");
  exp1=loadImage("images/exp1.gif");
 // solar=loadImage("images/bg3.jpeg");
}

function setup() {

  yNoiseOffset = random(0,10)
  OneyNoiseOffset = random(10,20)
  TwoyNoiseOffset = random(20,30)



  starRandom1X = random(100,500)
  starRandom1Y= random(100,800)


  starRandom2X = random(starRandom1X+500,starRandom1X + 700)
  starRandom2Y= random(100,800)

  starRandom3X = random(starRandom2X + 500,starRandom2X + 800 )
  starRandom3Y= random(100,800)


  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  colorMode(HSB);

  currentSystem = new SolarSystem();
  str=new Star(250,width/2,height/2,currentSystem);
  //moon = new Moon(20,800,800,0.01,planet);
}

function draw() {
  //background images
  image(bg,p1,window.innerHeight/2);
  image(bg,p2,window.innerHeight/2);
  p1-= 0.1;
  p2-= 0.1;
  if (p1<-window.innerWidth/2){
    p1 = window.innerWidth*1.5;
  }
  if (p2<-window.innerWidth/2){
    p2 = window.innerWidth*1.5;
  }

  if(state == 0){
    currentSystem.display();
    drawIndication();

  }else if(state==1){
    image(star1,starRandom1X,starRandom1Y)
    image(star2,starRandom2X,starRandom2Y)
    image(star3,starRandom3X,starRandom3Y)
    yMovement = map( noise(yNoiseOffset), 0, 1, -2, 2);

    OneyMovement = map( noise(OneyNoiseOffset), 0, 1, -2, 2);
    TwoyMovement = map( noise(TwoyNoiseOffset), 0, 1, -2, 2);





    if(starRandom3X > windowWidth+120){
      starRandom3X = -100


    }else if(starRandom3Y > windowHeight+100){
      starRandom3Y = -99
    }else if(starRandom3Y < -100){
      starRandom3Y = windowHeight
    }

    if(starRandom1X > windowWidth+100){
      starRandom1X = -100


    }else if(starRandom1Y > windowHeight+100){
      starRandom1Y = -50
    }else if(starRandom1Y < -50){
      starRandom1Y = windowHeight
    }


    if(starRandom2X > windowWidth+100){
      starRandom2X = -100


    }else if(starRandom2Y > windowHeight+100){
      starRandom2Y = -100
    }

    starRandom3Y += yMovement
    yNoiseOffset += 0.01 ;


    starRandom1Y += OneyMovement
    OneyNoiseOffset += 0.01;

    starRandom2Y += TwoyMovement
    TwoyNoiseOffset += 0.01;




    starRandom3X++
    starRandom2X++
    starRandom1X++
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
      fill(255);

      image(starImage, this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
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
    this.picture=`star${int(random(0,3))}`;
    this.x = x;
    this.y = y;
    this.size = size;
    SolarSystem.stars.push(this);
  }

}

class Planet{
  constructor(d,size,SolarSystem,angle) {
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.d = d;
    this.angle = angle;
    this.x = 0;
    this.y = 0;
    this.size = largeness;
    this.moons = [];
    this.speed = random(0.5, 2);
    this.system = SolarSystem;
    this.appearance = 'ellipse';
    SolarSystem.planets.push(this);
  }

    moveAndDisplay() {
    this.x = sin(this.angle) * this.d + this.system.stars[0].x;
    this.y = cos(this.angle) * this.d + this.system.stars[0].y;

    fill(this.H,this.S,this.B);
    if (this.isMouseOver()) {
      fill(255);
    }

    if (this.appearance == 'ellipse'){
      ellipse(this.x, this.y, this.size, this.size);
    }
    else{
      image(this.appearance, this.x, this.y);
      if (this.appearance == exp1 && exp1.getCurrentFrame() >= 18){
        //remove this planet
        var index = this.system.planets.indexOf(this);
        this.system.planets.splice(index,1);
      }
    }

    // draw our moons
    for (let i = 0; i < this.moons.length; i++) {
      this.moons[i].moveAndDisplay();
    }

    this.angle += this.speed;
  }

  isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<(this.size/2)){
      return true;
    }
    return false;
  }

  createMoon(){
    let moonDist = this.size/2 + largeness/2 + random(largeness/5,largeness);
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
    this.x = sin(this.angle) * this.d + this.planet.x;
    this.y = cos(this.angle) * this.d + this.planet.y;

    fill(this.H,this.S,this.B);
    ellipse(this.x, this.y, this.size, this.size);

    this.angle += this.speed;
  }

   isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<(this.size/2)){
      return true;
    }

    return false;

  }
}

class Asteroid{
  constructor(d,size,SolarSystem,angle){
    //let player choose or customize appearance
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.size = size;
    this.speed = random(1,3);
    this.d = d;
    this.system=SolarSystem;
    this.angle = angle;
    this.x = 0;
    this.y = 0;
    SolarSystem.asteroids.push(this);
  }


  moveAndDisplay(){

    this.x = sin(this.angle) * this.d * 1.5 + this.system.stars[0].x;
    this.y = cos(this.angle) * this.d + this.system.stars[0].y;

    fill(this.H,this.S,this.B);
    ellipse(this.x,this.y,this.size,this.size*1.3);
    this.angle += this.speed;
  }

   isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<this.size/2){
      return true;
    }
    return false;
  }
}


let newElement = null;  //if there's an active newCreation, draw the new body at mouseX mouseY in draw() to indicate location until comfirmed

function initiate(element){
  newElement = element;
}

function drawIndication(){
  if (newElement == 'planet' || newElement == 'moon'){
    //image sth at mouseX mouseY
    fill(hue,saturation,brightness);
    ellipse(mouseX,mouseY,largeness,largeness);
  }
  else if (newElement == 'asteroid'){
    ellipse(mouseX,mouseY,largeness,largeness*1.3);
  }
}

function mousePressed() {



    if(state == 1){
      if(dist(mouseX, mouseY, starRandom1X, starRandom1Y) < 50){
        state = 0;
        starImage = star1

      }

      if(dist(mouseX, mouseY, starRandom2X, starRandom2Y) < 100){
        state = 0;
        starImage = star2

      }

      if(dist(mouseX, mouseY, starRandom3X, starRandom3Y) < 100){
        state = 0;
        starImage = star3

      }
    }

  const newAngle = originalAngle();
  if (newElement != null){
    switch(newElement) {
      case 'star':
        //can't create new stars for now
        break;
      case 'planet':
        //create new planet
        let dPlanet = dist(mouseX,mouseY,currentSystem.stars[0].x,currentSystem.stars[0].y);
        new Planet(dPlanet,largeness,currentSystem,newAngle);
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
        let dAsteroid = dist(mouseX,mouseY,currentSystem.stars[0].x,currentSystem.stars[0].y);
        new Asteroid(dAsteroid,largeness,currentSystem,newAngle);
        newElement = null;
        break;
      case 'destroy':
        for (let i = 0; i < currentSystem.planets.length;i++){
          if (currentSystem.planets[i].isMouseOver()){
            currentSystem.planets[i].appearance = exp1;
          }
        }
        newElement = null;
      case 'cancel':
        newElement = null;
        break;
      default:
        break;
    }
    //newElement = null;
  }
}

function originalAngle(){
  angleMode(DEGREES);
  const X0 = window.innerWidth/2;
  const Y0 = window.innerHeight/2;
  const distY = mouseY-Y0;
  const distX = mouseX-X0;
  //console.log(mouseX,mouseY);
  //console.log(A,O);
  if (distY > 0 && distX > 0){
    //4th quadrant
    return atan2(distX,distY);
  }
  else if (distY < 0){
    //1st quadrant
    return atan2(Math.abs(distY),distX)+90;
  }
  else if (distX < 0){
    //3rd quadrant
    return atan2(Math.abs(distY),Math.abs(distX))+270;
  }
  else {
    //2nd quadrant
    return atan2(Math.abs(distX),distY)+180;
  }
}

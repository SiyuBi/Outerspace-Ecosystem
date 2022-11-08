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

let button=false;
let shade=0;
// preload artwork

let bg;
let p1=window.innerWidth*0.5;
let p2=window.innerWidth*1.5;
let str;
let star1;
let star2;
let star3;
let currentSystem;
let newAngle=0;
let ast;
let song;





function preload() {
  bg=loadImage("images/bg4.jpeg");
  star1=loadImage("images/str1.png");
  star2=loadImage("images/str2.png");
  star3=loadImage("images/str3.png")
  exp1=loadImage("images/exp1.gif");
  bg.resize(window.innerWidth,window.innerHeight);
  ast=loadImage("images/ast.png");


  song = loadSound("sounds/song.mp3");


  

}

function setup() {

  song.loop();

  yNoiseOffset = random(0,10)
  OneyNoiseOffset = random(10,20)
  TwoyNoiseOffset = random(20,30)




  starRandom1X = random(100,500)
  starRandom1Y= random(100,800)


  starRandom2X = random(starRandom1X+500,starRandom1X + 700)
  starRandom2Y= random(100,800)



  starRandom3X = random(starRandom2X + 500,starRandom2X + 800 )
  starRandom3Y= random(100,800)

  starRandom1Y= constrain(starRandom1Y,windowHeight/2,windowHeight)
  starRandom2Y= constrain(starRandom2Y,windowHeight/2,windowHeight)
  starRandom3Y= constrain(starRandom3Y,windowHeight/2,windowHeight)

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  
  colorMode(HSB, 360, 100, 100);
 

  currentSystem = new SolarSystem();

  str=new Star(250,width/2,height/2,currentSystem);


}



function draw() {

  image(bg,p1,window.innerHeight/2);
  image(bg,p2,window.innerHeight/2);
  p1-= 0.5;
  p2-= 0.5;
  if (p1<-window.innerWidth/2){
    p1 = window.innerWidth*1.5;
  }
  if (p2<-window.innerWidth/2){
    p2 = window.innerWidth*1.5;
  }

 if(state == 0){

  document.querySelector("#panelContainer").style.display = "block";

    currentSystem.display();

       if(currentSystem.planets.length >1){
      for(let i = 0; i<currentSystem.planets.length-1; i++){
            for(let j = i+1; j<currentSystem.planets.length; j++){
              if(currentSystem.planets[i].collision(currentSystem.planets[j])){
                if(currentSystem.planets[j].size>currentSystem.planets[i].size){
                currentSystem.planets.splice(i,1)
              }
                else{
                  currentSystem.planets.splice(j,1)
                }

              }
             
            }
        }
     }


    drawIndication();

   

  }else if(state==1){
    let showp=true;
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
      starRandom3Y = 2000
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




 
    // textSize(15)
    // text("x: "+mouseX+" y: "+mouseY,mouseX,mouseY-10);

  


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
  constructor(d,size,SolarSystem,angle) {
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.d = d;
    this.angle= angle
    this.x = 0;
    this.y = 0;
    this.size = largeness;
    this.moons = [];
    this.appearance='ellipse';
    this.speed = random(0.5,2);
    this.system = SolarSystem;
    this.shade=0;
    SolarSystem.planets.push(this);
   
  }

  createMoon() {
    let moonDistance = dist(this.x, this.y, mouseX, mouseY) + 20 + random(20);
    this.moons.push( new Moon(this, moonDistance) );
  }

  moveAndDisplay() {

    this.x = sin(this.angle) * this.d + this.system.stars[0].x 
    this.y = cos(this.angle) * this.d + this.system.stars[0].y 


    fill(this.H,this.S,this.B);
    if (this.isMouseOver()) {
      fill(255);
    }

    if (this.appearance == 'ellipse'){

        if(button==true){

       this.shade = this.shade + 1;
      if(this.shade > 255){
        this.shade = 0;
        }
        fill(this.shade,255,255)
       ellipse(this.x, this.y, this.size, this.size);
       

      
       

     }

     else if(button==false){

        fill(this.H, this.S, this.B);
       ellipse(this.x, this.y, this.size, this.size);


     }
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



    this.angle += this.speed 


  

  }



  isMouseOver(){
    if(dist(mouseX,mouseY,this.x,this.y)<50){
      return true
    }

    return false;

  }

  createMoon(){
    let moonDist = dist(this.x,this.y,mouseX,mouseY) + 100 + random(15);

    this.moons.push( new Moon(moonDist,largeness,this));

  }

  collision(planetTwo){

    if(dist(this.x, this.y, planetTwo.x,planetTwo.y) < 70){
      return true
    }

    return false

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
    if(dist(mouseX,mouseY,this.x,this.y)<20){
      return true;

    }

    return false;

  }

  
}

class Asteroid{
  constructor(size,x,y,d,SolarSystem,angle){
    //let player choose or customize appearance
    this.H = hue;
    this.S = saturation;
    this.B = brightness;
    this.size = size;
    this.vel = random(0.5,1.5);
    this.x = x;
    this.y = y;
    this.d=d;
    this.appearance=ast;
    this.angle=angle;
    this.angle_rot=random(360);
    this.system=SolarSystem;

    SolarSystem.asteroids.push(this);
    console.log(SolarSystem);
  }

 
  moveAndDisplay(){


     this.x = cos(this.angle)*1.1 * this.d +  this.system.stars[0].x;
    this.y = sin(this.angle) * this.d +  this.system.stars[0].y;


    fill(this.H,this.S,this.B);
    push();
    translate(this.x,this.y)
    rotate(this.angle_rot);
    image(ast,0,0,this.size,this.size*1.5);
    this.angle_rot+=2;
    pop();


    if (this.appearance == ast){
      push();
      translate(this.x,this.y)
      rotate(this.angle_rot);
      image(ast,0, 0, this.size, this.size*1.5);
      this.angle_rot+=2;
      pop();
    }
    else{
         

    image(this.appearance, this.x, this.y);
      if (this.appearance == exp1 && exp1.getCurrentFrame() >= 18){
        //remove this planet
        var index = this.system.asteroids.indexOf(this);
        this.system.asteroids.splice(index,1);
      }
    }


    this.angle += this.vel;
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

  if (newElement && newElement!='destroy' &&  newElement!='cancel'){
    //image sth at mouseX mouseY

    if(button==true){
  
    ellipse(mouseX,mouseY,largeness,largeness);
    button==false;
  }

  else if(button==false){

     fill(hue,saturation,brightness);
    ellipse(mouseX,mouseY,largeness,largeness);

    }
  }
   else if(newElement=='asteroid'){
  //   console.log("hey")
    largeness=200;
     image(ast,mouseX,mouseY,largeness,largeness*1.3);
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
         
        // currentSystem.planets.angle = atan2(mouseY,mouseX);

        let d = dist(mouseX,mouseY,currentSystem.stars[0].x,currentSystem.stars[0].y);
        new Planet(d,largeness,currentSystem,newAngle);


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
     
        break;
      case 'asteroid':
        //create new asteroid
         let di = dist(mouseX,mouseY,500,500);
        console.log(new Asteroid(largeness, mouseX,mouseY,di, currentSystem,newAngle));
        newElement = null;
        break;
      case 'destroy':
      console.log(newElement);
        //destory object if clicked on
        for (let i = 0; i < currentSystem.planets.length; i++){
          if (currentSystem.planets[i].isMouseOver()){
                currentSystem.planets[i].appearance = exp1;
                //currentSystem.planets.splice(i,1);  


               
              }



           //gif_im.position(mouseX, mouseY).hide();
          
        }

      
        

        for(let i=0;i<currentSystem.asteroids.length;i++){
          if(currentSystem.asteroids[i].isMouseOver()){
            currentSystem.asteroids[i].appearance = exp1;
             //currentSystem.asteroids.splice(i,1);
              //gif_im.position(currentSystem.asteroids.x, currentSystem.asteroids.y).show();

          }
        }

        
        break;
      default:
        break;
    }

  }
}

function showPanel(){
  if(showp=true){
    //show_panel;
  }

  else if(showp==false){
    //hide_panel;

  }
}
function buttonFun(){

  button=true;
}

function buttonUnFun(){

  button=false;
}

function start(){

 document.querySelector("#instructions").style.display = "none";

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
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

   /* for(let i=0;i<4;i++){
      str=new Star(350,createVector(0,0),createVector(0,0));
      stars.push(str);
    }*/


      str=new Star(250,200,300,0);
      //theta=random(TWO_PI);
      //r = random(str.r,min(width/2,height/2));


      //planetPos=createVector(abs(r*cos(theta)),abs(r*sin(theta)));
      planet=new Planet(100,200,200,0.01);
      //theta2=random(TWO_PI);
      //r2=random(planet.r,min(width/2,height/2));
      //moonPos=createVector(30,30);
      moon = new Moon(20,150,150,0.01)


 //moonPos=createVector(abs(r2*cos(theta2),r2*sin(theta2)));
     


}

function draw() {

  //translate(width/2,height/2);
  background(0);//black background for now to represent space

   env.display();


   if(solar_s==false){//if they have no picked a star
     

     

    /*for(let i=0; i<stars.length;i++){

    stars[i].setAppearance();
    stars[i].move();
    stars[i].detect_click();



   }*/

 

   }


   else if(solar_s==true){//if  player has chosen a star, display the moon and planet


      solar_system = new SolarSystem();
      solar_system.display();
      str.setAppearance();
      planet.setAppearance();
      planet.move();
      moon.setAppearance();
      moon.move();

    
      //console.log(moon.pos.x,moon.pos.y);



   }






}

function mouseClicked(){

    click=true;

}


class Enviroment{//where solar systems live
  constructor(){


    this.stars=[];

    //env.solar_system.push(this);


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

   str.setAppearance();
   str.move();
   str.detect_click();





    }

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
    
    //instantiating star and planet objects

    image(bg,0,0,width,height);
    

  }
}

class Star{
  //x,y,appearance,mass,SolarSystem
  constructor(mass, x,y, vel){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    this.star_type=int(random(0,3));
    //positions of this star in solar system (maybe fix at center?)
    this.x = x;
    this.y = y;
    this.vel=vel;
    this.theta=0;
    //mass for calculating gravity
    this.mass = mass;
    this.speed=random(2,5);
    this.r=this.mass;
    this.d;
    this.noiseLocation=random(0,1000);
 



    //SolarSystem.stars.push(this);
  }

  setAppearance(){

   
   

    if(this.star_type==0){
      image(star2,this.x,this.y,this.r,this.r);
      

    }

    else if(this.star_type==1){

      image(star2,this.x,this.y,this.r,this.r);


    }

    else if(this.star_type==2){

      image(star3,this.x,this.y,this.r,this.r);

    }


    if(this.x>width){
      this.x = random(-1000);
      this.y = random(20,500);
      this.speed=random(2,5);
      this.star_type=int(random(0,3));
    }

    if(solar_s==true){
      this.x=400;
      this.y=400;
    }



  }


  move(){

    this.x+=this.speed;

    let moveAmount= map( noise(this.noiseLocation), 0,1,-1,1);
    this.y+=moveAmount;
    this.noiseLocation+=0.02;
    this.y=constrain(this.y,50,800);




  }


  detect_click(){

    this.d=dist(mouseX, mouseY, this.x,this.y);


    //this.d = dist(mouseX, mouseY, this.x,this.y);
if(click==true){

   


    if(this.d<350){
      solar_s=true;
     

  }
}



  }



}

class Planet{
  constructor(mass,x,y,vel){
    //let player choose or customize appearance
   // this.appearance = this.setAppearance();
    //positions of this planet in solar system

    //position in space
    //this.distToStars = dist(SolarSystem.massCenter.x,SolarSystem.massCenter.y,this.x,this.y);
    //list of moons
    this.moons = [];
    this.vel=vel;
    //mass for calculating gravity
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.r=this.mass;
    this.theta=0;
    this.color=random(255);
    //SolarSystem.planets.push(this);
    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){


    fill(0,0,255);
    ellipse(this.x,this.y,this.r,this.r);

    //this.pos.x=constrain(this.pos.x,100,900);
    //this.pos.y=constrain(this.pos.y,100,900);

  }

  move(){

   // let distanceFromSun = dist(this.pos.x, this.pos.y, width/2, height/2) // Calculates distance from planet to sun(middle of canvas)

    // The closer the planet is to the sun the faster it orbits
     this.theta += this.vel;
    console.log(this.x,this.y)

    this.x = this.r*cos(this.theta)
    this.y = this.r*sin(this.theta)



    //this.accelerationX += 1 //(width/2 - this.x )/distanceFromSun 
  //  this.accelerationX += 1//(height/2 - this.x )/distanceFromSun 

   // this.pos.x += this.accelerationX
   // this.pos.y += this.accelerationY



  }
}

class Moon{
  constructor(mass, x,y, vel){
    //let player choose or customize appearance
    //this.appearance = this.setAppearance();
    this.planet = Planet;
    this.x = x;
    this.y = y;
    //mass for calculating gravity
    this.mass = mass;
    this.r=this.mass;
    this.vel=vel;
    this.theta=0;
    //this.distToPlanet = dist(Planet.pos.x,Planet.pos.y,this.pos.x,this.pos.y);
    //Planet.moons.push(this);


    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){


   // image(this.appearance,this.x,this.y,this.mass);

   fill(128);
   ellipse(this.x,this.y,this.r);

   this.y=constrain(this.y,50,900);
   this.x=constrain(this.x,50,900);

  }

  move(){

    this.theta += this.vel;
    console.log(this.x,this.y)

    this.x = this.r*cos(this.theta)
    this.y = this.r*sin(this.theta)

   // this.vel += (this.planet.pos.x- this.pos.x )/this.distToPlanet 
   // this.vel += (this.planet.pos.y - this.pos.x )/this.distToPlanet 

    //this.pos.x += this.vel
   // this.pos.y += this.vel

  }
}

class Asteroid{
  constructor(mass,x,y,vel){
    //let player choose or customize appearance
    this.appearance = this.setAppearance();
    //positions of this asteroid in solar system
        this.x = x;
    this.y = y;

    //not sure yet how to calculate gravity attraction
    //mass for calculating gravity
    this.mass = mass;
    this.vel=vel;//velocity 
    //SolarSystem.asteroids.push(this);

    this.accelerationX = 1; 
    this.accelerationY = 1;
  }

  setAppearance(){

  fill(128);
  ellipse(this.x,this.y,this.r);


  }

  move(){

    this.accelerationX += (this.planet.x- this.x )/this.distToPlanet 
    this.accelerationX += (this.planet.y - this.x )/this.distToPlanet 

    this.x += this.accelerationX
    this.y += this.accelerationY


  }
}

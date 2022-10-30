// preload artwork

let bg;
let p1=0;
let p2=1000;
let theta=0;
let bodies;
let env;


function preload() {
  bg=loadImage("images/bg4.jpeg");
  star1=loadImage("images/str1.png");
  star2=loadImage("images/str2.png");
  star3=loadImage("images/str3.png");



}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5canvas');
  noStroke();
  

  bodies=new Body();
  env=new Enviroment();




}

function draw() {


  background(0);//black background for now to represent space


  env.display();
  translate(width/2,height/2);

  bodies.displaySun();
  bodies.displayPlanet();
  bodies.displayMoon();
  bodies.displayAsteroid();









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




class Body{

  constructor(){
    //this.mass=mass;
    this.x=0;
    this.y=0;
    this.vel=0.01;
    this.r=300;
    this.center=0;


  }


  displaySun(){

    fill(255,255,0)
    ellipse(this.center,this.center,200,200);





  }


  displayPlanet(){

    fill(0,255,0);
    theta += this.vel;
    this.x = this.r*cos(theta)
    this.y = this.r*sin(theta)
    ellipse(this.x,this.y,100,100);


  }

  displayMoon(){

    fill(128);
    this.x = 380*cos(theta)
    this.y = 380*sin(theta)
    ellipse(this.x,this.y,25,25);



  }


  displayAsteroid(){

    fill(128);
    this.x = 450*cos(theta);
    this.y = 140*sin(theta);
    ellipse(this.x,this.y,25,25);

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
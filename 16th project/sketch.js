
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var PLAY=3;
var END=2;
var gameState=PLAY;
var sound;
var sound2;
var playground1;
var playground2;
var restart;
var restartimage;
var beepsound;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 sound=loadSound("WhatsApp Audio 2021-04-28 at 8.50.41 AM.mpeg");
  sound2=loadSound("WhatsApp Audio 2021-04-28 at 2.23.10 PM.mpeg")
  playground1=loadImage("WhatsApp Image 2021-04-28 at 2.59.14 PM.jpeg")
  restartimage=loadImage("WhatsApp Image 2021-04-28 at 3.13.37 PM.jpeg")
  beepsound=loadSound("mixkit-positive-interface-beep-221.wav")
}



function setup() {
  createCanvas(600,400);
  
  playground2=createSprite(0,0,600,600);
  playground2.addImage("loo",playground1)
  
 ground=createSprite(400,350,900,5);
  ground.shapeColor=("teal")
  
  
  monkey=createSprite(100,350,10,10);
  monkey.addAnimation("look",monkey_running);
  monkey.scale=0.2;

  
  score=0;
  
  FoodGroup=new Group();
  ObstacleGroup=new Group();
  
  restart=createSprite(300,200,10,10);
  restart.addImage("pol",restartimage)
}


function draw() {
  
  background("white")
  
 

  playground2.scale=1.25;
  restart.scale=0.1;
  
  if(gameState===PLAY){
    
    if(ground.x< 0){
    ground.x=ground.width/2;
}
  
monkey.collide(ground)
    
  spawnObstacles();
  spawnBananas();
  
  if(keyDown("space")&&monkey.y>100){
    monkey.velocityY=-12;
}
  monkey.velocityY=monkey.velocityY+0.8 
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
    sound.play();
}
    if(monkey.isTouching(ObstacleGroup)){
      sound2.play();
       fill("navy")
  text("G A M E O V E R",100,100)
      gameState=END
      
    }
    monkey.visible=true
    restart.visible=false
    
    if(score>0&&(score%50===0)){
       beepsound.play();
       }
     
} else if(gameState===END){
  
  ground.velocityX=0;
  score=0;
  FoodGroup.destroyEach();
  ObstacleGroup.destroyEach();
  monkey.velocityX=0;
  monkey.velocityY=0;
  monkey.visible=false
  restart.visible=true
 
  if(mousePressedOver(restart)){
    gameState=PLAY;
     
     }    
 }
  
  
  
  
  
  

  
  drawSprites();
 
  fill("yellow");
  textSize(19);
  text("Bananas:"+ score,280,50)
}
function spawnObstacles(){
  if(frameCount %60===0){
    obstacle=createSprite(600,310,10,10);
    obstacle.addImage("ref",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-(10+(score/5));
    obstacle.lifetime=100
    
    ObstacleGroup.add(obstacle);
  }
}
function spawnBananas(){
  if(frameCount %60===0){
    banana=createSprite(600,120,10,10);
    banana.addImage("kih",bananaImage);
    banana.scale=0.2;
    banana.velocityX=-10;
    banana.y=Math.round(random(30,150))
    FoodGroup.add(banana);
     FoodGroup.setLifetime=150
     }
  
}






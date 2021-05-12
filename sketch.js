var survivalTime = 0;
var ground, groundImage;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var obstacleGroup, bananaGroup;
var score = 0;
var gameState = 0;
function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  monkey = createSprite(80,300,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  
  ground = createSprite(300,430,600,10);
  ground.scale = 1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
createCanvas(600,500);
background("lightblue");
  
if (gameState === 0){
stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 500, 50);
  
stroke("black");
textSize(20);
fill("black");

survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 100, 52);

monkey.setCollider("rectangle", monkey.x -100, monkey.y - 320, 400, 450 )
if(keyDown("space")&&monkey.y >= 380) {
    monkey.velocityY = -12; 
}

monkey.velocityY = monkey.velocityY + 0.8;
monkey.collide(ground); 

if (monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach();
  score = score+1;
}
  
if (monkey.isTouching(obstacleGroup)){
    gameState = 1;
}

if(gameState === 1){
   gameOver();
}
ground.velocityX = -10;

if (ground.x < 400){
  ground.x = ground.width/2;
}

bananas();
obstacles();
drawSprites();
}

}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,300,50,50);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-10;        
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
     
    obstacle = createSprite(620,400,50,50);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -10
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}

function gameOver(){
  monkey.destroy();
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  ground.destroy();
  text("game over! Press r to restart", 200 , 200);
}
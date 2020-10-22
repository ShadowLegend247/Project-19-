var bananaImage, obstacleImage, obstacleGroup, bananaGroup, scene, sceneImage;

var score = 0;

var monkey, monkey_running;

var ground;

var survivalTime = 0;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  sceneImage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(800, 400);

  scene = createSprite(0, 0, 800, 400);
  scene.addImage("Background", sceneImage);
  scene.velocityX = -4;
  scene.scale = 2;
  
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(400,390,800,20)
  ground.visible = false;
 
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background("white");
  
  if(scene.x < 0) {  
    scene.x = scene.width/2;
  }
  
  monkey.collide(ground);  
  
  if(keyWentDown("space") && monkey.y >= 250)  {
    monkey.velocityY  = -15             
  }
  
    monkey.velocityY=monkey.velocityY + 0.8;    
  
    for(var i = 0; i < bananaGroup.length; i++) {
      
      if(monkey.isTouching(bananaGroup.get(i))) {
         bananaGroup.get(i).destroy();
         score++;
      }
    }
  
  if(monkey.isTouching(obstacleGroup)) {
     monkey.scale = 0.2;
     score = 0;
  }
  
  monkey.scale = 0.2 + score/100;
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites(); 

  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + score, 600, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(World.frameCount/World.frameRate);
  text("Survival Time: "+survivalTime,100,50);
  
}

function spawnBananas(){
  if (World.frameCount % 80 === 0){
    var banana = createSprite(800,300,40,10);
    banana.addImage("Banana", bananaImage);
    banana.scale=0.07;
    banana.lifetime=134;
    banana.velocityX=-6;
    banana.y=Math.round(random(170,240));
    bananaGroup.add(banana);
  }
}

//create obstacle sprite
function spawnObstacles(){
  if(World.frameCount % 200 === 0){
    var obstacle = createSprite(800,355,10,40);
    obstacle.addImage("Stone", obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime=200;
    obstacle.velocityX=-4;
    obstacleGroup.add(obstacle);
  }
}
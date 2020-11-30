var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.2;
  ghost.setCollider("circle",0,0,70  );
  ghost.debug = true;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup = createGroup();
  spookySound.loop();
}

function draw(){
  if (gameState === PLAY) {
      tower.velocityY = 1
      if (tower.y > 400) {
          tower.y = tower.height/2;
      }
      if (keyDown("space")&& ghost.y >= 100) {
          ghost.velocityY = -10;
      }
      ghost.velocityY = ghost.velocityY + 0.8;
      if (keyDown(RIGHT_ARROW)) {
          ghost.x = ghost.x + 5;
      }
      if (keyDown(LEFT_ARROW)) {
          ghost.x = ghost.x - 5;
      }
      spawnDoors();
      if (climberGroup.isTouching(ghost)) {
          ghost.velocityY = 0; 
      }
     if (ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)) {
         gameState = END;
     }
  }
  else if (gameState === END) {
           ghost.velocityY = 0;
           ghost.velocityX = 0;
           tower.velocityY = 0;
           doorGroup.setVelocityYEach(0);
           climberGroup.setVelocityYEach(0);
           doorGroup.setLifetimeEach(-1);
           climberGroup.setLifetimeEach(-1);
  }
   
  drawSprites();
  if (gameState === END) {
      textSize(50);
      fill("red")
      text("game over",200,300);
  }

}
function spawnDoors() {
  if(frameCount % 200 === 0) {
     var door = createSprite(0,-10);
     door.addImage(doorImg);
     door.x = Math.round(random(100,500));
     door.velocityY = 1;
     door.scale = 0.5;
     door.lifetime = 600;
     door.depth = ghost.depth;
     ghost.depth = ghost.depth + 1;     
     doorGroup.add(door);
     
     var climber = createSprite(0,20);
     climber.addImage(climberImg);
     climber.x = door.x;
     climber.velocityY = 1;
     climber.scale = 0.5;
     climber.lifetime = 600;
     climberGroup.add(climber);
     var invisibleBlock = createSprite(0,30)
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
     invisibleBlock.x = door.x;
     invisibleBlock.lifeTime = 600;
     invisibleBlock.velocityY = 1;
     invisibleBlock.visible = false;
     invisibleBlockGroup.add(invisibleBlock);
  }
}



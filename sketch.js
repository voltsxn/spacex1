var towerImg, tower;
var doorImg, door, doorsGroup,bullet;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var laserImg
var bullets=70

function preload(){
  bgImg = loadImage("images/bg final.jpg");
  doorImg = loadImage("images/gif 2.gif");
  climberImg = loadImage("images/green.gif");
  ghostImg = loadImage("images/spaceship.gif");
  spookySound = loadSound("spooky.wav");
  laserImg = loadImage("images/blue laser.png");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,150);
  tower.addImage("tower",bgImg);
  tower.scale=1.5;
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
bulletGroup = new Group();



  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    if(keyDown("S")){
      shoot()
    }

    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 150
    }
    spawnDoors();
    spawnalien();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.destroy();
      gameState = "end"
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    if(doorsGroup.isTouching(bulletGroup) ) 
    {
      
      for(var i=0;i<doorsGroup.length;i++){     
      
        if(doorsGroup[i].isTouching(bulletGroup)){
             doorsGroup[i].destroy()
             bulletGroup.destroyEach()
             //explosionSound.play();
      invisibleBlockGroup.destroyEach()
            // score = score+2
             } 
       
       }
    }
    if(climbersGroup.isTouching(bulletGroup) ) 
    {
      
      for(var i=0;i<climbersGroup.length;i++){     
      
        if(climbersGroup[i].isTouching(bulletGroup)){
             climbersGroup[i].destroy()
             bulletGroup.destroyEach()
             //explosionSound.play();
             invisibleBlockGroup.destroyEach()
            // score = score+2
             } 
       
       }
    }
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 500 === 0) {
    var door = createSprite(Math.round(random(50,550)), -50);
   
    door.scale = 0.2
    var invisibleBlock = createSprite(200,-10);
    invisibleBlock.width = door.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible=false
    //door.x = Math.round(random(120,400));
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    
    
    door.velocityY = 1;
    
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function spawnalien() {
  //write code here to spawn the doors in the tower
  if (frameCount % 300 === 0) {
    var climber = createSprite(Math.round(random(100,600)),10,10,10);
    climber.scale=0.3
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
  
    
invisibleBlock.x = climber.x;
    
    
    climber.addImage(climberImg);
    
  
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
  
   
    //assign lifetime to the variable
    
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
function shoot() {
 bullet= createSprite(ghost.x,ghost.y-80,10,20)
 bullet.scale=0.03
bullet.velocityY=-5
bullet.addImage("bluelaser",laserImg)
bulletGroup.add(bullet)
bullets=bullets-1
}
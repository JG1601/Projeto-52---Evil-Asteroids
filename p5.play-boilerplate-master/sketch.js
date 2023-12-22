var bg, bgImg,gameSound, end, endImg, gameOverSound;
var spaceShip, spaceShipImg;
var ray, rayImg, raySound;
var asteroid, asteroidImg1, asteroidImg2, asteroidImg3, explosionSound;
var rayGroup, asteroidGroup;
var gameState = "play";
var life = 3;
var points = 0;

function preload(){
  
  spaceShipImg = loadImage("assets/spaceShip.png")
 
  bgImg = loadImage("assets/bg.jpg")
  endImg = loadImage("assets/end.png")

  rayImg = loadImage("assets/sprite_Ray0.png");

  asteroidImg1 = loadImage("assets/sprite_0.png");
  asteroidImg2 = loadImage("assets/sprite_10.png");
  asteroidImg3 = loadImage("assets/asteroid3.png"); 

  gameSound = loadSound("assets/gameSound.mp3");
  gameOverSound = loadSound("assets/gameOver.mp3");
  explosionSound = loadSound("assets/Explosão.mp3");
  raySound = loadSound("assets/tiro.mp3");
}


function setup() {
  

  
    createCanvas(windowWidth,windowHeight);
  
    //adicionando a imagem de fundo
    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
    bg.addImage(bgImg)
    bg.scale= 0.6;
    end = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
    end.addImage(endImg)
    end.scale= 0.6;
  
  //criando o sprite do jogador
    spaceShip = createSprite(200, height-300, 50, 50);
    spaceShip.addImage(spaceShipImg)
    spaceShip.scale = 0.5;
   
    spaceShip.debug = false;
    
    spaceShip.setCollider("rectangle",0,0,250,250);
    
    
    rayGroup = new Group();
    asteroidGroup = new Group();
  
  
}
function draw() {
  background(0); 
  drawSprites();
  createAsteroids();
  textSize(40);
  fill("white");
  text("Life:" + life, width-600, 50)
  text("Asteroids eliminated: " + points, width-800,100)

  if (gameState === "play") {

    if(!gameSound.isPlaying()){
    gameSound.play();
    } 
    end.visible = false;
  
 if(keyWentUp("space")){
  shoot()
 }

  if(keyDown("UP_ARROW")||touches.length>0){
    spaceShip.y = spaceShip.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  spaceShip.y = spaceShip.y+30
  }

  if(spaceShip.isTouching(asteroidGroup)){
    life -=1;
    asteroidGroup.destroyEach()
  }
  if(life === 0){
    gameState = "end"
    gameOverSound.play();
    gameSound.stop();
  }

//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  
  
  if(rayGroup.isTouching(asteroidGroup)){
    points += 1;
    rayGroup.destroyEach()
    asteroidGroup.destroyEach()
    explosionSound.play();
  }

//player goes back to original standing image once we stop pressing the space bar
 
   } else if(gameState === "end") {
    asteroidGroup.setVisibleEach(false);
    bg.visible = false;
    end.visible = true;
    spaceShip.visible = false;

    fill("white")
    text("GAME OVER ", width/2, height/2)
    
   }
  }
  function shoot(){
    ray=createSprite(spaceShip.x-130,spaceShip.y+90,10,10)
    ray.velocityX=10;
    ray.addImage(rayImg)
    ray.scale = 0.3    
    rayGroup.add(ray);
    raySound.play();
  
  }
  function createAsteroids(){
    if(frameCount % 100 ===0){
    var asteroid = createSprite(1500,height-300,10,40);
    asteroid.y = Math.round(random(15,1000));
    asteroid.velocityX = -25;
  
    var aleatorio = Math.round(random(1,3));
    switch(aleatorio){
      case 1: asteroid.addImage(asteroidImg1);
      asteroid.scale = 0.5;
      break;
      case 2: asteroid.addImage(asteroidImg2);
      asteroid.scale = 0.2;
      break;
      case 3: asteroid.addImage(asteroidImg3);
     
      break;
      default: break;
    }
    asteroid.lifetime = 500;
    asteroidGroup.add(asteroid);
    }
  }


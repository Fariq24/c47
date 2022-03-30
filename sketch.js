var bg,backgroundImg,platformImage,platformGroup;
var starimage,starssGroup;
var cometImage,cometsGroup;
var bheem,bheemImage;
var score = 0;
var gameState = "PLAY";

function preload() {
    backgroundImg = loadImage("images/bg.png");
    bheemImage = loadImage("images/bheem1.png");
    platformImage = loadImage("images/stone.png");
    starImage = loadImage("images/star.png");
    cometImage = ("images/comet.png");
    restartImage= loadImage("images/restart.png");
}

function setup() {
    createCanvas(1000,600);
    bg = createSprite(1000,600);
    bg.addImage(backgroundImg);
    bg.scale = 2;
    bg.velocityY=6;

    bheem = createSprite(200,505,20,50);
    bheem.addImage("running",bheemImage);
    bheem.scale = 0.5;
    bheem.setCollider("rectangle",100,0,200,400);
    bheem.debug = true;


    platformGroup = new Group();
    starsGroup = new Group();
    cometsGroup = new Group();

    restart = createSprite(500,300);
    restart.addImage(restartImage);
    restart.visible = false;

}

function draw() {
    if(gameState === "PLAY") {

        if(bg.y > 400){
            bg.y = 100;
        }

        if(keyDown("space")) {
            bheem.velocityY = -10;
        }

        if (keyDown("left")) {
            bheem.x = bheem.x - 5;
        }

            if (keyDown("right")) {
                bheem.x = bheem.x +5;
            }

            bheem.velocityY = bheem.velocityY + 0.5;
        }

        generatePlatforms();
        for (var i = 0; i<platformGroup.length;i++) {
            var temp = platformGroup.get(i);

            if(temp.isTouching(bheem)) {
                bheem.collide(temp);
            }
        }

        
        generateStars();
        for (var i = 0; i<(starsGroup).length;i++) {
            var temp = (starsGroup).get(i);
            if(temp.isTouching(bheem)) {
                temp.destroy();
                temp = null;
                score = score + 1;
            }
        }
        

        generateComets();
        for (var i = 0; i<(cometsGroup).length;i++) {
            var temp = (cometsGroup).get(i);
            if(temp.isTouching(bheem)) {
                temp.destroy();
                temp = null;
                score = score - 1;
            }
        }
        if(score<0 || bheem.y>1000) {
            gameState = "END";
        }

        if(gameState === "END") {
            bg.velocityY = 0;
            bheem.velocityY = 0;
            starsGroup.setVelocityYEach(0);
            cometsGroup.setVelocityYEach(0);
            cometsGroup.setVelocityYEach(0);
            platformGroup.setVelocityYEach(0);


            starsGroup.setLifetimeEach(-1);
            cometsGroup.setLifetimeEach(-1);
            platformGroup.setLifetimeEach(-1);

            starsGroup.destroyEach();
            cometsGroup.destroyEach();
            platformGroup.destroyEach();

            restart.visible= true;

            if(mousePressedOver(restart)){
                restartGame();
            }
        }
    

    drawSprites();
    textSize(20);
    fill("white");
    text("Stars Collected : + score,500,50");

}

function generateStars() {
    if (frameCount % 80 === 0) {
        var star = createSprite(1200,0,40,10);
        star.addAnimation("star",starImage);
        star.x = random(50,850);
        star.scale = 0.05;
        star.velocityY = 3;
        star.lifetime = 600;
        starsGroup.add(star);
        star.debug = true;
    }

}

function generateComets() {
    if (frameCount % 150 === 0) {
        var comet = createSprite(1200,90,10,40);
        comet.addAnimation("comet",cometImage);
        comet.x = random(50,850);
        comet.scale = 0.05;
        comet.velocityY = 3;
        comet.lifetime = 600;
        cometsGroup.add(comets);}

}


  function generatePlatforms() {
    if (frameCount % 60 === 0) {
        var brick = createSprite(1200,10,40,10);
        brick.x = random(50,850);
        brick.addImage(platformImage);
        brick.scale = 0.05;
        brick.velocityY = 3;
        brick.lifetime = 250;
        platformGroup.add(brick);}
    }

    function restartGame(){
        gameState = "PLAY";
        platformGroup.destroyEach();
        starssGroup.destroyEach();
        cometsGroup.destroyEach();
        score=o;
        bheem.y = 50;
        bg.velocityY-6;
        restart.visible = false;
    }
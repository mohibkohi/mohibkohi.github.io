var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;

}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

function SingingGirl(game, spritesheet) {
    this.animation = new Animation(spritesheet, 97, 130, 7, 0.20, 21, true, 1);
    this.x = 0;
    this.y = 70;
    this.speed = 40;
    this.game = game;
    this.ctx = game.ctx;
}

SingingGirl.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

SingingGirl.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 750) this.x = -130;
}


function walkingDude(game, spritesheet) {
    this.animation = new Animation(spritesheet, 130, 222, 5, 0.20, 5, true, .5);
    this.x = 750;
    this.y = 308;
    this.speed = 40;
    this.game = game;
    this.ctx = game.ctx;
}

walkingDude.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

walkingDude.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x -= this.game.clockTick * this.speed;
    if (this.x < 0) this.x += 130;
}

// inheritance 
function monsterBaby(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 9, 0.5, 54, true, 1);
    this.x = 320;
    this.y = 530;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    // Entity.call(this, game, 0, 250);
}

monsterBaby.prototype = new Entity();
monsterBaby.prototype.constructor = monsterBaby;

monsterBaby.prototype.update = function () {
}

monsterBaby.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Robot(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 9, 0.15, 54, true, 2);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 532, 442);
}

Robot.prototype = new Entity();
Robot.prototype.constructor = Robot;

Robot.prototype.update = function () {
    
}

Robot.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function jumpCat(game, spritesheet) {
    this.animation = new Animation(spritesheet, 256, 183, 4, 0.15, 4, true, .5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 100, 600);
}

jumpCat.prototype = new Entity();
jumpCat.prototype.constructor = Robot;

jumpCat.prototype.update = function () {
    
}

jumpCat.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


// inheritance 
function Bald(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 6, 0.15, 24, true, 1.5);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 5, 475);
}

Bald.prototype = new Entity();
Bald.prototype.constructor = Bald;

Bald.prototype.update = function () {
    
}

Bald.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



AM.queueDownload("./img/dead.png");
AM.queueDownload("./img/dancingBaby.png");
AM.queueDownload("./img/singingGirl.png");
AM.queueDownload("./img/sleepingBaby.png");
AM.queueDownload("./img/PlatformBackground.png");
AM.queueDownload("./img/walkingDude.png");
AM.queueDownload("./img/catJump.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    this.audio = new Sound();
    canvas.frameWidth = 1000;
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/PlatformBackground.png")));
    gameEngine.addEntity(new SingingGirl(gameEngine, AM.getAsset("./img/singingGirl.png")));
    gameEngine.addEntity(new walkingDude(gameEngine, AM.getAsset("./img/walkingDude.png")));
    gameEngine.addEntity(new monsterBaby(gameEngine, AM.getAsset("./img/sleepingBaby.png")));
    gameEngine.addEntity(new Robot(gameEngine, AM.getAsset("./img/dead.png")));
    gameEngine.addEntity(new Bald(gameEngine, AM.getAsset("./img/dancingBaby.png")));
    gameEngine.addEntity(new jumpCat(gameEngine, AM.getAsset("./img/catJump.png")));

    console.log("All Done!");
});
// whole-script strict mode syntax
'use strict';

/*------------------------------- Enemy ------------------------------------*/

// the Enemy constructor function object
var Enemy = function() {
    // give the instance a random initial x position on the game board
    this.x = Enemy.chooseX();
    // give the instance a random initial y position
    this.y = Enemy.chooseY();
    // give the instance a randomly generated speed value
    this.speed = Enemy.chooseSpeed();
    // give the instance its avatar
    this.sprite = 'images/enemy-bug.png';
};

// choose a random x position to set as the instance's initial position
Enemy.chooseX = function() {
    return (Math.random() * 600)-200;
};

// choose random y positions corresponding to the three rows on the gameboard
Enemy.chooseY = function() {
    var randomNumber = Math.random();

    if (0 <= randomNumber && randomNumber < 0.33) {
        return 65;
    }
    else if (0.33 <= randomNumber && randomNumber < 0.66) {
        return 145;
    }
    else if (0.66 <= randomNumber && randomNumber < 1) {
        return 225;
    }
};

// choose a random speed for the enemy instance
Enemy.chooseSpeed = function() {
    return (Math.floor(Math.random() * 200)) + 20;
};

// update the enemy's position on the gameboard
Enemy.prototype.update = function(dt) {
    /* move enemy and at x = 600, reset the instance to cross the
     * gameboard again, then give it another random y position and speed
     */
    if (this.x < 600) {
        this.x += 5 * this.speed * dt;
    }
    else {
        this.x = -100;
        this.y = Enemy.chooseY();
        this.speed = Enemy.chooseSpeed();
    }
    // check for collisions and if true make player go back to start
    if (this.x + 90 >= player.x && this.x <= player.x + 90 &&
    this.y + 65 >= player.y && this.y <= player.y + 65) {
        player.start();
    }
};

// draw the enemy on the screen, using the avatar and x y position
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*------------------------------- Player ------------------------------------*/

// the Player constructor function object
var Player = function() {
    // call the start function on the player
    this.start();
    // give the player its avatar
    this.sprite = 'images/char-boy.png';
};

// give the player a start position of center bottom on the gameboard
Player.prototype.start = function() {
    this.x = 202.5;
    this.y = 405;
    return this;
};

// define what the keys make the character do
Player.prototype.handleInput = function() {
    // make the player move one block at a time on the gameboard
    if (event.keyCode == 37 && this.x > 2.5) {
        this.x = this.x - 100;
    }
    if (event.keyCode == 38 && this.y > -10) {
        this.y = this.y - 83;
    }
    if (event.keyCode == 39 && this.x < 402.5) {
        this.x = this.x + 100;
    }
    if (event.keyCode == 40 && this.y < 405) {
        this.y = this.y + 83;
    }
};

// update the player's positions on the gameboard
Player.prototype.update = function() {
// when the player gets to the water, move it back to its start position
    if (this.y == -10) {
        this.start();
    }
};

// draw the character on the screen using its avatar and x y position
Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*--------------------------------- Instantiation --------------------------------------*/

// instantiate objects
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

/*--------------------------------- Event Listener --------------------------------------*/

// listens for key presses and sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // pass values to Player.prototype.handle()
    player.handleInput(allowedKeys[e.keyCode]);
});
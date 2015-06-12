/*------------------------------- Enemy ------------------------------------*/

// 1) the Enemy constructor function object
// 2) it creates object instances that delegate their failed property
// lookups to Enemy.prototype
var Enemy = function() {
    // keyword new results in:
    // this = Object.create(Enemy.prototype);

    // give the instance a random initial x position on the game board
    this.x = Enemy.chooseX();
    // give the instance a random initial y position
    this.y = Enemy.chooseY();
    // give the instance a randomly generated speed value
    this.speed = Enemy.chooseSpeed();
    // give the instance its avatar
    this.sprite = 'images/enemy-bug.png';

    // keyword new results in:
    // return this;
}

// 1) move these functions outside of the Enemy constructor function
// so that the interpreter only builds them once instead of each time
// an enemy object instance is created
// 2) encapsulate these functions as properties of Enemy in order to
// move them out of the global context

// choose a random x position to set as the instance's initial position
Enemy.chooseX = function() {
        var randomX = (Math.random * 600)-200;
        return randomX;
    }

// choose random y positions corresponding to the three rows where our enemy
// instances should roam on the gameboard
Enemy.chooseY = function() {
    var randomNumber = Math.random();

    if (0 <= randomNumber && randomNumber < .33) {
        return 65;
    }
    else if (.33 <= randomNumber && randomNumber < .66) {
        return 145;
    }
    else if (.66 <= randomNumber && randomNumber < 1) {
        return 225;
    }
}

// choose a random speed for the enemy instance
Enemy.chooseSpeed = function() {
    var randomSpeed = (Math.floor(Math.random() * 200)) + 20;
    return randomSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // move the instances across the game board
    if (this.x < 600) {
        this.x += 5 * this.speed * dt;
    }
    // at x = 600, reset the instances to cross the gameboard again
    // and choose another random y position for the instance
    else {
        this.x = -100;
        this.y = Enemy.chooseY();
    }
}

// Draw the enemy on the screen, using the avatar and x y position
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*------------------------------- Player ------------------------------------*/

// 1) the Player constructor function object
// 2) it creates a player object instance which delegates its
// failed lookups to the object in Player.prototype
var Player = function() {
    // give the character an initial position of
    // center bottom of the gameboard
    this.x = 202.5;
    this.y = 405;
    // give the character its avatar
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
// collisions and getting to the water
/*
    if (this.y = 100) {
        this.x = 202.5;
        this.y = 405;
    }
*/
}

// define what the keys make the character do
Player.prototype.handleInput = function() {
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
}

// draw the character on the screen using its avatar and x y position
Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*--------------------------------- Instantiation --------------------------------------*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

/*------------------------------- Event Listener ------------------------------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }

    // lower case because player is the variable used to name an instance of the Player class
    // 'this' refers to the player object
    // when you call the function as a property of Player,
    // 'this' refers to the Player function object which doesn't make sense
    // since you want the player object to have this functionality,
    // not the Player function object whose job it is to construct the player instances
    player.handleInput(allowedKeys[e.keyCode]);
});
// the Enemy constructor function object
// it creates object instances that delegate their failed property
// lookups to Enemy.prototype
var Enemy = function() {
    // keyword new results in:
    // this = Object.create(Enemy.prototype);

    // give the instance a random initial x position on the game board
    this.x = Enemy.chooseX();
    // give the instance a randomly generated speed value
    this.speed = Enemy.chooseSpeed();
    // give the instance its avatar
    this.sprite = 'images/enemy-bug.png';

    // keyword new results in:
    // return this;
}

// encapsulate these functions as properties of Enemy in order to
// move them out of the global context
Enemy.chooseX = function() {
        var randomX = (Math.random * 600)-200;
        return randomX;
    }

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

    if (this.x < 600) {
        this.x += 5 * this.speed * dt;
    }
    else {
        this.x = -100;
        this.y = Enemy.chooseY();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 202.5;
    this.y = 405;

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

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

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

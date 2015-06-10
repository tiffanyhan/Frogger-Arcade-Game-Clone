// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var chooseY = function() {
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

    var chooseX = function() {
        var randomNumber = Math.random();
        var randomX = (randomNumber * 600)-200;
        return randomX;
    }

    this.x = chooseX();
    this.y = chooseY();


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
        this.move = (this.x += 5) * dt;
    }
    else {
        this.x = -100;
        this.move = (this.x += 5) * dt;
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

    this.x = 200;
    this.y = 420;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    var stopPoint = this.x + 80;

    if (this.x < stopPoint) {
        this.move = this.x += 5;
    }
    else {
        this.move == this.x;
    }
}

Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.handleInput = function() {
    if (event.keyCode == 37) {
        alert('left was pressed');
    }

    if (event.keyCode == 38) {
        alert('up was pressed');
    }

    if (event.keyCode == 39) {

        Player.update.moveRight();
        // this.moveRight = this.x + 80;
    }

    if (event.keyCode == 40) {
        alert('down was pressed');
    }
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

    Player.handleInput(allowedKeys[e.keyCode]);

});

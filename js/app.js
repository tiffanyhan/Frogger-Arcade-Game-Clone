/*
WHY is this pattern even useful?

1) we want our functions to be outside of the main constructor function so that
they are only built once instead of many times
2) we want to encapsulate those function as a property of the main constructor
function so that they're not taking up unncecessary space in the global context
3) we want to store all these functions in one object so that our object
instances can easily delegate to that one object
4) we want to delegate so that we only write code in one place instead of two,
or because we want to save ourselves the expensive step of having to copy
all the methods over

SO

1) the language gives us the one place where we store all the methods and the
object is named 'prototype' (addresses #3)
2) the language makes prototype a property of the main constructor function
(addresses #2)
3) the keyword 'new' automatically creates an object that delegates to the
constructor function's prototype object (addresses #4)

CONCLUSION:  the ONLY reason the methods are put on the prototype object
instead of the object instance itself is because we don't want to build
the methods over and over again every time we create a new instance.  all the
other concerns are so that we can make the linkage between the outside
functions and the main constructor function more convenient and efficient.

*/

/*------------------------------- Enemy ------------------------------------*/

// 1) the Enemy constructor function object
// 2) it creates object instances that delegate their failed property
// lookups to Enemy.prototype
// 3) its purpose to the create an object and then give that object the
// properties it needs in order to be an enemy
// 4) it specifies how each object instance is different from one another
// 5) each function call results in new values
var Enemy = function() {
    // keyword new results in:
    // this = Object.create(Enemy.prototype);
    // (the interpreter assigns 'this' for us)
    // this line is the only reason why enemy object instances delegate
    // to Enemy.prototype

    // 1) here you're directly giving each enemy INSTANCE OBJECT a property
    // 2) these are the ONLY properties that each enemy instance object
    // has directly.  it has all other properties through prototype delegation

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
};

// 1) move these functions outside of the Enemy constructor function
// so that the interpreter only builds them once instead of each time
// an enemy object instance is created
// 2) encapsulate these functions as properties of Enemy in order to
// move them out of the global context

// ** these functions don't take the enemy object instances as inputs
// (in fact they don't take any inputs; they only return things), so
// they don't use the keyword this and they don't need to be accessed as a
// property on the enemy object instance.  thus they don't need to be
// stored in the object at Enemy.prototype.  also, these functions don't
// make sense as properties of enemy object instances.  they're merely
// functions that give us a value to be stored in a property.

// these functions are only built once even though they will return
// values each time they are called

// choose a random x position to set as the instance's initial position
Enemy.chooseX = function() {
    var randomX = (Math.random() * 600)-200;
    return randomX;
};

// choose random y positions corresponding to the three rows where our enemy
// instances should roam on the gameboard
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
    var randomSpeed = (Math.floor(Math.random() * 200)) + 20;
    return randomSpeed;
};

// 1) these functions in the object stored at Enemy.prototype
// become properties of enemy object instances by way of
// prototype delegation
// 2) these functions DO SOMETHING with the properties directly
// given to enemy object instances within the main constructor function
// 3) these methods can be defined and updated in only one place and
// they'll automatically be available on the object instances, instead of
// having to define and update them in two places
// 4) the object at Enemy.prototype is the place where all this is possible
// 5) Enemy.prototype is where the properties that make all the object instances
// similar to one another are stored, since all enemy object instances
// delegate to Enemy.prototype

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // YOU must assign 'this' at call time

    // move the instances across the game board
    if (this.x < 600) {
        this.x += 5 * this.speed * dt;
    }
    // at x = 600, reset the instances to cross the gameboard again,
    // choose another random y position for the instance,
    // and choose another random speed for the enemy instance
    else {
        this.x = -100;
        this.y = Enemy.chooseY();
        this.speed = Enemy.chooseSpeed();
    }

    if (this.x + 90 >= player.x && this.x <= player.x + 90 &&
    this.y + 65 >= player.y && this.y <= player.y + 65) {
        player.start();
    }
};

// Draw the enemy on the screen, using the avatar and x y position
Enemy.prototype.render = function() {
    // YOU must assign 'this' at call time
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*------------------------------- Player ------------------------------------*/

// 1) the Player constructor function object
// 2) it creates a player object instance which delegates its
// failed lookups to the object in Player.prototype
// 3) its purpose is to create an object and then give that object the
// properties it needs in order to be a player
var Player = function() {
    // keyword new results in:
    // this = Object.create(Player.prototype);
    // (the interpreter assigns 'this' for us)
    // this line is the only reason why the player instance object delegates
    // to Player.prototype

    // these are the only properties that player has directly; all other
    // properties are found through prototype delegation

    // give the character an initial position of
    // center bottom of the gameboard
    this.start();
    // give the character its avatar
    this.sprite = 'images/char-boy.png';

    // keyword new results in:
    // return this;
};

Player.prototype.start = function() {
    this.x = 202.5;
    this.y = 405;
    return this;
};

// these functions appear to be available as properties of the enemy
// object instances even though the enemy object instances are really
// getting them from Player.prototype

// define what the keys make the character do
Player.prototype.handleInput = function() {
    // YOU must assign 'this' at call time
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

Player.prototype.update = function() {
// collisions and getting to the water

// YOU must assign 'this' at call time
    if (this.y == -10) {
        this.start();
    }
};

// draw the character on the screen using its avatar and x y position
Player.prototype.render = function(x,y) {
    // YOU must assign 'this' at call time
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*--------------------------------- Instantiation --------------------------------------*/

// Now instantiate your objects.
// new Enemy() returns the enemy object with all the properties we directly gave it
// new Player() returns the player object with the properties we directly gave to it as well
// (ONLY gives us the object returned from the main constructor function)
// these variables are in the global scope and can be accessed from engine.js
// calls to the other functions will be made in engine.js

// you should only assign variables to global in a very intentional way
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

/*--------------------------------- Event Listener --------------------------------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // lower case because player is the variable used to name an instance of the Player class
    // 'this' refers to the player object
    // when you call the function as a property of Player,
    // 'this' refers to the Player function object which doesn't make sense
    // since you want the player object to have this functionality,
    // not the Player function object whose job it is to construct the player instances
    player.handleInput(allowedKeys[e.keyCode]);
    // player doesn't have a handleInput method, but it finds it through prototype delegation
    // to Player.prototype
});

/*-------------------------------- more on the last function call -----------------------------------*/

    // vs player.prototype.handleInput();
    // ** returns an error because the player object instance does not have its own prototype object
    // ** the property lookup would search for prototype.handleInput on the object instance
    // ** then when it doesn't find it, it will search for prototype.handleInput on Player.prototype!
    // ** but this search would fail because prototype.handleInput is NOT on Player.project, only
    // ** the property .handleInput IS

    // vs Player.prototype.handleInput();
    // ** this is a function but it's NOT being called on the player object instance
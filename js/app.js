// Enemies our player must avoid
//Chnaged the given below ES5 code to ES6
class Enemy {
  constructor(x, y, enemySpeed) {
    this.sprite = "images/enemy-bug.png";
    this.x = x + Math.random() * y;
    this.y = y;
    this.speed = enemySpeed;
    this.horizontal = 101;
    this.vertical = 85;
    this.loc = this.horizontal * 5;
  }
}
//var Enemy = function(x, y) {
//   // Variables applied to each of our instances go here,
//   // we've provided one for you to get started
//   this.sprite = "images/enemy-bug.png";
//   this.x = x;
//   this.y = y;
//   // The image/sprite for our enemies, this uses
//   // a helper we've provided to easily load images
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x < this.loc) {
    this.x += this.speed * dt;
  } else {
    this.x = -this.horizontal;
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers. - Done.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Array of all the player characters
const characters = [
  "images/char-boy.png",
  "images/char-cat-girl.png",
  "images/char-horn-girl.png",
  "images/char-pink-girl.png",
  "images/char-princess-girl.png"
];
//Randomizing the character on each refresh
let randomPos = characters[Math.floor(Math.random() * characters.length)];
class Player {
  constructor(randomPos) {
    this.sprite = randomPos;
    this.horizontal = 101;
    this.vertical = 85;
    this.x = this.horizontal * 2;
    this.y = this.vertical * 4.6;
  }
}
Player.prototype.update = function(dt) {
  // Collision detection
  for (let enemy of allEnemies) {
    let changedX = this.x - enemy.x;
    let changedY = this.y - enemy.y;
    let distance = Math.sqrt(changedX * changedX + changedY * changedY);
    if (distance < 60) {
      this.y = this.vertical * 4.6;
      this.x = this.horizontal * 2;
    }
  }
  // Winning Message
  if (this.y < 10) {
    $("#exampleModal").modal("show");
    this.y = this.vertical * 4.6;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
  new Enemy(-200, 65, 50),
  new Enemy(-150, 145, 300),
  new Enemy(-100 * 2.5, 230, 350)
];
// Place the player object in a variable called player
let player = new Player(randomPos);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
    //character change on shift press - future feature
    // 16: "shift"
  };
  Player.prototype.handleInput = function(dt) {
    switch (dt) {
      case "up":
        if (this.y > 0) {
          this.y -= this.vertical;
        }
        break;
      case "down":
        if (this.y < this.vertical * 4) {
          this.y += this.vertical;
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.horizontal;
        }
        break;
      case "right":
        if (this.x < this.horizontal * 4) {
          this.x += this.horizontal;
        }
        break;
    }
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

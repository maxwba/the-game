// Global variables
let context, controller, player, loop, controller2, player2;
let backgroundImg = new Image();
let playerImg = new Image();
let player2Img = new Image();
let avatarPlayerImg = new Image();
let avatarPlayer2Img = new Image();
let powerImg = new Image();
let frezzaWins = new Image();
let gokuWins = new Image();
let energyStoreGoku = [];
let energyStoreFrezza = [];
let frames = 0;
let frezzaAtack = false;
let gokuAttack = false;
let myReq;

// Screen sizes
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 500;
context.canvas.width = 1000;
let areaLeftX = 190;
let areaRightX = 700;
let areaDownY = 335;

// Player 1 object
player = {
  height: 40,
  jumping: true,
  width: 40,
  health: 100,
  x: 190,
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

// Player 2 object
player2 = {
  height: 45,
  jumping: true,
  width: 45,
  health: 100,
  x: 700,
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

// Power class
class EnergyBall {
  constructor(x, y, p2) {
    this.p2 = p2;
    this.y = y + 10;
    if (x < p2) {
      this.x = x + 30;
      this.side = "left";
    } else {
      this.x = x - 30;
      this.side = "right";
    }
  }

  move() {
    if (this.side === "left") {
      this.x += 7.5;
    } else {
      this.x -= 7.5;
    }
  }

  draw() {
    powerImg.src = "img/powerBall.png";
    context.drawImage(powerImg, this.x, this.y, 25, 25);
  }

  update() {
    this.p2 = player.x - 40;
    this.y = player.y + 10;
  }
}

//Controler P1
controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    let key_state = event.type === "keydown";

    switch (event.keyCode) {
      case 65: // left key
        controller.left = key_state;
        break;
      case 87: // up key
        controller.up = key_state;
        break;
      case 68: // right key
        controller.right = key_state;
        break;
      case 82: //R key
        controller.power = key_state;
    }
  }
};

//Controler P2
controller2 = {
  left: false,
  right: false,
  up: false,
  power: false,
  keyListener: function(event) {
    let key_state = event.type == "keydown";

    switch (event.keyCode) {
      case 37: // left key
        controller2.left = key_state;
        break;
      case 38: // up key
        controller2.up = key_state;
        break;
      case 39: // right key
        controller2.right = key_state;
        break;
      case 188: //? key
        controller2.power = key_state;
    }
  }
};

loop = function() {
  playerControl();

  player2Control();

  map();

  drawPlayer1();

  drawPlayer2();

  //Player 1 power
  if (controller.power) {
    if (frames % 30 === 0) {
      energyStoreGoku.push(new EnergyBall(player.x, player.y, player2.x));
      gokuAttack = true;
    }
  }

  // Player 2 power
  if (controller2.power) {
    if (frames % 30 === 0) {
      energyStoreFrezza.push(new EnergyBall(player2.x, player2.y, player.x));
      frezzaAtack = true;
    }
  }

  energyStoreGoku.forEach((element, index) => {
    element.draw();
    if (element.x > areaLeftX && element.x < areaRightX + 91) {
      element.move();
    } else {
      energyStoreGoku.splice(index, 1);
    }

    if (
      gokuAttack &&
      element.x > player2.x &&
      element.x < player2.x + player2.width &&
      element.y > player2.y &&
      element.y < player2.y + player2.height
    ) {
      player2.health -= 10;
      energyStoreGoku.splice(index, 1);
      if (energyStoreGoku.length == 0) {
        gokuAttack = false;
      }
    }
  });

  // Freeza attack
  energyStoreFrezza.forEach((element, index) => {
    element.draw();
    if (element.x > areaLeftX && element.x < areaRightX + 91) {
      element.move();
    } else {
      energyStoreFrezza.splice(index, 1);
    }

    if (
      frezzaAtack &&
      element.x > player.x &&
      element.x < player.x + player.width &&
      element.y > player.y &&
      element.y < player.y + player.height
    ) {
      player.health -= 10;
      energyStoreFrezza.splice(index, 1);
      if (energyStoreFrezza.length == 0) {
        frezzaAtack = false;
      }
    }
  });

  frames += 1;

  // call update when the browser is ready to draw again
  myReq = requestAnimationFrame(loop);
  gameOver();
};

//Loop player 1 control
let playerControl = () => {
  if (controller.up && player.jumping == false) {
    player.y_velocity -= 30;
    player.jumping = true;
  }

  if (controller.left) {
    player.x_velocity -= 0.5;
  }

  if (controller.right) {
    player.x_velocity += 0.5;
  }

  player.y_velocity += 1.5; // gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9; // friction
  player.y_velocity *= 0.9; // friction

  // if player 1 is falling below floor line
  if (player.y > areaDownY) {
    player.jumping = false;
    player.y = areaDownY;
    player.y_velocity = 0;
  }

  // if player 1 touch the left of the screen
  if (player.x < areaLeftX) {
    player.x = areaLeftX;
  } else if (player.x > areaRightX) {
    // if player touch the right screen
    player.x = areaRightX;
  }
  // Player 1 colison
  //   if (Math.floor(player.x) < Math.floor(player2.x + player2.width)&& player.y === player2.y) {
  //       player.x += player2.width * 0.30
  //       player2.x -= player.width * 0.30
  //   }
};

//Loop player 2 control
let player2Control = () => {
  if (controller2.up && player2.jumping == false) {
    player2.y_velocity -= 30;
    player2.jumping = true;
  }

  if (controller2.left) {
    player2.x_velocity -= 0.5;
  }

  if (controller2.right) {
    player2.x_velocity += 0.5;
  }

  player2.y_velocity += 1.5; // gravity
  player2.x += player2.x_velocity;
  player2.y += player2.y_velocity;
  player2.x_velocity *= 0.9; // friction
  player2.y_velocity *= 0.9; // friction

  // if player is falling below floor line
  if (player2.y > areaDownY) {
    player2.jumping = false;
    player2.y = areaDownY;
    player2.y_velocity = 0;
  }

  // if player 2 touch the left of the screen
  if (player2.x < areaLeftX) {
    player2.x = areaLeftX;
  } else if (player2.x > areaRightX) {
    // if player 2 touch the right screen
    player2.x = areaRightX;
  }
};

//Map
let map = () => {
  backgroundImg.src = "img/background.png";
  context.drawImage(backgroundImg, 0, 0, 1000, 500);
  context.font = "15px Lucida Console";
  context.fillStyle = "black";
  context.fillText(`Goku health: ${player.health}`, 195, 110);
  context.fillText(`Player 2 health: ${player2.health}`, 670, 110);
  avatarPlayerImg.src = "img/Goku_Avatar.png";
  context.drawImage(avatarPlayerImg, 220, 120, 50, 50);
  avatarPlayer2Img.src = "img/Frezza_Avatar.png";
  context.drawImage(avatarPlayer2Img, 710, 120, 50, 50);
};

//Player 1
let drawPlayer1 = () => {
  if (player.x < player2.x) {
    playerImg.src = "img/Goku.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  } else {
    playerImg.src = "img/Goku_revert.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }

  if (controller.power && player.x < player2.x) {
    playerImg.src = "img/Goku_power-right.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }

  if (controller.power && player.x > player2.x) {
    playerImg.src = "img/Goku_power-left.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }

  if (controller.right && player.x < player2.x) {
    playerImg.src = "img/Goku_right.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }

  if (controller.left && player.x < player2.x) {
    playerImg.src = "img/Goku_left.png";
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }
};

//Player 2
let drawPlayer2 = () => {
  if (player2.x > player.x) {
    player2Img.src = "img/Frezza.png";
    context.drawImage(
      player2Img,
      player2.x,
      player2.y,
      player2.width,
      player2.height
    );
  } else {
    player2Img.src = "img/Frezza_reverse.png";
    context.drawImage(
      player2Img,
      player2.x,
      player2.y,
      player2.width,
      player2.height
    );
  }
};

let gameOver = () => {
  if (player.health === 0) {
    frezzaWins.src = "img/FWins.jpg";
    context.drawImage(frezzaWins, 185, 90, 635, 325);
    // context.clearRect(185, 90, 635, 325);
    if (frames % 40 === 0) {
      cancelAnimationFrame(myReq);
    }
  } else if (player2.health === 0) {
    context.clearRect(185, 90, 635, 325);
    gokuWins.src = "img/GWins.jpg";
    context.drawImage(gokuWins, 185, 90, 635, 325);
    if (frames % 40 === 0) {
      cancelAnimationFrame(myReq);
    }
  }
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop);

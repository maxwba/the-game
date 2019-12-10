// Global varibles
let context, controller, player, loop, controller2, player2;
let backgroundImg = new Image();
let playerImg = new Image();
let player2Img = new Image();
let avatarPlayerImg = new Image();
let avatarPlayer2Img = new Image();

// Screen sizes
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 500;
context.canvas.width = 1000;
let areaLeftX = 190;
let areaRightX = 700;
let areaDownY = 335;

//Players
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

//Controler P1
controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    let key_state = event.type == "keydown" ? true : false;

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
      case 82: //space key
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
    let key_state = event.type == "keydown" ? true : false;

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
    }
  }
};

loop = function() {
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

  //   // Player 1 colison
  //   if (Math.floor(player.x) < Math.floor(player2.x + player2.width)&& player.y === player2.y) {
  //       player.x += player2.width * 0.30
  //       player2.x -= player.width * 0.30
  //   }

  //P2
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

  //Map
  backgroundImg.src = "../img/background.png";
  context.drawImage(backgroundImg, 0, 0, 1000, 500);
  context.font = "15px Lucida Console";
  context.fillStyle = "black";
  context.fillText(`Goku health: ${player.health}`, 195, 110);
  context.fillText(`Player 2 health: ${player2.health}`, 670, 110);
  avatarPlayerImg.src = "../img/Goku_Avatar.png";
  context.drawImage(avatarPlayerImg, 220, 120, 50, 50);
  avatarPlayer2Img.src = "../img/Frezza_Avatar.png";
  context.drawImage(avatarPlayer2Img, 710, 120, 50, 50);

  //Player 1 power
  if (controller.power) {
    // Power position player
    let powerX = player.x + 40;
    let powerY = player.y + 10;
    context.fillStyle = "blue";
    context.fillRect(powerX, powerY, 20, 20);
    for (let i = 0; i < areaRightX - powerX; i++) {
      // context.clearRect(0, 0, 1000, 500);
      context.clearRect(powerX, powerY, 20, 20);
      context.fillRect(powerX, powerY, 20, 20);
      powerX += 1;
    }
  }

  //Player 1
  playerImg.src = "../img/Goku.png";
  context.drawImage(playerImg, player.x, player.y, player.width, player.height);

  //Player 2
  player2Img.src = "../img/Frezza.png";
  context.drawImage(
    player2Img,
    player2.x,
    player2.y,
    player2.width,
    player2.height
  );

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop);

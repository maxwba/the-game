let context, controller, player, loop, controller2, player2;
let backgroundImg = new Image();

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;

//Players
player = {
  height: 32,
  jumping: true,
  width: 32,
  health: 100,
  x: 190, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

player2 = {
  height: 32,
  jumping: true,
  width: 32,
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
        controller2.left = key_state;
        break;
      case 87: // up key
        controller2.up = key_state;
        break;
      case 68: // right key
        controller2.right = key_state;
        break;
    }
  }
};

//Controler P2
controller2 = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    let key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    }
  }
};

loop = function() {
  if (controller.up && player.jumping == false) {
    player.y_velocity -= 45;
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
  if (player.y > 350 - 16 - 32) {
    player.jumping = false;
    player.y = 390 - 16 - 32;
    player.y_velocity = 0;
  }

  // if player 1 touch the left of the screen
  if (player.x < 190) {
    player.x = 190;
  } else if (player.x > 700) {
    // if player touch the right screen
    player.x = 700;
  }

  //   // Player 1 colison
  //   if (Math.floor(player.x) < Math.floor(player2.x + player2.width)&& player.y === player2.y) {
  //       player.x += player2.width * 0.30
  //       player2.x -= player.width * 0.30
  //   }

  //P2
  if (controller2.up && player2.jumping == false) {
    player2.y_velocity -= 45;
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
  if (player2.y > 350 - 16 - 32) {
    player2.jumping = false;
    player2.y = 390 - 16 - 32;
    player2.y_velocity = 0;
  }

  // if player 2 touch the left of the screen
  if (player2.x < 190) {
    player2.x = 190;
  } else if (player2.x > 700) {
    // if player 2 touch the right screen
    player2.x = 700;
  }

  //Map
//   context.fillStyle = "#202020";
  backgroundImg.src = "../img/background.jpeg"
  context.drawImage(backgroundImg, 0, 0,1000,500);
  
//   context.fillRect(0, 0, 1000, 500); // x, y, width, height
  context.font = "25px Lucida Console";
  context.fillStyle = "black";
  context.fillText(`Player 1 health: ${player.health}`, 10, 50);
  context.fillText(`Player 2 health: ${player2.health}`, 750, 50);


  //Player 1
  context.fillStyle = "#ff0000"; // Player 1
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();

  //Player 2
  context.fillStyle = "yellow";
  context.beginPath();
  context.rect(player2.x, player2.y, player2.width, player2.height);
  context.fill();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop);

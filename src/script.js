let context, controller, player, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;


//Players
player = {
  height: 32,
  jumping: true,
  width: 32,
  x: 10, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

controller = {
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
    player.y_velocity -= 60;
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

  // if player is falling below floor line
  if (player.y > 460 - 16 - 32) {
    player.jumping = false;
    player.y = 460 - 16 - 32;
    player.y_velocity = 0;
  }

  // if player 1 touch the left of the screen
  if (player.x < 2) {
    player.x = 0;
  } else if (player.x > 950) {
    // if player touch the right screen
    player.x = 950;
  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 1000, 500); // x, y, width, height
  context.fillStyle = "#ff0000"; // hex for red
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 450);
  context.lineTo(1000, 450);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

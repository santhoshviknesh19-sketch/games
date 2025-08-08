const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();

let dx = 0;
let dy = 0;
let gameOver = false;
let gameStarted = false;

function gameLoop() {
  if (gameOver) {
    drawEverything();
    ctx.fillStyle = "#f00";
    ctx.font = "30px sans-serif";
    ctx.fillText("Game Over!", 110, 200);
    return;
  }

  if (!gameStarted) {
    drawEverything();
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.fillText("Press arrow keys to start", 80, 200);
    return;
  }

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver = true;
  }

  // Self collision
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }

  snake.unshift(head); // move head

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = getRandomFoodPosition();
  } else {
    snake.pop(); // remove tail if no food eaten
  }

  drawEverything();
}

function drawEverything() {
  // Background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Snake
  ctx.fillStyle = "#0f0";
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  }

  // Food
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function changeDirection(e) {
  const goingUp = dy === -1;
  const goingDown = dy === 1;
  const goingLeft = dx === -1;
  const goingRight = dx === 1;

  switch (e.key) {
    case "ArrowUp":
      if (!goingDown) {
        dx = 0;
        dy = -1;
        gameStarted = true;
      }
      break;
    case "ArrowDown":
      if (!goingUp) {
        dx = 0;
        dy = 1;
        gameStarted = true;
      }
      break;
    case "ArrowLeft":
      if (!goingRight) {
        dx = -1;
        dy = 0;
        gameStarted = true;
      }
      break;
    case "ArrowRight":
      if (!goingLeft) {
        dx = 1;
        dy = 0;
        gameStarted = true;
      }
      break;
  }
}

function getRandomFoodPosition() {
  let position;
  while (true) {
    position = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };

    // Ensure food doesn't spawn on the snake
    const conflict = snake.some(part => part.x === position.x && part.y === position.y);
    if (!conflict) break;
  }
  return position;
}

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100);

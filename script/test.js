

export const createSnake = () => {

  // let scoreBlock;
  // let score = 0;

  const config = {
    step: 0,
    maxStep: 6,
    sizeCell: 16,
    sizeBerry: 16 / 4
  }

  const snake = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3
  }

  let berry = {
    x: 0,
    y: 0
  }


  let canvasSnake = document.querySelector("#snake-canvas");
  let contextSnake = canvasSnake.getContext("2d");
  // scoreBlock = document.querySelector(".game-score .score-count");
  // drawScore();

  function gameLoop() {

    requestAnimationFrame(gameLoop);
    if (++config.step < config.maxStep) {
      return;
    }
    config.step = 0;

    contextSnake.clearRect(0, 0, canvasSnake.width, canvasSnake.height);

    drawBerry();
    drawSnake();
  }
  requestAnimationFrame(gameLoop);

  function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    // todo бордер
    snake.tails.unshift({ x: snake.x, y: snake.y });

    if (snake.tails.length > snake.maxTails) {
      snake.tails.pop();
    }

    snake.tails.forEach(function (el, index) {
      if (index == 0) {
        contextSnake.fillStyle = "#FA0556";
      } else {
        contextSnake.fillStyle = "#A00034";
      }
      contextSnake.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

      if (el.x === berry.x && el.y === berry.y) {
        snake.maxTails++;
        // incScore();
        randomPositionBerry();
      }

      for (let i = index + 1; i < snake.tails.length; i++) {

        if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
          refreshGame();
        }

      }

    });
  }

  function collisionBorder() {
    if (snake.x < 0) {
      snake.x = canvasSnake.width - config.sizeCell;
    } else if (snake.x >= canvasSnake.width) {
      snake.x = 0;
    }

    if (snake.y < 0) {
      snake.y = canvasSnake.height - config.sizeCell;
    } else if (snake.y >= canvasSnake.height) {
      snake.y = 0;
    }
  }
  function refreshGame() {
    // score = 0;
    // drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();
  }

  function drawBerry() {
    contextSnake.beginPath();
    contextSnake.fillStyle = "#A00034";
    contextSnake.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
    contextSnake.fill();
  }

  function randomPositionBerry() {
    berry.x = getRandomInt(0, canvasSnake.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomInt(0, canvasSnake.height / config.sizeCell) * config.sizeCell;
  }

  // function incScore() {
  //   score++;
  //   drawScore();
  // }

  // function drawScore() {
  //   scoreBlock.innerHTML = score;
  // }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  document.addEventListener("keydown", function (e) {
    if (e.code == "ArrowUp") {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
    } else if (e.code == "ArrowLeft") {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
    } else if (e.code == "ArrowDown") {
      snake.dy = config.sizeCell;
      snake.dx = 0;
    } else if (e.code == "ArrowRight") {
      snake.dx = config.sizeCell;
      snake.dy = 0;
    }
  });
}

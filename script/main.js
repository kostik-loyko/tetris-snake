import { colors, container, gameOver, gamePause, tetraminoItems } from './constants.js'
import { createStartMenu } from './startMenu.js'
import { gameContent } from './constants.js'
import { isValidPos, moveOnClickLeft, moveOnClickRight, rapidFallOnDawn, removeElement, removeOverlay, rotateOnClickBackspace, showNextTetromino, showOverlay, shuffle } from './utils.js'
import { createSnake } from './test.js'

const app = (difficult) => {
  container.innerHTML = '';
  container.innerHTML = gameContent;

  const canvasTetris = document.getElementById('game-tetris');
  const contextTetris = canvasTetris.getContext('2d');
  const startBtn = document.querySelector('.start');
  const pauseBtn = document.querySelector('.pause');
  const restartBtn = document.querySelector('.restart');
  const scoreView = document.querySelector('.score');
  const squareSize = 32;
  let tetrminoOrder = [];
  let playArea = [];

  for (let row = -2; row < 20; row++) {
    playArea[row] = [];
    for (let col = 0; col < 10; col++) {
      playArea[row][col] = 0;
    }
  }

  let count = 0;
  let tetramino = createTetramino();
  let score = 0;
  let isGameOver = false;
  let isBlockKye = false;
  let requestAnimationId = null;

  const config = {
    step: 0,
    maxStep: 30,
    sizeCell: 32,
    sizeBerry: 32 / 4
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
    x: 288,
    y: 160
  }

  let canvasSnake = document.querySelector("#snake-canvas");
  let contextSnake = canvasSnake.getContext("2d");
  // scoreBlock = document.querySelector(".game-score .score-count");
  // drawScore();

  // createSnake();

  const showGameOver = () => {
    cancelAnimationFrame(requestAnimationId);
    isGameOver = true;
    container.insertAdjacentHTML('beforeend', gameOver);
    showOverlay();
    const newGameBtns = document.querySelectorAll('.game-over__new-game');

    newGameBtns.forEach(newGameBtn => {
      newGameBtn.addEventListener('click', () => {
        createStartMenu(app);
        removeOverlay();
        // window.location.reload();
      });
    });
  }
  const showPause = () => {
    container.insertAdjacentHTML('beforeend', gamePause);
    showOverlay();
    const continueBtns = document.querySelectorAll('.game-pause__continue');

    continueBtns.forEach(continueBtn => {
      continueBtn.addEventListener('click', () => {
        requestAnimationId = requestAnimationFrame(game);
        isBlockKye = false;
        startBtn.disabled = true;
        removeElement('.game-pause');
        removeOverlay();
      });
    });
  }

  function createTetramino() {
    if (tetrminoOrder.length === 0) {
      tetrminoOrder = ['L', 'J', 'S', 'Z', 'T', 'O', 'I'];
      shuffle(tetrminoOrder);
    }

    const name = tetrminoOrder.pop();
    const matrix = tetraminoItems[name];
    const col = playArea[0].length / 2 - Math.ceil(matrix[0].length / 2);
    const row = name === 'I' ? -1 : -2;

    return {
      name,
      matrix,
      col,
      row
    }
  }

  const placeTetramino = () => {
    for (let row = 0; row < tetramino.matrix.length; row++) {
      for (let col = 0; col < tetramino.matrix[row].length; col++) {
        if (tetramino.matrix[row][col]) {
          if (tetramino.row + row < 0) {
            return showGameOver();
          }
          playArea[tetramino.row + row][tetramino.col + col] = tetramino.name;
        }
      }
    }

    for (let row = playArea.length - 1; row > 0;) {
      if (playArea[row].every(cell => !!cell)) {
        for (let r = row; r >= 0; r--) {
          for (let col = 0; col < playArea[r].length; col++) {
            playArea[r][col] = playArea[r - 1][col]
          }
        }
        snake.maxTails++;
        scoreView.innerHTML = score += 5;
      } else {
        row--
      }
    }

    tetramino = createTetramino();
  }

  const game = () => {
    showNextTetromino(tetrminoOrder[tetrminoOrder.length - 1]);
    requestAnimationId = requestAnimationFrame(game);
    contextTetris.clearRect(0, 0, canvasTetris.clientWidth, canvasTetris.height);

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (playArea[row][col]) {
          const name = playArea[row][col];
          contextTetris.fillStyle = colors[name];
          contextTetris.fillRect(col * squareSize, row * squareSize, squareSize - 1, squareSize - 1);
        }
      }
    }

    if (tetramino) {
      if (count++ > difficult) {
        tetramino.row++;
        count = 0;
      }

      if (!isValidPos(tetramino.matrix, tetramino.row, tetramino.col, playArea)) {
        tetramino.row--;
        placeTetramino();
      }

      contextTetris.fillStyle = colors[tetramino.name];

      for (let row = 0; row < tetramino.matrix.length; row++) {
        for (let col = 0; col < tetramino.matrix[row].length; col++) {
          if (tetramino.matrix[row][col]) {
            contextTetris.fillRect((tetramino.col + col) * squareSize, (tetramino.row + row) * squareSize, squareSize - 1, squareSize - 1);
          }
        }
      }
    }
    //snake
    if (++config.step < config.maxStep) {
      return;
    }
    config.step = 0;
    contextSnake.clearRect(0, 0, canvasSnake.width, canvasSnake.height);
    drawBerry();
    drawSnake();
  }

  function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    // collisionBorder();

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

      if (el.x === berry.x && el.y === berry.y && snake.tails.length > 3) {
        snake.tails.shift({ x: snake.x, y: snake.y });
        snake.maxTails--;

        // incScore();
        randomPositionBerry();
      }

      for (let i = index + 1; i < snake.tails.length; i++) {

        if (el.x == snake.tails[i].x && el.y == snake.tails[i].y || snake.x < 0 || snake.x >= canvasSnake.width || snake.y < 0 || snake.y >= canvasSnake.height) {
          // refreshGame();
          return showGameOver();
        }

      }

    });
  }

  // function collisionBorder() {
  //   if () {
  //     snake.x = canvasSnake.width - config.sizeCell;
  //   } else if () {
  //     snake.x = 0;
  //   }

  //   if () {
  //     snake.y = canvasSnake.height - config.sizeCell;
  //   } else if () {
  //     snake.y = 0;
  //   }
  // }


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
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  document.addEventListener('keydown', (e) => {
    if (isGameOver) {
      return
    }
    if (isBlockKye) {
      return
    }
    if (e.code == 'KeyS') {
      rapidFallOnDawn(tetramino, playArea, placeTetramino);
    }
    if (e.code == 'Space') {
      rotateOnClickBackspace(tetramino, playArea);
    }
    if (e.code == 'KeyA') {
      moveOnClickLeft(tetramino, playArea);
    }
    if (e.code == 'KeyD') {
      moveOnClickRight(tetramino, playArea);
    }
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

  startBtn.addEventListener('click', () => {
    requestAnimationId = requestAnimationFrame(game);
    startBtn.disabled = true;
  });
  pauseBtn.addEventListener('click', () => {
    cancelAnimationFrame(requestAnimationId);
    isBlockKye = true;
    showPause();
    startBtn.disabled = false;
  });
  restartBtn.addEventListener('click', () => {
    cancelAnimationFrame(requestAnimationId);
    createStartMenu(app);
  });
}

createStartMenu(app);
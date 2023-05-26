import { colors, container, gameOver, gamePause, tetraminoItems } from './constants.js'
import { createStartMenu } from './startMenu.js'
import { gameContent } from './constants.js'
import { isValidPos, moveOnClickLeft, moveOnClickRight, rapidFallOnDawn, removeElement, removeOverlay, rotateOnClickBackspace, showNextTetromino, showOverlay, shuffle } from './utils.js'

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

  const showGameOver = () => {
    cancelAnimationFrame(requestAnimationId);
    isGameOver = true;
    container.insertAdjacentHTML('beforeend', gameOver);
    showOverlay();
    const newGameBtn = document.querySelector('.game-over__new-game');

    newGameBtn.addEventListener('click', () => {
      createStartMenu(app);
      removeOverlay();
    });
  }
  const showPause = () => {
    container.insertAdjacentHTML('beforeend', gamePause);
    showOverlay();
    const continueBtn = document.querySelector('.game-pause__continue');

    continueBtn.addEventListener('click', () => {
      requestAnimationId = requestAnimationFrame(game);
      isBlockKye = false;
      startBtn.disabled = true;
      removeElement('.game-pause');
      removeOverlay();
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
import { container, tetraminoItems } from './constants.js'
import { createStartMenu } from './startMenu.js'
import { gameContent } from './constants.js'
import { shuffle } from './utils.js'

const app = (difficult) => {
  container.innerHTML = '';
  container.innerHTML = gameContent;

  const canvasTetris = document.getElementById('game-tetris');
  const contextTetris = canvasTetris.getContext('2d');
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
  let requestAnimationId = null;

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
}

createStartMenu(app);

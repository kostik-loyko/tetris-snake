export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const rotate = (matrix) => {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );
  return result;
}

export const isValidPos = (tetramino, tetraminoRow, tetraminoCol, playArea) => {
  for (let row = 0; row < tetramino.length; row++) {
    for (let col = 0; col < tetramino[row].length; col++) {
      if (tetramino[row][col] &&
        (tetraminoCol + col < 0 ||
          tetraminoCol + col >= playArea[0].length ||
          tetraminoRow + row >= playArea.length ||
          playArea[tetraminoRow + row][tetraminoCol + col]
        )) {
        return false;
      }
    }
  }
  return true;
}

export const rapidFallOnDawn = (tetramino, playArea, placeTetramino) => {
  const row = tetramino.row + 1;
  if (!isValidPos(tetramino.matrix, row, tetramino.col, playArea)) {
    tetramino.row = row - 1;
    placeTetramino();
    return
  }
  tetramino.row = row;
}

export const showOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'block';
}
export const removeOverlay = () => {
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';
}

export const rotateOnClickBackspace = (tetramino, playArea) => {
  const matrix = rotate(tetramino.matrix);
  if (isValidPos(matrix, tetramino.row, tetramino.col, playArea)) {
    tetramino.matrix = matrix;
  }
}
export const moveOnClickRight = (tetramino, playArea) => {
  const col = tetramino.col + 1;
  if (isValidPos(tetramino.matrix, tetramino.row, col, playArea)) {
    tetramino.col = col;
  }
}
export const moveOnClickLeft = (tetramino, playArea) => {
  const col = tetramino.col - 1;
  if (isValidPos(tetramino.matrix, tetramino.row, col, playArea)) {
    tetramino.col = col;
  }
}
export const removeElement = (selector) => {
  if (selector) {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  }
}

export const showNextTetromino = (name) => {
  const block = document.querySelector('.tetromino')

  switch (name) {
    case 'I':
      block.className = 'tetromino tetromino-i'
      break;
    case 'Z':
      block.className = 'tetromino tetromino-z'
      break;
    case 'S':
      block.className = 'tetromino tetromino-s'
      break;
    case 'T':
      block.className = 'tetromino tetromino-t'
      break;
    case 'O':
      block.className = 'tetromino tetromino-o'
      break;
    case 'L':
      block.className = 'tetromino tetromino-l'
      break;
    case 'J':
      block.className = 'tetromino tetromino-j'
      break;
  }
}
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
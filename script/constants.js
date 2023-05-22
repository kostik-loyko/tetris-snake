export const startMenu = `<div class="game-menu">
                            <button class="menu-btn easy">Easy</button>
                            <button class="menu-btn normal">Normal</button>
                            <button class="menu-btn hard">Hard</button>
                          </div>`;

export const gameOver = `<div class="game-over">
                            <b class="game-over__title">game over</b>
                         </div>`;

export const gameContent = `        <canvas width='320' height='640' id='game-tetris'></canvas>
                                    <div class="game-info">
                                      <div class="info-next">
                                        <p class="next-title">Next</p>
                                        <div class="tetramino">
                                          <span></span>
                                          <span></span>
                                          <span></span>
                                          <span></span>
                                        </div>
                                      </div>
                                      <div class="info-score">
                                        <p class="score-title">Score</p>
                                        <p class="score">0</p>
                                      </div>
                                      <div class="info-buttons">
                                        <button class="info-btn start">Start</button>
                                        <button class="info-btn pause">Pause</button>
                                        <button class="info-btn restart">Restart</button>
                                      </div>
                                    </div>`

export const container = document.querySelector('.container-game');

export const tetraminoItems = {
  'I': [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'J': [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  'L': [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  'S': [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  'Z': [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  'O': [
    [1, 1],
    [1, 1]
  ],
  'T': [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]
}

export const colors = {
  'I': 'cyan',
  'O': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
}
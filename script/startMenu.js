import { container } from './constants.js'
import { startMenu } from './constants.js'

export const createStartMenu = (app) => {
  container.innerHTML = '';
  container.innerHTML = startMenu;

  const easyBtn = document.querySelector('.easy');
  const normalBtn = document.querySelector('.normal');
  const hardBtn = document.querySelector('.hard');

  easyBtn.addEventListener('click', () => app(35));
  normalBtn.addEventListener('click', () => app(15));
  hardBtn.addEventListener('click', () => app(5));
}
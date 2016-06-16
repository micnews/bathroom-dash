import playGame from './play-game';

import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.navigator.userAgent);
const mobile = !!(md.mobile());
var width = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
var height = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
let playable;

const main = document.querySelector('.main');
const overlay = main.querySelector('.overlay');
const buttons = main.querySelector('.buttons');

window.addEventListener('resize', resetPlayable);
window.addEventListener('orientationchange', resetPlayable);

const playButton = overlay.querySelector('.play-button');

function resetPlayable () {
  playable = (mobile && (window.orientation === 90 || window.orientation === -90)) || !mobile;
  if (playable) {
    playButton.querySelector('.copy').innerHTML = 'Play';
  } else {
    playButton.querySelector('.copy').innerHTML = 'Turn your phone on its side';
  }
}
resetPlayable();

const playListener = function (e) {
  e.preventDefault();

  if (!playable) {
    return;
  }


  playButton.removeEventListener('click', playListener);
  window.removeEventListener('resize', resetPlayable);
  window.removeEventListener('orientationchange', resetPlayable);
  overlay.classList.remove('starting');
  buttons.classList.remove('shown');
  playGame();
};

playButton.addEventListener('click', playListener);

import Immutable from 'seamless-immutable';
import createSprite from './create-sprite';

const main = document.querySelector('.main');
const buttons = main.querySelector('.main');
const canvas = main.querySelector('.canvas');

const coinImage = new Image();
coinImage.src = '/images/coin-sprite-animation-sprite-sheet.png';

function gameLoop () {
  window.requestAnimationFrame(gameLoop);

  coin.update();
  coin.render();
}

const coin = createSprite({
  context: canvas.getContext('2d'),
  width: 440,
  height: 40,
  numberOfFrames: 10,
  image: coinImage,
  ticksPerFrame: 4,
  loop: true
});

coinImage.addEventListener('load', () => {
  gameLoop();
});

const initState = Immutable({

});

const lockScroll = () => {
  window.addEventListener('mousewheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
};

lockScroll();

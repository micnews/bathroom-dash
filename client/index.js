import Immutable from 'seamless-immutable';
import createSprite from './create-sprite';

const main = document.querySelector('.main');
const buttons = main.querySelector('.main');
const canvas = main.querySelector('.canvas');

const runnerImage = new Image();
runnerImage.src = '/images/running.png';

const runner = createSprite({
  context: canvas.getContext('2d'),
  width: 212,
  height: 294,
  numberOfFrames: 5,
  image: runnerImage,
  ticksPerFrame: 8,
  loop: true
});

let onscreenSprites = [runner];

function gameLoop () {
  window.requestAnimationFrame(gameLoop);

  onscreenSprites.forEach((object) => {
    object.update();
  });
}

onscreenSprites.forEach((sprite) => {
  let loadedSprites = 0;
  sprite.image.addEventListener('load', () => {
    loadedSprites++;
    if (loadedSprites === onscreenSprites.length) {
      gameLoop();
    }
  });
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

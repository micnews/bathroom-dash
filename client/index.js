import createSprite from './create-sprite';

const main = document.querySelector('.main');
const buttons = main.querySelector('.buttons');
const canvas = main.querySelector('.canvas');
const context = canvas.getContext('2d');

const speedCoefficient = 4;

const transRunningImage = new Image();
transRunningImage.src = '/images/trans/running.png';

const transRunner = createSprite({
  context,
  imageWidth: 212,
  imageHeight: 294,
  numberOfFrames: 5,
  image: transRunningImage,
  ticksPerFrame: 8,
  loop: true
});
transRunner.stationary = true;
transRunner.player = true;

const barrier = createSprite({
  context,
  imageWidth: 212,
  imageHeight: 294,
  numberOfFrames: 5,
  image: transRunningImage,
  ticksPerFrame: 8,
  loop: true,
  xpos: canvas.width,
  ypos: 0
});

let onscreenSprites = [transRunner, barrier];
let speed = 1;
let distance = 0;
let runnerY = 0;

function animationLoop () {
  window.requestAnimationFrame(animationLoop);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  onscreenSprites.forEach((sprite) => {
    const x = sprite.stationary ? undefined : -speed;
    const y = sprite.player ? runnerY : undefined;
    sprite.update({ x, y });
  });
}

setInterval(() => {
  distance += 1;
  speed = (Math.floor(distance / 100) + 1) * speedCoefficient;
}, 100);

let loadedSprites = 0;
onscreenSprites.forEach((sprite) => {
  sprite.image.addEventListener('load', () => {
    loadedSprites++;
    if (loadedSprites === onscreenSprites.length) {
      animationLoop();
    }
  });
});

const lockScroll = () => {
  window.addEventListener('mousewheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
};

lockScroll();

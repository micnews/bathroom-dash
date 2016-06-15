import Immutable from 'seamless-immutable';

const main = document.querySelector('.main');
const buttons = main.querySelector('.main');
const canvas = main.querySelector('.canvas');

const coinImage = new Image();
coinImage.src = 'assets/images/coin-sprite-animation.png';

function sprite (options) {
  const numberOfFrames = options.numberOfFrames || 1;
  let frameIndex = 0;
  let tickCount = 0;
  let ticksPerFrame = 0;

  const spriteObject = {
    context: options.context,
    width: options.width,
    height: options.height,
    image: options.image,
    loop: options.loop,
    render () {
      spriteObject.context.drawImage(
        spriteObject.image,
        frameIndex * spriteObject.width / numberOfFrames,
        0,
        spriteObject.width / numberOfFrames,
        spriteObject.height,
        0,
        0,
        spriteObject.width / numberOfFrames,
        spriteObject.height
      );
    },
    update () {
      tickCount += 1;
      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        if (frameIndex < numberOfFrames - 1) {
          frameIndex += 1;
        } else if (spriteObject.loop) {
          frameIndex = 0;
        }
      }
    }
  };

  return spriteObject;
}

function gameLoop () {
  window.requestAnimationFrame(gameLoop);

  coin.update();
  coin.render();
}

const coin = sprite({
  context: canvas.getContext('2d'),
  width: 100,
  height: 100,
  image: coinImage
});

coinImage.addEventListener('load', gameLoop);

// const initState = Immutable({
//
// });

// const lockScroll = () => {
//   window.addEventListener('mousewheel', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   });
// };
//
// lockScroll();

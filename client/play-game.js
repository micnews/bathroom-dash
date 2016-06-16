import createSprite from './create-sprite';

const main = document.querySelector('.main');
const buttons = main.querySelector('.buttons');
const overlay = main.querySelector('.overlay');
const canvas = main.querySelector('.canvas');
const context = canvas.getContext('2d');

const initialSpeed = 10;
const speedCoefficient = 5;
const jumpTime = 12500;
const jumpHeight = 450;
const groundPx = 125;
const ground = groundPx * (canvas.height / parseInt(window.getComputedStyle(canvas).height, 10));
const cisChance = 0.5;

let actionInterval;
let actionTimeout;
let animationLoopId;

function play () {
  const transRunningImage = new Image();
  transRunningImage.src = '/images/trans/running.png';
  const transRunner = createSprite({
    context,
    imageWidth: 223,
    imageHeight: 327,
    width: 200,
    height: 300,
    numberOfFrames: 9,
    image: transRunningImage,
    ticksPerFrame: 6,
    xPos: 15,
    yPos: canvas.height - 300 - ground,
    loop: true
  });
  transRunner.actioning = false;

  const barrier = createSprite({
    context,
    imageWidth: 223,
    imageHeight: 327,
    numberOfFrames: 9,
    image: transRunningImage,
    ticksPerFrame: 10,
    loop: true,
    xPos: canvas.width + 327,
    yPos: canvas.height - 327 - ground
  });

  let obstacles = [barrier];
  let cisRunners = [];
  let startingSprites = [transRunner].concat(obstacles).concat(cisRunners);
  let distance = 0;
  function getLevel () {
    return (Math.floor(distance / 100) + 1) / 2;
  }
  function getSpeed () {
    return initialSpeed + (getLevel() * speedCoefficient);
  }
  let runnerY;
  function resetRunnerY () {
    runnerY = -canvas.height + transRunner.height + ground;
  }
  resetRunnerY();

  function detectCollisions () {
    for (var i = 0; i < obstacles.length; i++) {
      if (transRunner.collidingWith(obstacles[i])) {
        return true;
      }
    }
  }

  function animationLoop () {
    animationLoopId = window.requestAnimationFrame(animationLoop);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    transRunner.update({ y: -runnerY, absolute: true });
    cisRunners.forEach((sprite, idx) => {
      sprite.update({ x: sprite.speed });
      if (sprite.xPos > canvas.width) {
        cisRunners.splice(idx, 1);
      }
    });
    obstacles.forEach((sprite) => {
      if (sprite.xPos + sprite.width < 0) {
        obstacles.splice(obstacles.indexOf(sprite), 1);
      } else {
        sprite.update({ x: -getSpeed() });
      }
    });
    if (detectCollisions()) {
      die();
      return;
    }
  }

  function updateDistance () {
    distance += 1;
    overlay.querySelector('.score').innerHTML = distance;
  }

  const runningInterval = setInterval(updateDistance, 100);

  function generateCisRunner () {
    if (Math.random() >= cisChance) {
      const gender = (Math.random() >= 0.5 ? 'female' : 'male');
      const speed = ((Math.random() - 0.5) * 10) + 10;
      const size = (Math.random() - 0.5) * 100;
      const newHeight = 327 + size;
      const newWidth = 223 + size;

      const cisRunningImage = new Image();
      cisRunningImage.src = '/images/cis/running-' + gender + '.png';
      const cisRunner = createSprite({
        context,
        imageWidth: 223,
        imageHeight: 327,
        width: newWidth,
        height: newHeight,
        numberOfFrames: 9,
        image: cisRunningImage,
        ticksPerFrame: 5,
        loop: true,
        xPos: -newWidth - size,
        yPos: canvas.height - newHeight - ground
      });
      cisRunner.speed = speed;

      cisRunners.push(cisRunner);
    }
  }

  const cisRunnersInterval = setInterval(generateCisRunner, 1000);

  let loadedSprites = 0;
  startingSprites.forEach((sprite) => {
    sprite.image.addEventListener('load', () => {
      loadedSprites++;
      if (loadedSprites === startingSprites.length) {
        animationLoop();
      }
    });
  });

  function jump () {
    if (transRunner.actioning) {
      return;
    }
    const jumpDistance = jumpTime / getSpeed();
    const startDate = new Date();
    actionInterval = setInterval(() => {
      resetRunnerY();
      const now = new Date();
      const time = now - startDate;
      runnerY += Math.sin(time * Math.PI / jumpDistance) * jumpHeight;
    }, 1);
    actionTimeout = setTimeout(() => {
      clearInterval(actionInterval);
      resetRunnerY();
      transRunner.actioning = false;
    }, jumpDistance);
    transRunner.actioning = true;
  }

  function slide () {
  }

  function die () {
    clearInterval(runningInterval);
    clearInterval(actionInterval);
    clearInterval(cisRunnersInterval);
    clearTimeout(actionTimeout);
    window.cancelAnimationFrame(animationLoopId);
    play();
  }

  function setUpMenuButtons () {

  }

  function setUpMenuOverlay () {

  }

  function setUpInGameButtons () {
    buttons.innerHTML = '<div class="button jump"></div><div class="button slide"></div>';
    const jumpButton = buttons.querySelector('.jump');
    const slideButton = buttons.querySelector('.slide');
    const buttonHeight = 'calc(50% - ' + (groundPx / 2) + 'px)';
    jumpButton.style.height = buttonHeight;
    slideButton.style.height = buttonHeight;

    jumpButton.addEventListener('click', jump);
    slideButton.addEventListener('click', slide);
  }

  function setUpInGameOverlay () {
    overlay.innerHTML = '<div class="frame"></div><div class="score"></div>';
    const frame = overlay.querySelector('.frame');
    frame.style.height = 'calc(100% - ' + groundPx + 'px - 10px)';
    const score = overlay.querySelector('.score');
    score.style.height = groundPx + 'px';
    score.style.lineHeight = groundPx - 15 + 'px';
  }

  setUpInGameButtons();
  setUpInGameOverlay();

  function lockScroll () {
    window.addEventListener('mousewheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  lockScroll();
}

export default play;

import createSprite from './create-sprite';
import gameOver from './game-over';
import obstacleList from './obstacles.json';
import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.navigator.userAgent);
const mobile = !!(md.mobile());

const main = document.querySelector('.main');
const buttons = main.querySelector('.buttons');
const overlay = main.querySelector('.overlay');
const canvas = main.querySelector('.canvas');
const context = canvas.getContext('2d');

const initialSpeed = 10;
const speedCoefficient = 5;
const actionTime = 12500;
const jumpHeight = 450;
const groundPx = 125;
const ground = groundPx * (canvas.height / parseInt(window.getComputedStyle(canvas).height, 10));
const cisChance = 0.5;
const obstacleChance = 0.7;
const obstacleTime = 1250;
const obstacleTimeVariance = 250;
const obstacleMinimum = 2;
const obstacleLimit = 3;

let actionInterval;
let actionTimeout;
let animationLoopId;

function shuffle (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function play (startTime = 0) {
  const transRunningImage = new Image();
  transRunningImage.src = '/images/trans/running.png';
  let transRunner;
  function resetTransRunner () {
    transRunner = createSprite({
      context,
      imageWidth: 250,
      imageHeight: 341,
      width: 200,
      height: 300,
      numberOfFrames: 9,
      image: transRunningImage,
      ticksPerFrame: 6,
      xPos: 50,
      yPos: canvas.height - 300 - ground,
      loop: true
    });
    transRunner.actioning = false;
  }
  resetTransRunner();

  const transSlidingImage = new Image();
  transSlidingImage.src = '/images/trans/sliding.png';

  let obstacles = [];
  let obstacleListIdx = 0;
  let cisRunners = [];
  let bathroomSigns = [];
  let distance = 0;
  let obstacleCount = 0;
  function getLevel () {
    return (Math.floor(distance / 100) + 1) / 2;
  }
  function getSpeed () {
    return initialSpeed + (getLevel() * speedCoefficient);
  }
  let runnerY;
  function resetTransRunnerY () {
    runnerY = -canvas.height + transRunner.height + ground;
  }
  resetTransRunnerY();

  function detectCollisions () {
    for (var i = 0; i < obstacles.length; i++) {
      if (transRunner.collidingWith(obstacles[i])) {
        return obstacles[i];
      }
    }
  }

  function animationLoop () {
    animationLoopId = window.requestAnimationFrame(animationLoop);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    bathroomSigns.forEach((sprite, idx) => {
      sprite.update({ x: -getSpeed() / 2 });
      if (sprite.xPos + sprite.width < 0) {
        bathroomSigns.splice(idx, 1);
      }
    });
    cisRunners.forEach((sprite, idx) => {
      sprite.update({ x: sprite.speed });
      if (sprite.xPos > canvas.width) {
        cisRunners.splice(idx, 1);
      }
    });
    obstacles.forEach((sprite, idx) => {
      sprite.update({ x: -getSpeed() });
      if (sprite.xPos + sprite.width < 0) {
        obstacles.splice(idx, 1);
        obstacleCount += 1;
        overlay.querySelector('.score').innerHTML = obstacleCount;
      }
    });
    transRunner.update({ y: -runnerY, absolute: true });

    const collidedObstacle = detectCollisions();
    if (collidedObstacle) {
      endGame(collidedObstacle);
      return;
    }
  }

  function nextLevel () {
    console.log('new level');
    if (transRunner.ticksPerFrame > 1) {
      transRunner.ticksPerFrame -= 1;
    }
  }

  function updateDistance () {
    var currentLevel = getLevel();
    distance += 1;
    var newLevel = getLevel();
    if (newLevel > currentLevel) {
      nextLevel();
      generateObstacle();
    }
  }

  shuffle(obstacleList);

  function generateObstacle () {
    if (obstacles.length >= obstacleLimit) {
      return;
    }

    if (obstacleListIdx === obstacleList.length) {
      obstacleListIdx = 0;
      shuffle(obstacleList);
    }
    if (obstacleChance > Math.random() || obstacles.length < obstacleMinimum) {
      const obstacleData = obstacleList[obstacleListIdx];
      obstacleListIdx += 1;
      const obstacleWidth = obstacleData.image.width || obstacleData.image.imageWidth;
      const obstacleHeight = obstacleData.image.height || obstacleData.image.imageHeight;
      const obstacleImage = new Image();
      obstacleImage.src = obstacleData.image.src;
      const obstacle = createSprite({
        context,
        imageWidth: obstacleData.image.imageWidth,
        imageHeight: obstacleData.image.imageHeight,
        width: obstacleWidth,
        hidth: obstacleHeight,
        numberOfFrames: obstacleData.image.numberOfFrames || 1,
        image: obstacleImage,
        ticksPerFrame: obstacleData.image.speed || 5,
        loop: obstacleData.image.loop || true,
        xPos: canvas.width + obstacleWidth,
        yPos: obstacleData.image.position === 'bottom' ? canvas.height - obstacleHeight - ground : 15,
        hitboxTop: obstacleData.image.hitboxTop,
        hitboxBottom: obstacleData.image.hitboxBottom,
        hitboxLeft: obstacleData.image.hitboxLeft,
        hitboxRight: obstacleData.image.hitboxRight
      });
      const props = ['name', 'description', 'article', 'cta'];
      props.forEach((prop) => {
        obstacle[prop] = obstacleData[prop];
      });
      obstacle.position = obstacleData.image.position;

      obstacles.push(obstacle);
    }
  }

  function generateCisRunner () {
    if (Math.random() >= cisChance) {
      const gender = (Math.random() >= 0.5 ? 'female' : 'male');
      const speed = ((Math.random() - 0.5) * 10) + 10;
      // const size = (Math.random() - 0.5) * 100;
      // const newHeight = 327 + size;
      // const newWidth = 223 + size;
      const size = 100;
      const newHeight = 300;
      const newWidth = 200;

      const cisRunningImage = new Image();
      cisRunningImage.src = '/images/cis/running-' + gender + '.png';
      const cisRunner = createSprite({
        context,
        imageWidth: 250,
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

  generateObstacle();

  function generateBathroomSign () {
    const bathroomSignImage = new Image();
    bathroomSignImage.src = '/images/misc/bathroom-sign.png';
    const bathroomSign = createSprite({
      context,
      imageWidth: 127,
      imageHeight: 167,
      numberOfFrames: 1,
      image: bathroomSignImage,
      xPos: canvas.width + 127,
      yPos: 100
    });

    bathroomSigns.push(bathroomSign);
  }
  generateBathroomSign();

  function jump (e) {
    if (e) {
      e.preventDefault();
    }

    if (transRunner.actioning) {
      return;
    }

    const jumpDistance = actionTime / getSpeed();
    const startDate = new Date();
    actionInterval = setInterval(() => {
      resetTransRunnerY();
      const now = new Date();
      const time = now - startDate;
      runnerY += Math.sin(time * Math.PI / jumpDistance) * jumpHeight;
    }, 1);
    actionTimeout = setTimeout(() => {
      clearInterval(actionInterval);
      resetTransRunnerY();
      transRunner.actioning = false;
    }, jumpDistance);
    transRunner.actioning = true;
  }

  function slide (e) {
    if (e) {
      e.preventDefault();
    }

    if (transRunner.actioning) {
      return;
    }
    const slideDistance = actionTime / getSpeed();
    const sectionLength = slideDistance / 9;
    const startDate = new Date();
    let activeFrame = 0;

    transRunner.frameIndex = activeFrame;
    transRunner.imageWidth = 322;
    transRunner.imageHeight = 323;
    transRunner.width += 50;
    transRunner.image = transSlidingImage;
    transRunner.ticksPerFrame = 1000;
    transRunner.hitboxTop = 250;

    actionInterval = setInterval(() => {
      const now = new Date();
      const time = now - startDate;
      activeFrame = Math.floor(time / sectionLength);
      transRunner.frameIndex = activeFrame;
    }, 1);
    actionTimeout = setTimeout(() => {
      clearInterval(actionInterval);
      resetTransRunner();
      transRunner.actioning = false;
    }, slideDistance);
    transRunner.actioning = true;
  }

  function endGame (obstacle) {
    // TODO: remove jump and slide listeners; those will stack up on replay
    clearInterval(runningInterval);
    clearInterval(actionInterval);
    clearTimeout(obstaclesTimeout);
    clearInterval(cisRunnersInterval);
    clearInterval(bathroomSignsInterval);
    clearTimeout(actionTimeout);
    window.cancelAnimationFrame(animationLoopId);

    gameOver({
      obstacle: obstacle,
      score: obstacleCount
    }, play);
  }

  let jumpListener;
  let slideListener;

  function setUpInGameButtons () {
    if (mobile) {
      buttons.innerHTML = '<div class="button jump"><div class="button-text">TAP TO JUMP</div></div><div class="button slide"><div class="button-text">TAP TO SLIDE</div></div>';
    } else {
      buttons.innerHTML = '<div class="button jump"><div class="button-text">PRESS UP TO TO JUMP</div></div><div class="button slide"><div class="button-text">PRESS DOWN TO SLIDE</div></div>';
    }
    const jumpButton = buttons.querySelector('.jump');
    const slideButton = buttons.querySelector('.slide');
    const buttonHeight = 'calc(50% - ' + (groundPx / 2) + 'px)';
    jumpButton.style.height = buttonHeight;
    slideButton.style.height = buttonHeight;

    if (mobile) {
      jumpListener = jumpButton.addEventListener('touchend', jump);
      slideListener = slideButton.addEventListener('touchend', slide);
    } else {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 38) {
          jump();
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 40) {
          slide();
        }
      });
    }
  }

  function setUpInGameOverlay () {
    overlay.innerHTML = '<div class="frame"></div><div class="score">0</div>';
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

  function startObstacleTime () {
    const newObstacleTime = obstacleTime + ((Math.random() - 0.5) * obstacleTimeVariance);
    obstaclesTimeout = setTimeout(() => {
      clearTimeout(obstaclesTimeout);
      generateObstacle();
      startObstacleTime();
    }, newObstacleTime);
  }

  let runningInterval;
  let bathroomSignsInterval;
  let cisRunnersInterval;
  let obstaclesTimeout;
  setTimeout(function () {
    runningInterval = setInterval(updateDistance, 100);
    bathroomSignsInterval = setInterval(generateBathroomSign, 5000);
    cisRunnersInterval = setInterval(generateCisRunner, 1000);
    startObstacleTime();
    animationLoop();
  }, startTime);
}

export default play;

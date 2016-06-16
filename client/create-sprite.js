const smaller = 30;

export default ({ context, height, width, imageHeight, imageWidth, xPos = 0, yPos = 0, image, loop, numberOfFrames = 1, ticksPerFrame = 1 }) => {
  const spriteObject = {
    context: context,
    imageWidth,
    imageHeight,
    width: width || imageWidth,
    height: height || imageHeight,
    xPos,
    yPos,
    ticksPerFrame,
    numberOfFrames,
    image: image,
    loop: loop,
    frameIndex: 0,
    tickCount: 0,
    update ({ x, y, absolute = false }) {
      if (x) {
        spriteObject.xPos = absolute ? x : spriteObject.xPos + x;
      }
      if (y) {
        spriteObject.yPos = absolute ? y : spriteObject.yPos + y;
      }

      spriteObject.context.drawImage(
        spriteObject.image,
        spriteObject.frameIndex * spriteObject.imageWidth,
        0,
        spriteObject.imageWidth,
        spriteObject.imageHeight,
        spriteObject.xPos,
        spriteObject.yPos,
        spriteObject.width,
        spriteObject.height
      );

      spriteObject.tickCount += 1;
      if (spriteObject.tickCount >= spriteObject.ticksPerFrame) {
        spriteObject.tickCount = 0;
        if (spriteObject.frameIndex < spriteObject.numberOfFrames - 1) {
          spriteObject.frameIndex += 1;
        } else if (spriteObject.loop) {
          spriteObject.frameIndex = 0;
        }
      }
    },
    getRect () {
      return {
        top: spriteObject.yPos + smaller,
        bottom: spriteObject.yPos + spriteObject.height - smaller,
        left: spriteObject.xPos + smaller,
        right: spriteObject.xPos + spriteObject.width - smaller
      };
    },
    collidingWith (otherSprite) {
      const r1 = spriteObject.getRect();
      const r2 = otherSprite.getRect();
      return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
    }
  };

  return spriteObject;
};

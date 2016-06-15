export default ({ context, height, width, imageHeight, imageWidth, xpos = 0, ypos = 0, image, loop, numberOfFrames = 1, ticksPerFrame = 1 }) => {
  const spriteObject = {
    context: context,
    imageWidth,
    imageHeight,
    width: width || imageWidth,
    height: height || imageHeight,
    xpos,
    ypos,
    ticksPerFrame,
    numberOfFrames,
    image: image,
    loop: loop,
    frameIndex: 0,
    tickCount: 0,
    update ({ x = 0, y = 0, absolute = false }) {
      spriteObject.xpos = absolute ? x : spriteObject.xpos + x;
      spriteObject.ypos = absolute ? y : spriteObject.ypos + y;

      spriteObject.context.drawImage(
        spriteObject.image,
        spriteObject.frameIndex * spriteObject.imageWidth,
        0,
        spriteObject.imageWidth,
        spriteObject.imageHeight,
        spriteObject.xpos,
        spriteObject.ypos,
        spriteObject.width,
        spriteObject.height
      );

      // console.log(spriteObject.xpos);
      console.log(spriteObject.ypos);

      spriteObject.tickCount += 1;
      if (spriteObject.tickCount >= spriteObject.ticksPerFrame) {
        spriteObject.tickCount = 0;
        if (spriteObject.frameIndex < spriteObject.numberOfFrames - 1) {
          spriteObject.frameIndex += 1;
        } else if (spriteObject.loop) {
          spriteObject.frameIndex = 0;
        }
      }
    }
  };

  return spriteObject;
};

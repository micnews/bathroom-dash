export default (opts) => {
  const numberOfFrames = opts.numberOfFrames || 1;
  let frameIndex = 0;
  let tickCount = 0;
  let ticksPerFrame = opts.ticksPerFrame || 1;

  const spriteObject = {
    context: opts.context,
    width: opts.width,
    height: opts.height,
    image: opts.image,
    loop: opts.loop,
    render () {
      spriteObject.context.clearRect(0, 0, spriteObject.width, spriteObject.height);
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
      if (tickCount >= ticksPerFrame) {
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
};

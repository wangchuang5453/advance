let lastTime = performance.now(); // 上一次记录的时间
let lastFrameTime = performance.now(); // 上一帧的时间
let frame = 0; // 帧数

const loop = function(time) {
  let now = performance.now();
  let fs = now - lastFrameTime; // 毫秒
  lastFrameTime = now;
  //get fps
  let fps = Math.round(1000 / fs); // requestFrameAnimation 每帧调用一次 乘以1000得到每秒数据
  frame ++;
  // 以上都是在用每一帧比上每一帧用的时间，获取每毫秒多少帧，然后乘以1000拿到每秒多少帧，也就是fps
  // 以下是记录1s总帧数，然后用总帧数除以1s，得到fps
  if (now > 1000 + lastTime) {
    fps = Math.random((frame * 1000) / (now - lastTime));
    frame = 0;
    lastTime = now;
  }
  window.requestAnimationFrame(loop);
}
loop();

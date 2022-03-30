# 卡顿异常

卡顿指的是显示器刷新时**下一帧的画面还没有准备好**，导致**连续多次展示同样的画面**，从而让用户感觉到页面不流畅，也就是**所谓的掉帧**，衡量一个页面是否卡顿的指标就是我们熟知的 FPS。

## 如何获取 FPS (Frames Per Second)
Chrome DevTool 中有一栏 Rendering 中包含 FPS 指标，但目前浏览器标准中暂时没有提供相应 API ，只能手动实现。
这里需要借助 requestAnimationFrame 方法模拟实现，浏览器会在下一次重绘之前执行 rAF 的回调，因此可以**通过计算每秒内 rAF 的执行次数来计算当前页面的 FPS**。

mdn:
window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在**下次重绘之前**调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()。

```js
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
```



# requestAnimationFrame

mdn:

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与**浏览器屏幕刷新次数相匹配**。为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

```


计算好当前 scale 的值后，再利用 TransformPropertyFactory 计算好当前对应的 transform 的 matrix 值，然后修改对应 DOM 元素上的 CSS 属性。这样通过 requestAnimationFrame 不停的计算帧数，再计算对应的 CSS 变化，在一定的时间内，便实现了动画。播放流程如下：

matrix：
https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/
虽然题目写的是“transform中的Matrix”，实际上，在CSS3以及HTML5的世界里，这玩意还是涉猎蛮广的，如SVG以及canvas.

问题，确实，对于一般地交互应用，transform属性默认提供的些方法是足够了，但是，一些其他的效果，如果transform属性没有提供接口方法，那你又该怎么办呢？比方说，“镜像对称效果”！


json文件：
w 和 h： 宽 200、高 200
v：Bodymovin 插件版本号 4.5.4
fr：帧率 30fps
ip 和 op：开始帧 0、结束帧 180
assets：静态资源信息（如图片）
layers：图层信息（动画中的每一个图层以及动作信息）
ddd：是否为 3d
comps：合成图层


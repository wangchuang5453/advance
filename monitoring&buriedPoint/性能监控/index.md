开源样例
https://segmentfault.com/a/1190000039023963
=>
https://github.com/KieSun/per-moniteur
# 性能监控

性能监控并不只是简单的监控“页面速度有多快”，需要从用户体验的角度全面衡量性能指标。（就是所谓的 RUM 指标）
目前业界主流标准是 Google 最新定义的 Core Web Vitals：

1.加载（loading） ：LCP
2.交互（interactivity） ：FID
3.视觉稳定（visual stability） ：CLS

可以看到最新标准中，**以往熟知的 FP、FCP、FMP、TTI 等指标都被移除了**，个人认为这些指标还是具备一定的参考价值，因此下文还是会将这些指标进行相关介绍。（谷歌的话不听不听🙉）

## Loading 加载

和 Loading 相关的指标有 FP 、FCP 、FMP 和 LCP，首先来看一下我们相对熟悉的几个指标：

FP/FCP/FMP

![FP/FCP/FMP 三指标顺序解释](./1.png)

### FP (First Paint): 
当前页面首次渲染的时间点，通常将开始访问 Web 页面的时间点到 FP 的时间点的这段时间视为白屏时间，简单来说就是有屏幕中像素点开始渲染的时刻即为 FP。

![FP 优化标准](./fp.png)

### FCP ( First Contentful Paint ): 
当前页面首次有内容渲染的时间点，这里的 内容 通常指的是文本、图片、svg 或 canvas 元素。

![FCP 优化标准](./fcp.png)

这两个指标都通过 PerformancePaintTiming API 获取：

通过 PerformancePaintTiming 获取 FP 和 FCP

```js
function getPaintTimings() {
  let performance = window.performance;
  if (performance) {
    let paintEntries = performance.getEntriesByType('paint');
    console.log(paintEntries);
    return {
      FP: paintEntries.filter((entry) => entry.name === 'first-paint')[0].startTime,
      FCP: paintEntries.filter((entry) => entry.name === 'first-contentful-paint')[0].startTime,
    }
  }
}

```

### 下面再来看 FMP 的定义和获取方式：

FMP (First Meaningful Paint): 表示首次绘制有意义内容的时间，在这个时刻，页面整体布局和文字内容全部渲染完成，用户能够看到页面主要内容，产品通常也会关注该指标。

FMP 的计算相对复杂，因为浏览器并未提供相应的 API，在此之前我们先看一组图：

![figure1](./figure1.png)

![figure2](./figure2.png)

从图中可以发现页面渲染过程中的一些规律：

在 1.577 秒，页面渲染了一个搜索框，此时已经有 60 个布局对象被添加到了布局树中。
在 1.760 秒，页面头部整体渲染完成，此时布局对象总数是 103 个。
在 1.907 秒，页面主体内容已经绘制完成，此时有 261 个布局对象被添加到布局树中从用户体验的角度看，**此时的时间点就是是 FMP**。

可以看到布局对象的数量与页面完成度高度相关。
业界目前比较认可的一个计算 FMP 的方式就是——「页面在加载和渲染过程中**最大布局变动之后**的那个绘制时间**即为当前页面的 FMP** 」

实现原理则需要通过 MutationObserver 监听 document 整体的 DOM 变化，在回调计算出当前 DOM 树的分数，分数变化最剧烈的时刻，即为 FMP 的时间点。

至于如何计算当前页面 DOM 🌲的分数，LightHouse 的源码中会根据当前节点深度作为变量做一个权重的计算，具体实现可以参考 LightHouse 源码。
```js
const curNodeScore = 1 + 0.5 * depth;
const domScore = 所有子节点分数求和
```
上述计算方式性能开销大且未必准确，**LightHouse 6.0 已明确废弃了 FMP 打分项**，建议在具体业务场景中根据实际情况**手动埋点来确定 FMP 具体的值**，更准确也更高效。

### LCP

![LCP largest contentful paint](./1.png)

没错，LCP (Largest Contentful Paint) 是就是用来代替 FMP 的一个性能指标 ，用于度量视口中最大的内容元素何时可见，可以用来确定页面的主要内容何时在屏幕上完成渲染。

使用 Largest Contentful Paint API 和 PerformanceObserver 即可获取 LCP 指标的值：

===
PerformanceObserver 接口用于观察性能评估事件，并在浏览器的性能时间表中记录新的性能指标时通知它们。此特性在 Web Worker 中可用。
```js
function perf_observer(list, observer) { 
   // 处理 “measure” 事件
} 
var observer2 = new PerformanceObserver(perf_observer); 
observer2.observe({entryTypes: ["measure"]});
```
===

获取 LCP

```js
const observer = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate', entry.startTime, entry);
  }
})
observer.observe({type: 'largest-contentful-paint', buffered: true});
```

## Interactivity 交互

### TTI

![tti](./tti.png)

TTI(Time To Interactive) 表示从页面加载开始到页面处于完全可交互状态所花费的时间， TTI 值越小，代表用户可以更早地操作页面，用户体验就更好。

这里定义一下什么是完全可交互状态的页面：

页面已经显示有用内容。
页面上的可见元素关联的事件响应函数已经完成注册。
事件响应函数可以在事件发生后的 50ms 内开始执行（主线程无 Long Task）。

TTI 的算法略有些复杂，结合下图看一下具体步骤：
![具体步骤](./tti-line.png)

Long Task: 阻塞主线程达 50 毫秒或以上的任务。

1.从 FCP 时间开始，向前搜索一个不小于 5s 的静默窗口期。（静默窗口期定义：窗口所对应的时间内没有 Long Task，且进行中的网络请求数不超过 2 个）

2.找到静默窗口期后，从静默窗口期向后搜索到最近的一个 Long Task，Long Task 的结束时间即为 TTI。

3.如果一直找到 FCP 时刻仍然没有找到 Long Task，以 FCP 时间作为 TTI。

其实现需要支持 Long Tasks API 和 Resource Timing API，具体实现感兴趣的同学可以按照上述流程尝试手动实现。

(计算方式
谷歌提供了ttiPolyfill的sdk来计算,实际上是计算long tas，它把onload为起点，以5秒作为一个时间窗口，找到一个没有long task并且没有两个以上未完全的请求的时间窗口来上报tti。
我们也可以像计算fmp一样的方法来计算tti，在可交互的元素渲染后打点，虽然需要手动打点，但比较可靠。)


### FID
![first input delay](./fid.png)

FID(First Input Delay) 用于度量用户第一次与页面交互的延迟时间，是用户第一次与页面交互到浏览器真正能够开始处理事件处理程序以响应该交互的时间。

其实现使用简洁的 PerformanceEventTiming API 即可，回调的触发时机是用户首次与页面发生交互并得到浏览器响应（点击链接、输入文字等）。

获取 FID
```js

const onFirstInputEntry = (entry) => {
  const fid = entry.processingStart - entry.startTime;
  console.log(fid);
  //report({fid});
}

const observer = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach(onFirstInputEntry)
})
observer.observe({type: 'first-input', buffered: true});

```

至于为何新的标准中采用 FID 而非 TTI，可能存在以下几个因素：

1.FID 是需要用户实际参与页面交互的，只有用户进行了交互动作才会上报 FID，TTI 不需要。
2.FID 反映用户对页面交互性和响应性的第一印象，良好的第一印象有助于用户建立对整个应用的良好印象。

## Visual Stability 视觉稳定

### CLS

![Cumulative Layout Shift]()

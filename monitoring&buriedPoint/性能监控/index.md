# 性能监控

性能监控并不只是简单的监控“页面速度有多快”，需要从用户体验的角度全面衡量性能指标。（就是所谓的 RUM 指标）
目前业界主流标准是 Google 最新定义的 Core Web Vitals：

1.加载（loading） ：LCP
2.交互（interactivity） ：FID
3.视觉稳定（visual stability） ：CLS

可以看到最新标准中，以往熟知的 FP、FCP、FMP、TTI 等指标都被移除了，个人认为这些指标还是具备一定的参考价值，因此下文还是会将这些指标进行相关介绍。（谷歌的话不听不听🙉）

## Loading 加载

和 Loading 相关的指标有 FP 、FCP 、FMP 和 LCP，首先来看一下我们相对熟悉的几个指标：

FP/FCP/FMP (图片都要看！！)

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





# 静态资源加载异常

静态资源加载异常的捕获存在两种方式：

1.在出现静态资源加载异常的元素的 onerror 方法中处理。

2.资源加载异常触发的error事件不会冒泡，因此使`window.addEventListener('error', cb, true) `在事件**捕获阶段**进行捕获。
第一种方式侵入性太强，不够优雅，目前主流方案均采用第二种方式进行监控：

```js
window.addEventListener('error', (event) => {
  const e = event || window.event;
  if (!e) {
    return;
  }
  const { nodeName, currentSrc } = e.target || {};
}, true) // 资源加载异常触发的error事件不会冒泡，捕获阶段才能捕捉到，添加true是捕获阶段
```

APM 平台一般会有所有静态资源加载的明细，其原理是通过 PerformanceResourceTiming API 来采集静态资源加载的基本情况，这里不做展开。




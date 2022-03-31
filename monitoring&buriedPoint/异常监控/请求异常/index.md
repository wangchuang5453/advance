# 请求异常

业务中的 AJAX 请求或者 Fetch 请求在不同的网络环境或者客户端环境会有不稳定的表现，这些不稳定的情况我们很难通过本地测试的途径进行测试或者感知得到，所以我们需要对 HTTP 请求进行线上监控，通过将 HTTP 请求异常上报的方式对错误日志进行采集，然后进行一系列的分析和监控。

请求异常通常泛指 HTTP 请求失败或者 HTTP 请求返回的状态码非 20X。

那么请求异常监控怎么做呢？
普遍采用的方式是对原生的 XMLHttpRequest 对象和 fetch 方法进行重写，从而在代理对象中实现状态码的监听和错误上报：

## 重写 XMLHttpRequest 对象

```js
const report = () => {
  //
}

const _send = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.send = function () {
  const _stateChange = this['onreadystatechange'];
  this.['onreadystatechange'] = function(event) {
    if (this.readyState === 4) {
      const xhr = event.target;
      if (xhr.status.toString()[0] !== '2') { // 状态码不等于200
        report(event.target);
      }
    }
    return _stateChange && _stateChange.apply(this, arguments);
  }
  return _send.apply(this, arguments);
}

```

## 重写 fetch 方法

```js
const _fetch = window.fetch;
const _newFetch = function () {
  return _fetch.apply(this, arguments).then((res) => {
    if (!res.ok) {
      report(res);
    }
    return res;
  }).catch((err) => {
    report(err);
    return Promise.reject(err);
  });
}


```

当然了，重写上述方法后除了异常请求可以被监控到之外，正常响应的请求状态自然也能被采集到，比如 Slardar 会将对所有上报请求的持续时间进行分析从而得出慢请求的占比：


PS：如果通过 XHR 或 fetch 来上报监控数据的话，上报请求也会被被拦截，可以有选择地做一层过滤处理。
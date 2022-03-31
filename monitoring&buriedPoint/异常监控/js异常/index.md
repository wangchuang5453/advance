# JS 异常监控的第一项准备工作

## Script Error

先抛开如何采集 JS 异常信息不谈，在采集之前如果连报错信息都不全那么即使采集到了这样的数据也是无效的。
巧的是，确实存在这样一个场景：当页面**加载自不同域的脚本**（例如页面的 JS 托管在 CDN）中发生语法错误时，浏览器基于安全机制考虑，不会给出语法错误的细节，而是简单的 Script error. 。

因此，如果你希望自己页面的详细报错信息被监控 SDK 捕获你需要为页面中的脚本 script 添加 crossorigin= anonymous 属性，且脚本所在的服务设置 CORS 响应头 Access-Control-Allow-Origin: * ，这是 JS 异常监控的第一项准备工作。

### script标签 crossorigin 属性（扫盲）

设置 crossorigin属性后，script标签去请求资源的时候，request会带上origin头，然后会要求服务器进行 cors校验，
跨域的时候如果response header 没有 ‘Access-Control-Allow-Origin’ 是不会拿到资源的。
cors验证通过后，拿到的script运行内部报错的话，window.onerror 捕获的时候，内部的error.message可以看到完整的错误信息。

crossorigin的属性值分为 anonymous和use-credentials。
如果设置了crossorigin属性，但是属性值不正确的话，默认是anonymous。
anonymous代表同域会带上cookie，跨域则不带上cookie，相当于 fecth请求的credentials: 'same-origin'。
use-credentials跨域也会带上cookie，相当于fetch请求的 credentials: 'include'，这种情况下跨域的response header 需要设置'Access-Control-Allow-Credentials' = true，否则cors失败。

总结：
设置了crossorigin就相当于开启了cors校验。
开启cors校验之后，跨域的script资源在运行出错的时候，window.onerror可以捕获到完整的错误信息。
crossorigin=use-credentials可以跨域带上cookie。


# 编译时与运行时错误

常见的 JS 错误可分为编译时错误和运行时错误，其中编译时错误在 IDE 层面就会给出提示，一般不会流入到线上，因此编译时错误不在监控范围。

有的同学说在 Slardar 上时常看到 **SyntaxError** 的字样，这种情况一般都是 JSON.parse 解析出错或浏览器兼容性问题导致，属于运行时错误并非编译时错误。

对于异常监控我们主要关注 JS 运行时错误，多数场景下的处理手段如下：

错误场景	                      |     如何上报    
场景一：自行感知的同步运行时异常	                                 try-catch 后进行错误上报
场景二：没有手动 catch 的运行时异常（包括异步但不包括 promise 异常）	**通过 window.onerror进行监听**
场景三：自行感知的 promise 异常	                                   promise catch 进行捕获后进行错误上报
场景四：没有手动 catch 的 promise 异常	                           监听 window 对象的 **unhandledrejection** 事件

```js
// 绑定 unhandledrejection 事件，处理未显式捕获的Promise异常
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});

```


整体来看，**监控 SDK** 会在**全局帮助用户去捕获**他们没有自行感知的异常并上报，对于自行捕获的异常一般会**提供手动上报接口**进行上报。


# SourceMap

假设现在已经采集到页面目前存在的 JS 异常并做了上报，最终消费时你我们当然希望看到的是错误的初始来源和调用堆栈，但实际发生报错的 JS 代码都经过各种转换混淆压缩，早已面目全非了，因此这里需要借助打包阶段生成的 SourceMap 做一个反向解析得到原始报错信息的上下文。

以 Sentry （Slardar 也有用到 Sentry）为例大致流程如下：

采集侧收集错误信息发送到监控平台服务端。
接入的业务方自行上传 SourceMap 文件到监控平台服务端，上传完成后删除本地的 SourceMap文件，且打包后的 js 文件末尾不需要 SourceMap URL，最大程度避免 SourceMap 泄漏。
服务端通过 source-map 工具结合 SourceMap 和原始错误信息定位到源码具体位置。



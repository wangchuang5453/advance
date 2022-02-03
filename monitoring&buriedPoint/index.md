性能监控
异常监控
# 数据埋点方案、监控方案

数据采集 => 上报 => 分析 => 监控

访问公司埋点接口

数据列举：
isLogin: true/false
role: 

产品/数据分析定义埋点 埋点名称/埋点携带的字段/什么时候触发埋点

一般需要上报什么信息呢？
1、埋点的标识信息
eventId
eventType: click  pageView userPageView (a用户访问页面2次)  

2、业务自定义的信息
比如教育行业, 点击一个按钮, 我们要上报用户点击的是哪个年级

3、通用的设备信息/用户信息
userId 用户id
deviceId 没登录使用设备id
useragent 前端一直比较关注的数据 Android 4.4 ios 9 10 Huawei
timestamp
location

4、一般怎么上报呢
比如 report函数

5、实时上报 调用report后立即发送请求

6、延时上报
域名相同浏览器同时最大支持6个请求
上报接口一般和业务接口不会一样，如果一样的话，实时上报可能会影响业务接口请求

延时上报，sdk内部统一收集业务方要上报的信息，依托于防抖或者浏览器空闲时间或者页面卸载前去统一上报，上报失败做一些补偿措施。页面卸载前不太可靠，有的浏览器可能监听不到，一般不要在页面卸载前上报比较重要的埋点，防抖是比较合适的。

# 埋点主要有三种方式实现

1、代码埋点

2、无埋点
不需要开发人员手动插入埋点的代码
性能
无法太过个性化
3、可视化埋点


## 代码埋点
怎么更优雅的实现

实现：基于防抖的延时上报 能否尽量补偿买点丢失行为

错误信息大概包括哪些类别
1、js error window.addEventListener('error')
2、source error window.addEventListener('error')
3、unhandlePromise
4、主动上报的（浏览器看出没什么错，业务上的错误）

### 实现

## 无埋点

### 概念

无埋点并不是真正的字面意思，其真实含义其实是，不需要研发去手动埋点。

一般会有一个 sdk 封装好各种逻辑, 然后业务方直接引用即可。

sdk中做的事情一般是监听所有页面事件, 上报所有点击事件以及对应的事件所在的元素，然后通过后台去分析这些数据。

业界有GrowingIO, 神策, 诸葛IO, Heap, Mixpanel等等商业产品

### 实现

1. 监听window元素

```js
window.addEventListener("click", function(event){
    let e = window.event || event;
    let target = e.srcElement || e.target;
}, false);
    
```

2. 获取元素唯一标识 xPath

```js
function getXPath(element) {
    // 如果元素有id属性，直接返回//*[@id="xPath"]
    if (element.id) {
        return '//*[@id=\"' + element.id + '\"]';
    }
    // 向上查找到body，结束查找, 返回结果
    if (element == document.body) {
        return '/html/' + element.tagName.toLowerCase();
    }
    let currentIndex = 1, // 默认第一个元素的索引为1
        siblings = element.parentNode.childNodes;


    for (let sibling of siblings) {
        if (sibling == element) {
            // 确定了当前元素在兄弟节点中的索引后, 向上查找
            return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (currentIndex) +
                ']';
        } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            // 继续寻找当前元素在兄弟节点中的索引
            currentIndex++;
        }
    }
};
```

## 获取元素的位置

```js
function getOffset(event) {
    const rect = getBoundingClientRect(event.target);
    if (rect.width == 0 || rect.height == 0) {
        return;
    }
    let doc = document.documentElement || document.body.parentNode;
    const scrollX = doc.scrollLeft;
    const scrollY = doc.scrollTop;
    const pageX = event.pageX || event.clientX + scrollX;
    const pageY = event.pageY || event.clientY + scrollY;

    const data = {
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(4),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(4),
    };

    return data;
}

```

## 上报

```js
window.addEventListener("click", function(event){
    const e = window.event || event;
    const target = e.srcElement || e.target;
    const xPath = getXPath(target);
    const offsetData = getOffset(event);

    report({ xPath,  ...offsetData});
}, false);
```





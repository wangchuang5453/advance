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




## 代码埋点




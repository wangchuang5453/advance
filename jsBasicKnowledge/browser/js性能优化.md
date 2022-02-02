## defer: 延迟脚本
这个属性的用途是表明脚本在执行时**不会影响页面的构造**

也就是说，脚本会被延迟到**整个页面都解析完毕后**再运行
相当于告诉浏览器，立即下载，延迟执行

html5规范要求，脚本会按照出现的先后顺序执行，因此第一个延迟脚本会先于第二个延迟脚本执行，
而这两个脚本会先于DOMContentLoaded事件执行。
但是在现实场景中，延迟脚本不一定按顺序执行，也不一定会在DOMContentLoaded事件触发前执行，最好只包含一个延迟脚本。

defer属性只适用于外部脚本文件。

## async: 异步脚本
告诉浏览器立即下载文件
不保证脚本按照指定的顺序执行，第二个脚本文件可能会在第一个脚本文件之前执行，因此确保两者之间互不依赖非常重要。
执行async指令的目的是不让页面等待脚本的下载和执行，从而异步加载页面其他内容。
为此，建议异步脚本不要在加载期间修改DOM
异步脚本一定会在页面load事件前执行，但可能在DOMContentLoaded事件触发之前或之后执行。

async属性只适用于外部脚本文件。

--来自《红宝书》

# 性能优化
对页面有个客观的评价，有一个数据体现

解决主要问题到合理范围

1、lighthouse

性能指标:

FPS(Frames Per Second)

CPU

NET

react
fastdom库
读写进行分离，减少重排和重绘

documentfragment

不要过度优化，如果页面性能没有到某个指标，可以写一点不是很优化的代码

react-window => fixedsizelist

react更新组件不全量覆盖修改公用数据，否则会影响其他使用此数据的组件

mousemove 节流函数


webAssembly

使用http2 多路复用

cdn

css 
首次无关的css使用预加载prefetch

css文件压缩

选择器的写法 保持简单

opacity box-shadow border-radius filter :nth-child等样式的使用比较昂贵

减少重排：
改变font-size font-family 
改变元素的内外边距
通过js改变css类
通过js获取dom的位置相关信息
css伪类激活
滚动滚动条或者改变窗口大小
以上都会引起重排

使用flex比使用inline-block 和 float时重排更快，布局有限考虑flex

硬件加速

不要使用@import

图片
渐进式图片加载

响应式图片，不同尺寸加载不同的图片 
图片预加载
图片懒加载

图片压缩工具压缩图片 tinypng 
尽量不要让图片超过200kb  banner图片尽量使用jpg 列表项图片使用png，png有透明通道，加滤镜等一些效果会好一些

字体
字体文件如果加载的慢，会闪烁一下，使用preload加载，会提高加载的优先级

font-spider
npm install font-spider
从字体包中抽出用到的字体




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




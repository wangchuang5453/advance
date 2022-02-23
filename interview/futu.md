cdn 的理解 作用  原理

题 <header> 里面 <link> 大的外联css表 阻塞渲染  浏览器渲染
```html
<header>
  <style>
    .p{
      color: red,
    }
    .c{
      color: green,
    }
  </style>
  <link href="xxx.css">
</header>
<body>
  <div class="p"></div>
  <div class="c"></div>
</body>

```

http网络  缓存 https http2差异 三次握手 四次挥手 
keep-alive 什么情况下会断开tcp连接  
同时发起多个请求建立几个连接
https 非对称加密 私钥公钥

this题 全局用的const a = 1; 不是用的var这样全局没有a
箭头函数this指向声明时的上下文  上下文分为全局和局部的 那么全局的是window 局部根本拿不到对象变量 还是window
然后具体问题具体分析啦

js算法题
验证子数组
顺序数组
[1,2,3,3,4,5]  [1,2,3,3,4]
难点在重复数据那里
我使用的n^2遍历 不够优

方法一：双指针方法，从0位开始逐个比较，相等就一起到下一个索引，如果不相等小的向下一位移动再进行比较
方法二：遍历短的数组，改变长数组为map或者object 
{
  1: 1,
  2: 1,
  3: 2, // 这里是技巧
  ...
}





# 硬件加速

CSS animations, transforms 和 transition 默认并不会启用 GPU 加速


3d变换会启动硬件加速

```css

.cube {
   -webkit-transform: translate3d(250px,250px,250px)
   rotate3d(250px,250px,250px,-120deg)
   scale3d(0.5, 0.5, 0.5);
}

```

尽管我们的元素并不是在 3D 空间中做动画，我们仍然可以启用 3D 渲染。
transform: translateZ(0); 声明在桌面和手机端浏览器中都会触发 GPU 加速。看起来这是触发 GPU 加速的最有效的方式了

```css

.cube {
   -webkit-transform: translateZ(0);
   -moz-transform: translateZ(0);
   -ms-transform: translateZ(0);
   -o-transform: translateZ(0);
   transform: translateZ(0);
   /* Other transform properties here */
}

```

在 Chrome 和 Safari 中使用 CSS transforms 时可能会有闪烁。下面这些声明可以解决这个问题：

```css

.cube {
   -webkit-backface-visibility: hidden; /* 指定当元素背面朝向观察者时是否可见 */
   -moz-backface-visibility: hidden;
   -ms-backface-visibility: hidden;
   backface-visibility: hidden;

   -webkit-perspective: 1000;
   -moz-perspective: 1000;
   -ms-perspective: 1000;
   perspective: 1000;
   /* Other transform properties here */
}

```

另一种可以用在 Webkit 内核的桌面和手机浏览器中的方法是使用 translate3d：

```css

.cube {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
  /* Other transform properties here */
}

```


整理
translate3D
rotate3D
scale3D
translateZ
perspective
backface-visibility [ˌvɪzəˈbɪləti]







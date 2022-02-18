# 点击元素产生背景或边框怎么去掉

ios用户点击一个链接会出现一个半透明灰色遮罩,如果想要禁用可设置-webkit-tap-highlight-color的alpha值为0去除灰色半透明遮罩
    android用户点击一个链接会出现一个边框或者半透明灰色遮罩,不同生产商定义出来效果不一样,可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果
    winphone系统点击标签产生的灰色半透明背景能通过设置去掉
    特殊说明:有些机型去除不了,如小米2,对于按钮类还有个办法,不使用a或input标签,直接用div标签

```css
a,button,input,textarea{ 
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    -webkit-user-modify:read-write-plaintext-only; //-webkit-user-modify有个副作用,就是输入法不再能够输入多个字符
}
或
a,button,input,textarea{ 
-webkit-tap-highlight-color: rgba(0,0,0,0); 
} 

```
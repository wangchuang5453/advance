# BFC
Block Formatting Context
块级格式化上下文

表现原则：具有BFC特性的元素的子元素不会受到外部元素的影响，也不会影响外部元素

触发BFC的几种常见方式
<html>根元素
float: left right both
overflow: auto scroll hidden
position: absolute fixed sticky
display: table-cell table-caption inline-block

所以，BFC 元素是不可能发生 margin 重叠的，因为 margin
重叠是会影响外面的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素
浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会
影响外部元素的设定。

BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实
现更健壮、更智能的自适应布局。


-- 《css世界》
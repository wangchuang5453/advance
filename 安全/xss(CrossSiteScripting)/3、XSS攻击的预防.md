# XSS 攻击的预防

通过前面的介绍可以得知，XSS 攻击有两大要素：

攻击者提交恶意代码。
浏览器执行恶意代码。

## 针对第一个要素：我们是否能够在用户输入的过程，过滤掉用户输入的恶意代码呢？

### 输入过滤

在用户提交时，由**前端过滤**输入，然后提交到后端。这样做**是否可行**呢？

答案是**不可行**。
一旦攻击者绕过前端过滤，直接构造请求，就可以提交恶意代码了。

那么，换一个过滤时机：**后端在写入数据库前，对输入进行过滤，然后把“安全的”内容，返回给前端**。这样**是否可行**呢？

我们举一个例子，一个正常的用户输入了 5 < 7 这个内容，在写入数据库前，被转义，变成了 5 &lt; 7。
问题是：在提交阶段，我们并不确定内容要输出到哪里。

这里的“并不确定内容要输出到哪里”有两层含义：

用户的输入内容可能同时提供给前端和客户端，而一旦经过了 escapeHTML()，**客户端**显示的内容就变成了**乱码**( 5 &lt; 7 )。

在**前端中**，不同的位置所需的编码也不同。

当 5 &lt; 7 作为 HTML 拼接页面时，可以正常显示：
```html
<div title="comment">5 &lt; 7</div>
```

当 5 &lt; 7 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。
这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等。

所以，**输入侧过滤能够在某些情况下解决特定的 XSS 问题，但会引入很大的不确定性和乱码问题。在防范 XSS 攻击时应避免此类方法。**

当然，**对于明确的输入类型，例如数字、URL、电话号码、邮件地址等等内容，进行输入过滤还是必要的**。

## 既然输入过滤并非完全可靠，我们就要通过“防止浏览器执行恶意代码”来防范 XSS。这部分分为两类：

防止 HTML 中出现注入。
防止 JavaScript 执行时，执行恶意代码。

### 预防存储型和反射型 XSS 攻击

存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：

1、改成纯前端渲染，把代码和数据分隔开。
2、对 HTML 做充分转义。

#### 纯前端渲染的过程：

浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。
然后浏览器执行 HTML 中的 JavaScript。
JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。

在纯前端渲染中，我们会明确的告诉浏览器：
下面要设置的内容是文本（.innerText），还是属性（.setAttribute），还是样式（.style）等等。
浏览器不会被轻易的被欺骗，执行预期外的代码了。

但纯前端渲染还需注意避免 DOM 型 XSS 漏洞（例如 onload 事件和 href 中的 javascript:xxx 等，请参考下文”预防 DOM 型 XSS 攻击“部分）。

在很多内部、管理系统中，采用纯前端渲染是非常合适的。
但对于性能要求高，或有 SEO 需求的页面，我们仍然要面对拼接 HTML 的问题。

#### 转义 HTML

如果拼接 HTML 是必要的，就需要采用合适的转义库，**对 HTML 模板各处插入点进行充分的转义**。

常用的模板引擎，如 doT.js、ejs、FreeMarker 等，对于 HTML 转义通常只有一个规则，就是把 & < > " ' / 这几个字符转义掉，**确实能起到一定的 XSS 防护作用，但并不完善**：
XSS安全漏洞	    简单转义是否有防护作用
HTML标签文字内容	 有
HTML属性值	    有
CSS内联样式	    无
内联JavaScript  无
内联JSON	    无
跳转链接	    无

所以要完善 XSS 防护措施，我们**要使用更完善更细致的转义策略**。

例如 Java 工程里，常用的转义库为 org.owasp.encoder。以下代码引用自 org.owasp.encoder 的官方说明。
```html
<!-- HTML 标签内文字内容 -->
<div><%= Encode.forHtml(UNTRUSTED) %></div>

<!-- HTML 标签属性值 -->
<input value="<%= Encode.forHtml(UNTRUSTED) %>" />

<!-- CSS 属性值 -->
<div style="width:<= Encode.forCssString(UNTRUSTED) %>">

<!-- CSS URL -->
<div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">

<!-- JavaScript 内联代码块 -->
<script>
  var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
  alert(msg);
</script>

<!-- JavaScript 内联代码块内嵌 JSON -->
<script>
var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
</script>

<!-- HTML 标签内联监听器 -->
<button
  onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
  click me
</button>

<!-- URL 参数 -->
<a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">

<!-- URL 路径 -->
<a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">

<!--
  URL.
  注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
-->
<a href='<%=
  urlValidator.isValid(UNTRUSTED) ?
    Encode.forHtml(UNTRUSTED) :
    "/404"
%>'>
  link
</a>

```

可见，**HTML 的编码是十分复杂的，在不同的上下文里要使用相应的转义规则**。


### 预防 DOM 型 XSS 攻击




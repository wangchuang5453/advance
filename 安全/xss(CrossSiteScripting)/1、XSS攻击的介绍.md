https://juejin.cn/post/6844903685122703367

# 如何防止XSS攻击?

## 大纲
XSS 攻击的介绍
XSS 攻击的分类
XSS 攻击的预防和检测
XSS 攻击的总结
XSS 攻击案例

## 在开始本文之前，我们先提出一个问题，请判断以下两个说法是否正确：

XSS 防范是后端 RD（研发人员）的责任，后端 RD 应该在所有用户提交数据的接口，对敏感字符进行转义，才能进行下一步操作。
所有要插入到页面上的数据，都要通过一个敏感字符过滤函数的转义，过滤掉通用的敏感字符后，就可以插入到页面中。

如果你还**不能确定答案**，那么可以**带着这些问题向下看**，我们将逐步拆解问题。

### XSS 漏洞的发生和修复

#### 一个案例
XSS 攻击是页面被注入了恶意的代码，为了更形象的介绍，我们用发生在小明同学身边的事例来进行说明。

```html
<input type="text" value="<%= getParameter("keyword") %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= getParameter("keyword") %>
</div>
```
======>

当浏览器请求 http://xxx/search?keyword="><script>alert('XSS');</script> 时，服务端会解析出请求参数 keyword，得到 "><script>alert('XSS');</script>，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：

```html
<input type="text" value=""><script>alert('XSS');</script>">
<button>搜索</button>
<div>
  您搜索的关键词是："><script>alert('XSS');</script>
</div>
```

浏览器无法分辨出 <script>alert('XSS');</script> 是恶意代码，因而将其执行。
这里不仅仅 div 的内容被注入了，而且 input 的 value 属性也被注入， alert 会弹出两次。
面对这种情况，我们应该如何进行防范呢？

其实，这只是**浏览器把用户的输入当成了脚本**进行了执行。那么只要**告诉浏览器这段内容是文本**就可以了

```html
<input type="text" value="<%= escapeHTML(getParameter("keyword")) %>">
<button>搜索</button>
<div>
  您搜索的关键词是：<%= escapeHTML(getParameter("keyword")) %>
</div>
```
escapeHTML() 按照如下规则进行转义：
字符	转义后的字符
&	&amp;
<	&lt;
>	&gt;
"	&quot;
'	&#x27;
/	&#x2F;

经过了转义函数的处理后，最终浏览器接收到的响应为：

```html
<input type="text" value="&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;">
<button>搜索</button>
<div>
  您搜索的关键词是：&quot;&gt;&lt;script&gt;alert(&#x27;XSS&#x27;);&lt;&#x2F;script&gt;
</div>
```

恶意代码都被转义，不再被浏览器执行，而且搜索词能够完美的在页面显示出来。

通过这个事件，小明学习到了如下知识：

通常页面中包含的用户输入内容都在固定的容器或者属性内，以文本的形式展示。
攻击者利用这些页面的用户输入片段，**拼接特殊格式的字符串，突破原有位置的限制**，形成了代码片段。
攻击者通过在目标网站上注入脚本，使之在用户的浏览器上运行，从而引发潜在风险。
通过 HTML 转义，可以防止 XSS 攻击。[事情当然没有这么简单啦！请继续往下看]。

#### 注意特殊的 HTML 属性、JavaScript API
小明又收到安全组的神秘链接：http://xxx/?redirect_to=javascript:alert('XSS')

```html
<a href="<%= escapeHTML(getParameter("redirect_to")) %>">跳转...</a>
``
====>
```html
<a href="javascript:alert(&#x27;XSS&#x27;)">跳转...</a>
```
虽然代码不会立即执行，但一旦用户点击 a 标签时，浏览器会就会弹出“XSS”

在这里，用户的数据**并没有在位置上突破我们的限制**，仍然是正确的 href 属性。但其内容并不是我们所预期的类型。

原来不仅仅是特殊字符，连 **javascript: 这样的字符串**如果出现在特定的位置也会引发 XSS 攻击。

小明眉头一皱，想到了解决办法：
```js
// 禁止 URL 以 "javascript:" 开头
xss = getParameter("redirect_to").startsWith('javascript:');
if (!xss) {
  <a href="<%= escapeHTML(getParameter("redirect_to"))%>">
    跳转...
  </a>
} else {
  <a href="/404">
    跳转...
  </a>
}
```

只要 URL 的开头不是 javascript:，就安全了吧？

安全组随手又扔了一个连接：http://xxx/?redirect_to=jAvascRipt:alert('XSS')

小明欲哭无泪，在判断 URL 开头是否为 javascript: 时，先把用户输入转成了小写，然后再进行比对。

不过，所谓“道高一尺，魔高一丈”。面对小明的防护策略，安全组就构造了这样一个连接：
http://xxx/?redirect_to=%20javascript:alert('XSS')

%20javascript:alert('XSS') 经过 URL 解析后变成 javascript:alert('XSS')，这个**字符串以空格开头**。这样攻击者可以**绕过后端的关键词规则**，又成功的完成了注入。

最终，小明选择了**白名单的方法**，彻底解决了这个漏洞：
```js
// 根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
allowSchemes = ["http", "https"];

valid = isValid(getParameter("redirect_to"), allowSchemes);

if (valid) {
  <a href="<%= escapeHTML(getParameter("redirect_to"))%>">
    跳转...
  </a>
} else {
  <a href="/404">
    跳转...
  </a>
}
```

**通过这个事件，小明学习到了如下知识：**
1、做了 HTML 转义，并不等于高枕无忧。
2、对于链接跳转，如 <a href="xxx" 或 location.href="xxx"，
要检验其内容，禁止以 javascript: 开头的链接，和其他非法的 scheme。

#### 根据上下文采用不同的转义规则

某天，小明为了加快网页的加载速度，把一个数据通过 JSON 的方式内联到 HTML 中：
```html
<script>
var initData = <%= data.toJSON() %>
</script>
```

插入 JSON 的地方不能使用 escapeHTML()，因为转义 " 后，JSON 格式会被破坏。

但安全组又发现有漏洞，原来**这样内联 JSON 也是不安全的**：

当 JSON 中包含 U+2028 或 U+2029 这两个字符时，不能作为 JavaScript 的字面量使用，否则会抛出语法错误。
（U+2028为行分隔符，U+2029为段落分隔符）
当 JSON 中包含字符串 </script> 时，当前的 script 标签将会被闭合，后面的字符串内容浏览器会按照 HTML 进行解析；通过增加下一个 <script> 标签等方法就可以完成注入。

于是我们又要实现一个 escapeEmbedJSON() 函数，对内联 JSON 进行转义。
字符	转义后的字符
U+2028	\u2028
U+2029	\u2029
<	\u003c

修复后的代码如下：
```js
<script>
var initData = <%= escapeEmbedJSON(data.toJSON()) %>
```

**通过这个事件，小明学习到了如下知识：**
HTML 转义是非常复杂的，在不同的情况下要采用不同的转义规则。如果采用了错误的转义规则，很有可能会埋下 XSS 隐患。
应当尽量避免自己写转义库，而应当采用成熟的、业界通用的转义库。

#### 漏洞总结

小明的例子讲完了，下面我们来**系统的看下 XSS 有哪些注入的方法**：

在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
在 onload、onerror、onclick 等事件中，注入不受控制代码。
在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

总之，如果**开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中**，这很容易造成注入漏洞。
攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。








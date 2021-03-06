# XSS 攻击的总结

我们回到最开始提出的问题，相信同学们已经有了答案：

1、XSS 防范是后端 RD 的责任，后端 RD 应该在所有用户提交数据的接口，对敏感字符进行转义，才能进行下一步操作。

不正确。因为：

防范存储型和反射型 XSS 是后端 RD 的责任。而 DOM 型 XSS 攻击不发生在后端，是前端 RD 的责任。防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。
转义应该在输出 HTML 时进行，而不是在提交用户输入时。

2、所有要插入到页面上的数据，都要通过一个敏感字符过滤函数的转义，过滤掉通用的敏感字符后，就可以插入到页面中。

不正确。 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。

整体的 XSS 防范是非常复杂和繁琐的，我们不仅需要在全部需要转义的位置，对数据进行对应的转义。
而且要防止多余和错误的转义，避免正常的用户输入出现乱码。

**虽然很难通过技术手段完全避免 XSS，但我们可以总结以下原则减少漏洞的产生：**

利用模板引擎
开启模板引擎自带的 HTML 转义功能。例如：
在 ejs 中，尽量使用 <%= data %> 而不是 <%- data %>；
在 doT.js 中，尽量使用 {{! data } 而不是 {{= data }；
在 FreeMarker 中，确保引擎版本高于 2.3.24，并且选择正确的 freemarker.core.OutputFormat。

避免内联事件
尽量不要使用 onLoad="onload('{{data}}')"、onClick="go('{{action}}')" 这种拼接内联事件的写法。在 JavaScript 中通过 .addEventlistener() 事件绑定会更安全。

避免拼接 HTML
前端采用拼接 HTML 的方法比较危险，如果框架允许，使用 createElement、setAttribute 之类的方法实现。或者采用比较成熟的渲染框架，如 Vue/React 等。

时刻保持警惕
在插入位置为 DOM 属性、链接等位置时，要打起精神，严加防范。

增加攻击难度，降低攻击后果
通过 CSP、输入长度配置、接口安全措施等方法，增加攻击的难度，降低攻击的后果。

主动检测和发现
可使用 XSS 攻击字符串和自动扫描工具寻找潜在的 XSS 漏洞。


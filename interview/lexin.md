sourcemap 线上定位问题怎么做

域名不同的页面之间跳转怎么保持登录状态

vue-router 相关问题一堆

组件库组件按需引用 怎么实现的
import { Button } from 'element-ui';
Vue.use(Button);

Babel-plugin-component 转换为
// 全局引入
var ElementUI = require('element-ui/lib')
require('element-ui/lib/theme-chalk/index.css')
Vue.use(ElementUI)
// 按需引入
var Button = require('element-ui/lib/button.js')
require('element-ui/lib/theme-chalk/button.css')
var Checkbox = require('element-ui/lib/checkbox.js')
require('element-ui/lib/theme-chalk/checkbox.css')
Vue.use(Button)
Vue.component(Checkbox.name, Checkbox)
```js .babelrc配置
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

安全类的问题
xss csrf
如何做一些安全处理

token机制


...

# 2
第三方接口怎么不借助后台跨域

cdn作用，如何找到的最近的节点

webpack打包加速 缓存 打包范围 并行 并行怎么保证不出问题，原理是什么

组件库设计  如何切换主题

vue3 proxy加入的意义 作用

聊项目，主要就是聊项目

# 3 
# require 和 import 的区别

导入require 导出exports/module.exports 是commonjs标准
import/export是es6标准

require是运行时才会加载，可以在任何地方执行
import是编译时执行，会提升到这个模块的头部，具有置顶性

commonjs输出的是值的拷贝，es6输出的是值的引用






1.遵循规范

require 是CMD规范引入方式
import是es6的语法标准，如要兼容浏览器的话必须转化成es5的语法

2.调用时间

require是运行时调用，所以require理论上可以运用在代码的任何地方
import是编译时调用，所以必须放在文件开头

3.本质

require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
import是解构过程，但是目前所有的引擎都还没有实现import，我们使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

4.性能

require的性能相对于import稍低，因为require是在运行时才引入模块并且还赋值给某个变量
import只需要依据import中的接口在编译时引入指定模块所以性能稍高



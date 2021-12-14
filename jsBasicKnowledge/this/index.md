# this指针 详解

## 概念

this是当前函数/当前模块的运行环境上下文，是一个指针型变量，普通函数的this是在调用的时候才被绑定确定指向的。

通过不同的this调用同一个函数，可以产生不同的结果。

到底如何确认this绑定的内容是什么呢？

## this的绑定规则

### 默认绑定

```js
function a() {

}
a();
```
函数独立调用的时候，不带任何修饰的函数引用。

* 非严格模式下，this指向全局对象（浏览器：window，node：global）
* 严格模式，this指向undefined，严格模式下不允许指向全局对象

```js
var a = 'wangchuang';

var b = {
  a: 'wang',
  foo: function () {
    console.log(this.a);
  }
}

var c = b.foo;
c(); // 放到浏览区环境下执行，打印 wangchuang
```

Tips: 普通函数作为参数传递 setTimeout setInterval

```js
var a = 'wangchuang';

var b = {
  a: 'wang',
  foo: foo,
}

function foo() {
  console.log(this); // {a: 'wang', foo: ƒ}
  setTimeout(function () {
    console.log(this.a); // wangchuang
  }, 1000);
}

b.foo();
```

### 隐式绑定

与默认绑定相反，函数调用的时候有显示的修饰，比如某个对象的调用

链式调用时候，函数就近指向

```js

function sayHi() {
  console.log(this.name);
}

var foo = {
  name: 'wangchuang',
  sayHi: sayHi
}

var bar = {
  name: 'wang',
  foo: foo,
}

bar.foo.sayHi(); // wangchuang
```

### 显式绑定

call apply bind

可以修改函数的this指向

#### call 和 apply 的异同

* 都是改变this指向，然后执行原有函数
* 第一个参数都是作为this的，绑定到函数的this上，如果不传参数，fun.call()，非严格模式下，this会绑到全局对象
* 除了this外，参数区别

```js
func.call(this, arg1, arg2, ...)

func.apply(this, [arg1, arg2, ...])

```

Tips：如果call的第一个参数，传了数字或者字符串等基本类型会发生什么？

```js

function getThisType() {
  console.log(this, typeof this);
}

getThisType.call(1); // [Number: 1] object
getThisType.call('wang'); // [String: 'wang'] object

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
```

#### bind

bind方法，会创建一个新的函数
当这个新函数被调用的时候，bind的第一个参数会作为函数运行时的this，之后的一系列参数都会在传递的实参前传入作为他的参数。

```js
func.bind(this, arg1, arg2)

```

```js
var test = {
  name: 'wang',
  age: '10',
  sayHi: function (params) {
    console.log(params + '' + this.name);
  }
}

var t2 = test.sayHi.bind({name: 'haha', age: 2}, 'dada');

t2(); // dadahaha 这里没有修饰但是没有指向全局，说明有优先级
```

### new

创建一个新对象
将构造函数的原型赋值给这个新对象的__proto__
执行构造函数的代码，将this指向新对象
如果构造函数中有return返回值，如果返回的是对象，那么直接返回这个对象，如果不是那么返回新对象

```js
// 模拟new
function _new(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

```

### this绑定优先级

new > 显式 > 隐式 > 默认




## 箭头函数

* 箭头函数没有arguments

```js

function a() {
  return () => {
    console.log(arguments); // 拿的是a的参数
  }
}

let nums = (...args) => console.log(args); // 可以通过解构的方式拿参数

```

* 箭头函数没有构造函数

本身没有 constructor，所以不能new来构造函数

* 箭头函数没有原型对象

```js
let fun = () => {}
console.log(fun.prototype); // undefined

console.log(fun.prototype.constructor); // 报错

```

* 没有自己的this

箭头函数中的this是由定义的位置决定的，普通函数式调用的时候才绑定的

## 面试题

```js
var name = '123';

var obj = {
  name: 'wang',
  print: function () {
    function a() {
      console.log(this.name);
    }
    a(); // 默认绑定
  }
}

obj.print(); // 123
```










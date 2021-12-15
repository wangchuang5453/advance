# 作用域

作用域决定了代码区块中变量和其他资源的可见性

全局作用域
函数作用域

es6
块级作用域

## 全局作用域

代码任何地方都能访问到的对象，拥有全局作用域

* 最外层函数
* 嘴外层的全局变量
* window

## 函数作用域

指声明在函数内部的变量

## 块级作用域

* 在一个函数内部
* 在一个代码块内部{}

块级作用域的特点
* 声明变量不会被提升到代码块顶部
* 禁止重复声明
* 变量只在当前块有效


## 作用域链

在找一个变量的时候，如果 当前作用域 找不到，会逐级往上查找

当前作用域是指执行函数的作用域还是创建函数的作用域？
是指创建函数的作用域！！！

```js

var a = 10;

function fn() {
  var b = 20;
  function bar () {
    console.log(a + b);
  }
  return bar;
}

var x = fn(), b = 200;
x(); // 30

```

## 面试题

1、变量提升
声明被提升，但是赋值没有被提升

```js

function v() {
  var a = 6;
  function a() {
    
  }
  console.log(a);
}
v(); // 6
// ==> 上述代码执行时相当于下面的代码

function v() {
  var a; // 变量提升 声明提升，但是赋值不提升
  function a() { // 变量提升
    
  }
  a = 6; // 赋值
  console.log(a);
}


```

```js
function v() {
  var a;
  function a() {
    
  }
  console.log(a);
}
v(); // [function] a

```

```js

function v() {
  console.log(a); // [function] a
  var a = 1;
  console.log(a); // 1
  function a() {}
  console.log(a); // 1
  console.log(b); // [function] b
  var b = 2;
  console.log(b); // 2
  function b() {}
  console.log(b); // 2
}
v();

```


手写bind
```js

Function.prototype.myBind = function (context, ...args) {
  context = context || window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  console.log(this);

  return function (..._args) {
    args = args.concat(_args);
    context[fnSymbol](...args);
    delete context[fnSymbol];
  }
}

let obj = {
  name: 'hah',
  fn(param) {
    this.name = 'hhh';
    // console.log(this);/
    console.log(param);
  }
}

const fn = obj.fn.myBind(obj, 1);
fn();
// console.log(obj);

```

手写call apply

```js

Function.prototype.myCall = function (context, ...args) {
  context = typeof context == 'object' ? context : window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];
  return result;
}

Function.prototype.myApply = function (context, args) {
  context = typeof context == 'object' ? context : window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];
  return result;
}
```

## 课后题及资料


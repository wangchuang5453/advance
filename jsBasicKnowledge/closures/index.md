# 闭包的概念及应用场景

闭包就是指那些能够访问自由变量的函数。

自由变量指函数中使用的，既不是函数参数也不是函数局部变量的变量。

1、从理论角度：所有的函数都是闭包，因为都能访问到全局变量
2、从实践角度：
  1、即使创建它的上下文已经销毁，它仍然存在（比如：内部函数，从父函数返回）
  2、代码中引用了自由变量

## 应用场景

1、柯里化函数

避免频繁的调用具有相同参数的函数，同时又可以轻松复用

封装一个高阶函数

2、实现私有方法和变量

其实就是模块的方式，现代化的打包最终其实就是每个模块的代码相互独立

3、匿名的自执行函数

```js

var func = (
  var num = 0;
  return function() {
    num++;
    return num;
  }
)()

```

4、缓存一些结果

在外部函数创建一个数组，闭包函数可以更改/获取数组的值。

```js

function a() {
  let arr = [];
  return function (param) {
    arr.push(param);
    console.log(arr.join(','))
  }
}

const fn = a();

f(1); // 1
f(2); // 1,2

```

## 面试题

```js

function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

function fn4(x) {
  return x + 4;
}

function compose(...args) {
  return function (val) {
    return args.reduce((value, fn) => {
      return fn(value)
    }, val)
  }  
}

const a = compose(fn1, fn2, fn3, fn4);

console.log(a(1)); // 1+4+3+2+1

```

```js

function currying(fn, ...args) {
  const originFnArgsLength = fn.length;
  //
  let allArgs = [...args];

  const resFn = (...newArgs) => {
    //
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === originFnArgsLength) {
      return fn(...allArgs);
    } else {
      return resFn;
    }
  }
  return resFn;
}

const add = (a,b,c) => a + b + c;

const a1 = currying(add, 1);
const a2 = a1(2);
console.log(a2(3)); // 6

```


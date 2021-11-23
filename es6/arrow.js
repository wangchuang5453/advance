// 箭头函数

/**
 * 箭头函数的this是在函数定义时位置决定的，普通函数的this是在使用时决定的
 * 
 * 对于普通函数来说，内部的this指向函数运行时所在的对象
 * 
 * 箭头函数没有自己的this对象，内部的this就是定义时上层作用域中的this
 */

const teacher = {
  name: 'wangchuang',
  getName: () => {
    return this.name;
  }
}

console.log(teacher.getName()); // undefined

/**
 * {} 会被认为是函数体，如果简写返回对象时候要用()包起来
 * @returns 
 */
const a = () => ({});
const b = () => 2;

console.log(a());
console.log(b());


/**
 * 箭头函数能不能用作构造函数？
 * 当然不能！！
 * 构造函数的this要指向new出来的实例，使用箭头函数的this是在定义的时候就被指向了
 */



/**
 * Babel 转箭头函数产生的 ES5 代码，就能清楚地说明this的指向
 */

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}

// 箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向
// arguments、super、new.target在函数中也是不存在的
// 没有arguments，要用rest去替代


/**
 * this
 */

// 1、如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window
var obj = {
  value:0,
  fn:function(){
    this.value ++
  }
}
obj.fn();
console.log(obj.value); // 1

// ======
var obj = {
  value:0,
  fn:function(){
    var f = function(){
      this.value ++
    }
    f();
  }
}
obj.fn();
console.log(obj.value); // 0  this指向window


// =======
var obj = {
  value:0,
  fn:function(){
    var _this = this;
    var f = function(){
      _this.value ++
    }
    f();
  }
}
obj.fn();
console.log(obj.value); // 1

// 2、 this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的
var o = {
  a:10,
  b:{
      a:12,
      fn:function(){
          console.log(this.a); //undefined
          console.log(this); //window
      }
  }
}
var j = o.b.fn;
j();

/**
 * this 相关题目
 * @param {*} n 
 * @returns 
 */
// question 1
function foo(n) {
  var f = () => arguments[0] + n;
  return f();
}

let res = foo(2);

console.log(res); // 问 输出结果  4

// question2
function A() {
  this.foo = 1
}

A.prototype.bar = () => console.log(this.foo)

let a = new A()
a.bar() // 问 输出结果 undefined

// question3
let res = (function pt() {
  return (() => this.x).bind({ x: 'inner' })();
}).call({ x: 'outer' });

console.log(res)  // 问 输出结果 'outer'

// question4
window.name = 'window_name';

let obj1 = {
    name:'obj1_name',
    print:()=>console.log(this.name)
}

let obj2 = {name:'obj2_name'}

obj1.print()  // 问 输出结果  'window_name'
obj1.print.call(obj2)  // 问 输出结果 'window_name'

// question5
let obj1 = {
  name:'obj1_name',
  print:function(){
      return ()=>console.log(this.name)
  }
}

let obj2 = {name:'obj2_name'}


obj1.print()() // 问 输出结果  'obj1_name'
obj1.print().call(obj2) // 问 输出结果  'obj1_name'
obj1.print.call(obj2)() // 问 输出结果  'obj2_name'


/**
 * new 发生了什么
 * 
 * 构造函数如果有返回值
 * 如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
 */
// function _new(fn, ...arg) {
//   const obj = Object.create(fn.prototype);
//   const ret = fn.apply(obj, arg);
//   return ret instanceof Object ? ret : obj;
// }

// （1）创建一个新对象；
// （2）将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
// （3）执行构造函数中的代码（为这个对象添加属性和方法）
// （4）返回新对象
/**
 * 默认值 解构赋值
 * @param {} param0 
 */
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot destructure property 'x' of 'undefined' as it is undefined.


/**
 * 参数默认值的位置
 */
function f(x = 1, y) {
  return [x, y];
}
// f(, 1) // 报错    eslint校验都过不了

/**
 * 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
 */
function foo(x = 5, y = 6) {
  console.log(x, y);
}

foo(undefined, null)
// 5 null


/**
 * 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域
 */

// 1、参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

// 2、函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1

// 3、全局变量x不存在，就会报错
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined


// 4、
// 函数foo的参数形成一个单独作用域  匿名函数内部的变量x，指向同一个作用域的第一个参数x
// 函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，不是同一个变量
// 执行y后，内部变量x和外部全局变量x的值都没变
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

// 4+ 函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1



/**
 * 利用参数默认值，可以指定某一个参数不得省略
 */
function throwIsMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIsMissing()) {
  console.log(mustBeProvided);
}

foo();


/**
 * 可以将参数默认值设为undefined，表明这个参数是可以省略的
 */
function foo(optional = undefined) {  }


/**
 * rest 参数
 * 使用扩展运算符
 */
// arguments变量的写法
function sortNumbers() {
  return Array.from(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

// arguments对象不是数组，是一个类似数组的对象。
// 为了使用数组的方法，必须使用Array.from先将其转为数组
// rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。

/**
 * rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
 * rest本就是剩余的意思
 */
// 报错
function f(a, ...b, c) {
  // ...
}

















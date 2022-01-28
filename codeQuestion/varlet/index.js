var a = 10;

function say() {
  console.log(a);
  var a = 20;
  console.log(a);
}

function say1() {
  console.log(a);  // 暂时性死区，只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
  let a = 20;
  console.log(a);
}

// say() // undefined  20
// say1() // 报错 20

function test() {
  var tmp = 123;

  if (true) { // 块级作用域
    tmp = 'abc'; // ReferenceError
    let tmp;
  }

  if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError
  
    let tmp; // TDZ结束
    console.log(tmp); // undefined
  
    tmp = 123;
    console.log(tmp); // 123
  }
}

// test()

/**
 * 有些“死区”比较隐蔽，不太容易发现。
 */
function bar(x = y, y = 2) { // y还没有声明，属于“死区”
  return [x, y];
}

bar(); // 报错

/**
 * 使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。
 */
function bar2(params) {
  // 不报错
  var x = x;
}

function bar3(params) {
  // 报错
  let x = x;
  // ReferenceError: x is not defined
}

/**
 * let不允许在相同作用域内，重复声明同一个变量
 */
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错

/**
 * 总结： 
 * 暂时性死区 没有声明完不能使用
 * 不允许重复声明
 * 声明的变量就“绑定”（binding）这个区域，不再受外部的影响
 * 
 */









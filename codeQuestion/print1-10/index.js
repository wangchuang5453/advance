/**
 * 从 1-10，按顺序每秒输出一个数字
 */

// es5
function printNum () {
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(i);
    }, 1000 * i);
  }
}

// printNum();

// es5
function printNum1 () {
  for (var i = 1; i <= 10; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, 1000 * i);
    })(i)
  }
}

printNum1();









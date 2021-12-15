var length = 3;

function fn() {
  console.log(this.length);
}

var obj = {
  name: 'wang',
  print: function (fn) {
    fn(); // 3
    arguments[0](); // 2  - arguments是类数组对象，{ 0:fn, 1: 1, length:2 }，它有个length
  }
}

obj.print(fn, 1); // 3   2




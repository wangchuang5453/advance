/**
 * 柯里化
 */

function curry(fn, ...args) {
  let allArgs = [...args];
  const resFn = function (...newArgs) {
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === fn.length) {
      return fn(...allArgs); // 执行完要停止代码运行
    } else {
      return resFn;
    }
  }
  return resFn;
}

const add = (a,b,c) => a + b + c;

const a1 = curry(add, 1);
const a2 = a1(2);
console.log(a2(3)); // 6
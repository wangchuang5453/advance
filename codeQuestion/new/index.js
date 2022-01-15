/**
 * new 模拟实现
 */

function newFn(fn, ...args) {
  let obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  return (typeof res === 'object' && res !== null) ? res : obj;
}

function Test(a) {
  this.a = a;
  this.b = 1;
  // return null;
  return {c: 1};
}

console.log(newFn(Test, 2));


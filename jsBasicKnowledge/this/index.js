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

// const fn = obj.fn.myBind(obj, 1);
// fn();
// console.log(obj);


Function.prototype.myCall = function (context, ...args) {
  context = typeof context == 'object' ? context : window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];
  return result;
}

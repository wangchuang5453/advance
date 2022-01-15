/**
 * bind
 */

Function.prototype.bind = function(context, ...args) {
  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  return function (..._args) {
    args = args.concat(_args);
    context[fnSymbol](...args);
    delete context[fnSymbol]; // 因为改变了context
  }
}

Function.prototype.call = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  context[fnSymbol](...args);
  delete context[fnSymbol]; // 因为改变了context
}

Function.prototype.apply = function (context, argsArr) {
  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  context[fnSymbol](...argsArr);
  delete context[fnSymbol]; // 因为改变了context
}
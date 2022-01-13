/**
 * 如果持续触发事件，每隔一段时间，只执行一次
 */

function throttle(fn, wait) {
  let timer;
  return function (...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.call(context, ...args);
      }, wait);
    }
  }
}
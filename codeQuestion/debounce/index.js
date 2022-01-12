/**
 * 防抖函数
 * @param {*} params 
 */
function debounce(fn, wait) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  }
}

// ==> 优化 处理this

function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, wait);
  }
}

// ==> 还有很多版本 待续




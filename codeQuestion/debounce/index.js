/**
 * 防抖函数
 * 原理：触发完事件一段时间内不再触发事件，才执行函数
 * @param {*} params 
 */
function debounce(fn, wait) {
  let timer;
  return function () {
    clearTimeout(timer); // clear null 不会报错
    timer = setTimeout(fn, wait);
  }
}

// ==> 优化 处理this

function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, wait);
  }
}

// ==> 立即执行 版本
/**
 * 这个时候，代码已经很是完善了，但是为了让这个函数更加完善，我们接下来思考一个新的需求。
 * 
 * 这个需求就是：
 * 
 * 我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
 * 
 * 想想这个需求也是很有道理的嘛，那我们加个 immediate 参数判断是否是立刻执行。
 */

function debounce(fn, wait, immediate) {
  let timer;
  return function (...args) { // 迭代的思想，函数体不断被调用
    const context = this;
    if (timer) clearTimeout(timer); // 加上判断节省一次清除
    if (immediate) {
      if (!timer) {
        fn.call(context, ...args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        fn.call(context, ...args);
      }, wait);
    }
  }
}


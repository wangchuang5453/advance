/**
 * 交换函数
 * 
 */
const swap = function (arr, i, j) {
  if (i === j) {
    return;
  }
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
exports.swap = swap;
/**
 * 生成随机整数数组
 * @param {*} n 
 * @param {*} rangL 
 * @param {*} rangR 
 * @returns 
 */
exports.generateRandomArray = function (n, rangL, rangR) {
  const arr = [];
  rangL = Math.ceil(rangL);
  rangR = Math.floor(rangR);
  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * (rangR - rangL + 1)) + rangL; //含最大值，含最小值 
    arr[i] = random;
  }
  return arr;
}

/**
 * 测试算法性能
 */
exports.testSort = function (fn, arr) {
  console.time(fn.name);  
  fn(arr);
  console.timeEnd(fn.name);
  const status = isSorted(arr);
  console.log(`is sorted: ${status}`);
}

/**
 * 验证是否有序
 */
const isSorted = function (arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true;
}

/**
 * 得到一个两数之间的随机整数
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
/**
 * 生成近乎有序的整数数组
 */
exports.generateNearlyOrderedArray = function (n, swapTimes) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  for (let i = 0; i < swapTimes; i++) {
    let posx = getRandomInt(0, n);
    let posy = getRandomInt(0, n);
    swap(arr, posx, posy);
  }
  return arr;
}

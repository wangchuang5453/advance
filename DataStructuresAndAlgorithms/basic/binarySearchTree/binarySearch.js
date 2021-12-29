/**
 * 二分查找法
 */
// 迭代版本
function binarySearch(arr, n, target) {
  // [l,r]
  let l = 0; // 数组索引
  let r = n - 1;
  while (l <= r) {
    // const mid = Math.floor((l+r)/2);
    // 上面方式如果 l r过大，会造成溢出
    // 优化为
    const mid = l + Math.floor((r-l)/2);
    if (arr[mid] === target) {
      return mid;
    } else if (target < arr[mid]) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// 递归版本
function binarySearch2(arr, n, target) {
  _binarySearch(arr, target, 0, n-1);
}

function _binarySearch(arr, target, l, r) { // [l, r]
  if (l > r) { // 首要考虑停止条件
    return -1;
  }
  const mid = l + Math.floor((r-l)/2);
  if (arr[mid] === target) {
    return mid;
  } else if (target < arr[mid]) {
    return _binarySearch(arr, target, l, mid-1)
  } else {
    return _binarySearch(arr, target, mid+1, r)
  }
}


/**
 * 二分查找法的变种
 * 同时满足：
 * 1、如果要找的数据有重复的相等数据
 * floor 表示第一次出现的索引
 * ceil  表示最后一次出现的索引
 * 2、如果查找42没有，但是有41和43，那么floor不是返回-1，而是返回41，ceil返回43
 * 
 */

// 二分查找法, 在有序数组arr中, 查找target
// 如果找到target, 返回第一个target相应的索引index
// 如果没有找到target, 返回比target小的最大值相应的索引, 如果这个最大值有多个, 返回最大索引
// 如果这个target比整个数组的最小元素值还要小, 则不存在这个target的floor值, 返回-1
function binarySearchFloor(arr, n, target) {
  if (n < 0) {
    return;
  }
  let l = -1; // 如果target比整个数组都小，那么r会一直取值到-1，最后就是l==r拿到l为-1
  let r = n - 1;
  while (l < r) {
    // 向上取整是为了防止跳不出循环，如果存在target，指针-1寻找前一个数据，所有数据都小于
    // target，指针会一直给l赋值。如果是向下取整，最后2个数据的时候，左边的值会一直赋给l,
    // l<r进入死循环。如果向上取整就会在此情况下拿到右边的值，得到l==r跳出循环。
    let mid = l + Math.floor((r-l+1)/2);
    if (arr[mid] >= target) {
      r = mid - 1;
    } else {
      l = mid;
    }
  }
  if (l + 1 < n && arr[l + 1] === target) {
    return l + 1;
  }
  return l;
}

// 二分查找法, 在有序数组arr中, 查找target
// 如果找到target, 返回最后一个target相应的索引index
// 如果没有找到target, 返回比target大的最小值相应的索引, 如果这个最小值有多个, 返回最小的索引
// 如果这个target比整个数组的最大元素值还要大, 则不存在这个target的ceil值, 返回整个数组元素个数n
function binarySearchCeil(arr, n, target) {
  if (n < 0) {
    return;
  }
  let l = 0;
  let r = n;
  while (l < r) {
    // 向下取整
    let mid = l + Math.floor((r-l)/2);
    if (arr[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  if (r - 1 >= 0 && arr[r - 1] === target) {
    return r - 1;
  }
  return r;
}
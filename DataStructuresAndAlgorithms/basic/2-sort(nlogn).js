const { insertionSortLR } = require('./1-sort(n^2).js');

/**
 * 归并排序 Merge Sort
 * 
 */

function mergeSort(arr) {
  const n = arr.length;
  
  _mergeSort(arr, 0, n-1)

}

function _mergeSort(arr, l, r) { // [l, r]
  if (l >= r) {
    return;
  }
  /**优化 */
  // if (r - l <= 15) {
  //   insertionSortLR(arr, l, r);
  //   return;
  // }

  let mid = Math.floor( (l + r) / 2 );

  _mergeSort(arr, l, mid);

  _mergeSort(arr, mid + 1, r);

  if (arr[mid] > arr[mid + 1]) { // 有序数据的优化
    _merge(arr, l, mid, r);
  }
  // _merge(arr, l, mid, r);
}

function _merge(arr, l, mid, r) {
  const copy = [];
  for (let i = l; i <= r; i++) {
    copy[i - l] = arr[i];
  }
  // console.log(copy);

  let i = l;
  let j = mid + 1;
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = copy[j - l];
      j++;
    } else if (j > r) {
      arr[k] = copy[i - l];
      i++;
    } else if (copy[i - l] < copy[j - l]) {
      arr[k] = copy[i - l];
      i++;
    } else {
      arr[k] = copy[j - l];
      j++;
    }
  }
}

/**
 * merge sort 自底向上
 */



module.exports = {
  mergeSort
}
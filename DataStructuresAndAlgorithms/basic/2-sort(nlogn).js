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

  _mergeSort(arr, l, mid); // 范围内数据已经通过归并完成了排序

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
    if (i > mid) { // 肯定有一个先处理完，如果先是i这边的话，j那边一定没处理完
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
 * 
 * 意义所在？
 */

function mergeSortBU(arr) { // 比上面的慢一些
  const n = arr.length;
  for (let sz = 1; sz < n; sz += sz) { // 1 2 4 8
    for (let i = 0; i + sz < n; i += sz + sz) { // 2sz代表一个[l,r]
      _merge(arr, i, i + sz -1, Math.min(i + sz + sz - 1, n - 1));
    }
  }
}

module.exports = {
  mergeSort,
  mergeSortBU,
}
const { swap } = require('./sortTestHelper.js');
/**
 * 选择排序 O(n^2)
 */

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) { // less(arr[j], arr[minIndex]) 函数 - 定义排序规则
        minIndex = j;
      }
    }
    swap(arr, minIndex, i);
  }
}

// const n = 10000;
// const testArr = generateRandomArray(n, 0, 100000);
// let selectArr = testArr.concat([]);
// testSort(selectionSort, selectArr);

/**
 * 插入排序 insertion sort O(n^2)
 * 类似扑克牌
 */

function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1)
      } else {
        break;
      }
    }
  }
}
// =>
function insertionSort2(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1);
    }
  }
}
// => 优化
function insertionSort3(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let e = arr[i];
    let j;
    for (j = i; j > 0 && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1];
    }
    // 循环最后j还会减一次1
    arr[j] = e;
  }
}

// [l, r]
function insertionSortLR(arr, l, r) {
  for (let i = l + 1; i <= r; i++) {
    let e = arr[i];
    let j;
    for (j = i; j > l && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1];
    }
    // 循环最后j还会减一次1
    arr[j] = e;
  }
}

// let insertArr = testArr.concat([]);
// let orderedArr = generateNearlyOrderedArray(10000, 100);
// console.log(orderedArr);
// testSort(insertionSort3, orderedArr.concat([]));

/**
 * 作业
 * 1、冒泡排序
 * 用所学分析插入排序的过程去分析
 * 排序能不能优化
 * 试着分析在各种情况下的性能
 * 和插入排序和选择排序的差别
 * 2、shell sort 希尔排序
 * 和插入排序思想相近
 */



/**
 * bubble sort 冒泡排序
 * 
 *  n-1 轮
 */
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

/**
 * shell sort
 * 希尔排序
 */
function shellSort(arr) {
  const n = arr.length;
  
  let h = 1;
  
  while (h < Math.floor(n/3)) {
    h = h * 3 + 1; // sequence 1 4 13 40 121 364 1093 ...    => n^3/2
  }

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      let j;
      let e = arr[i];
      for (j = i; j >= h && arr[j - h] > e; j-=h) {
        arr[j] = arr[j - h];
      }
      arr[j] = e;
    }

    h = Math.floor(h/3)
  }
}



module.exports = {
  selectionSort,
  insertionSort3,
  bubbleSort,
  shellSort,
  insertionSortLR,
}



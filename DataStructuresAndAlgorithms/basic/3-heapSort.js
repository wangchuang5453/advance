const { swap } = require('./sortTestHelper.js');

/**
 * 最大堆
 */

class MaxHeap {
  constructor() {
    this.count = 0;
  }
  
  _data = [];

  _shiftUp(k) {
    while(k > 1 && this._data[Math.floor(k/2)] < this._data[k]) {
      swap(this._data, Math.floor(k/2), k);
      k = Math.floor(k/2);
    }
  }

  _shiftDown(k) {
    while(2*k <= this.count) {
      let j = 2*k;
      if (j+1 <= this.count && this._data[j+1] > this._data[j]) {
        j++;
      }
      if (this._data[k] >= this._data[j]) {
        break;
      }
      swap(this._data, k, j); // 可像插入排序一样，一步步挪，然后赋值，而不是一直交换
      k = j;
    }
  }

  get data() {
    return this._data;
  }

  size() {
    return this.count;
  }

  clear() {
    this._data = null;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(item) {
    this._data[this.count + 1] = item; // 堆从1开始
    this.count++;
    this._shiftUp(this.count);
  }

  extractMax() {
    if (this.count === 0) {
      return;
    }
    let ret = this._data[1];
    swap(this._data, 1, this.count);
    this._data.splice(this.count, 1);
    this.count--;
    this._shiftDown(1);
    return ret;
  }
}

/**
 * 
 */
class MaxHeap2 {
  constructor(arr, n) {
    for (let i = 0; i < n; i++) {
      this._data[i + 1] = arr[i];
    }
    this.count = n;
    for (let i = Math.floor(this.count/2); i >= 1; i--) {
      this._shiftDown(i);
    }
  }
  
  _data = [];

  _shiftUp(k) {
    while(k > 1 && this._data[Math.floor(k/2)] < this._data[k]) {
      swap(this._data, Math.floor(k/2), k);
      k = Math.floor(k/2);
    }
  }

  _shiftDown(k) {
    while(2*k <= this.count) {
      let j = 2*k;
      if (j+1 <= this.count && this._data[j+1] > this._data[j]) {
        j++;
      }
      if (this._data[k] >= this._data[j]) {
        break;
      }
      swap(this._data, k, j); // 可像插入排序一样，一步步挪，然后赋值，而不是一直交换
      k = j;
    }
  }

  get data() {
    return this._data;
  }

  size() {
    return this.count;
  }

  clear() {
    this._data = null;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(item) {
    this._data[this.count + 1] = item; // 堆从1开始
    this.count++;
    this._shiftUp(this.count);
  }

  extractMax() {
    if (this.count === 0) {
      return;
    }
    let ret = this._data[1];
    swap(this._data, 1, this.count);
    this._data.splice(this.count, 1);
    this.count--;
    this._shiftDown(1);
    return ret;
  }
}

// const maxHeap = new MaxHeap();

// for (let i = 0; i < 15; i++) {
//   maxHeap.insert(Math.floor(Math.random()*101));
// }
// console.log(maxHeap.data);
// // while(!maxHeap.isEmpty()) {
//   let max = maxHeap.extractMax();
//   console.log(max);
//   console.log(maxHeap.data);
// // }


/**
 * 基础堆排序
 */
function heapSort1(arr) {
  const n = arr.length;
  const maxHeap = new MaxHeap();
  for (let i = 0; i < n; i++) {
    maxHeap.insert(arr[i]);
  }
  for (let i = n-1; i >= 0; i--) {
    arr[i] = maxHeap.extractMax();
  }
}

/**
 * Heapify
 * 
 */
function heapSort2(arr) {
  const n = arr.length;
  const maxHeap = new MaxHeap2(arr, n);
  for (let i = n-1; i >= 0; i--) {
    arr[i] = maxHeap.extractMax();
  }
}

/**
 * 优化的堆排序
 * (Heap Sort)
 * 原地堆排序 从索引0开始
 */

function heapSort3(arr, n) {
  // heapify
  // 从0开始计算
  for (let i = Math.floor((n-1-1)/2); i >= 0; i--) {
    _shiftDown3(arr, n, i);
  }

  for (let i = n-1; i > 0 ; i--) {
    swap(arr, 0, i);
    _shiftDown3(arr, i, 0);
  }
}

function _shiftDown3(arr, n, k) {
  while(2*k + 1 < n) {
    let j = 2*k + 1;
    if (j+1 < n && arr[j+1] > arr[j]) {
      j++;
    }
    if (arr[k] >= arr[j]) {
      break;
    }
    swap(arr, k, j);
    k = j;
  }
}


module.exports = {
  heapSort1,
  heapSort2,
  heapSort3,
}
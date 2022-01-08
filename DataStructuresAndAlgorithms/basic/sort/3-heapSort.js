const { swap } = require('./sortTestHelper.js');

/**
 * 最大堆
 */

class MaxHeap {
  constructor(capacity) {
    this.count = 0;
    this.capacity = capacity;
  }
  
  _data = [];

  _shiftUp(k) {
    while(k > 1 && this._data[Math.floor(k/2)] < this._data[k]) {
      swap(this._data, Math.floor(k/2), k);
      k = Math.floor(k/2); // 条件不符合才会继续往上
    }
  }

  // 执行一次只能为某个数据找到正确的位置，不能保证二叉树符合堆的性质
  // 见下方heapify，使用_shiftDown得到二叉堆
  // extractMax是在已经是二叉堆的基础上执行了一次，得到最大值
  _shiftDown(k) { 
    while(2*k <= this.count) { // 看子元素是否越界
      let j = 2*k;
      if (j+1 <= this.count && this._data[j+1] > this._data[j]) {
        j++;
      }
      if (this._data[k] >= this._data[j]) { // 符合了就不再继续往下
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
    if (this._data.length >= this.capacity) {
      throw new Error('over capacity');
    }
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
 * Heapify
 * 把一个数组构建成堆的更好的方法
 * 完全二叉树第一个不是叶子节点的元素是最后一个节点/2
 * 所有叶子节点（没有子元素）都是最大堆了
 * heapity.png图
 * 从第一个不是叶子节点的元素向前进行shiftDown
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
    while(2*k <= this.count) { // 完全二叉树，2k可以指向最后一个子节点，所以判断2k
      let j = 2*k;
      // j+1是j非最后一个子节点情况
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
 * Heapify的方式
 * 
 */
function heapSort2(arr) {
  const n = arr.length;
  const maxHeap = new MaxHeap2(arr, n);
  for (let i = n-1; i >= 0; i--) {
    arr[i] = maxHeap.extractMax(); // 最大值放最后，从小到大
  }
}

/**
 * 优化的堆排序
 * (Heap Sort)
 * 原地堆排序 从索引0开始
 * 不采用插入到堆中的操作，直接操作这个数组
 * 
 */

function heapSort3(arr, n) {
  // heapify
  // 注意，此时我们的堆是从0开始索引的
  // 从(最后一个元素的索引-1)/2开始
  // 最后一个元素的索引 = n-1
  for (let i = Math.floor((n-1-1)/2); i >= 0; i--) {
    _shiftDown3(arr, n, i);
  }
  // 经过上一步的heapify，此时第一个数据就是最大值
  // 最大值和最后一个数据交换
  // 然后继续shiftdown，得到从小到大的顺序
  for (let i = n-1; i > 0 ; i--) {
    swap(arr, 0, i);
    _shiftDown3(arr, i, 0);
  }
}

function _shiftDown3(arr, n, k) {
  while(2*k + 1 < n) { // 完全二叉树（都在左侧）最后一个子节点
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
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

const maxHeap = new MaxHeap();

for (let i = 0; i < 15; i++) {
  maxHeap.insert(Math.floor(Math.random()*101));
}
console.log(maxHeap.data);
// while(!maxHeap.isEmpty()) {
  let max = maxHeap.extractMax();
  console.log(max);
  console.log(maxHeap.data);
// }


/**
 * 基础堆排序
 */
function heapSort1(arr) {
  // 
}
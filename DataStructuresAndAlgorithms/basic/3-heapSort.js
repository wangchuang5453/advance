const { swap } = require('./sortTestHelper.js');

/**
 * 堆排序
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
}

const maxHeap = new MaxHeap();

for (let i = 0; i < 15; i++) {
  maxHeap.insert(Math.floor(Math.random()*101));
}
console.log(maxHeap.data);
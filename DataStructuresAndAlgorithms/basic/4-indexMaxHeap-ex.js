/**
 * 使用堆实现优先队列
 */

const { swap } = require("./sortTestHelper");

// 最小堆
class MinHeap {
  constructor(capacity) {
    this.count = 0; // 指针，不用查询，提升性能
    this.capacity = capacity;
  }

  _data = [];

  get data() {
    return this._data;
  }

  clear() {
    this._data = null;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(item) {
    this._data[this.count + 1] = item;
    this.count += 1;
    this._shiftUp(this.count);
  }

  extractMin() {
    if (this.count === 0) {
      return;
    }
    let res = this._data[1];
    swap(this._data, 1, this.count);
    this._data.splice(this.count, 1);
    this.count--;
    this._shiftDown(1);
    return res;
  }

  _shiftUp(k) {
    while(k > 1 && this._data[Math.floor(k/2)] > this._data[Math.floor(k)]) {
      swap(this._data, Math.floor(k/2), k);
      k = Math.floor(k/2); 
    }
  }

  _shiftDown(k) {
    while(2*k <= this.count) {
      let j = 2*k;
      if (j + 1 < this.count && this._data[j] > this._data[j+1]) {
        j++;
      }
      if (this._data[k] < this._data[j]) {
        break;
      }
      swap(this._data, k, j);
      k = j;
    }
  }
}


/**
 * 多路归并排序
 */

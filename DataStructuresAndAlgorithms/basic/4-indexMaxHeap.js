/**
 * 最大索引堆
 */

class IndexMaxHeap {
  constructor() {
    this.count = 0;
  }
  
  _data = [];
  _indexes = [];
  _reverse = []; // 反向查找表

  _shiftUp(k) {
    while(k > 1 &&
      this._data[this._indexes[Math.floor(k/2)]] < this._data[this._indexes[k]]
    ) {
      swap(this._indexes, Math.floor(k/2), k);
      this._reverse[this._indexes[Math.floor(k/2)]] = Math.floor(k/2);
      this._reverse[this._indexes[Math.floor(k)]] = Math.floor(k);
      k = Math.floor(k/2);
    }
  }

  _shiftDown(k) {
    while(2*k <= this.count) {
      let j = 2*k;
      if (j+1 <= this.count &&
        this._data[this._indexes[j+1]] > this._data[this._indexes[j]]
      ) {
        j++;
      }
      if (this._data[this._indexes[k]] >= this._data[this._indexes[j]]) {
        break;
      }
      swap(this._indexes, k, j); // 可像插入排序一样，一步步挪，然后赋值，而不是一直交换
      this._reverse[this._indexes[k]] = k;
      this._reverse[this._indexes[j]] = j;
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
    this._indexes = null;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(i, item) {
    if (i < 0) {
      return;
    }
    i += 1;
    this._data[i] = item; // 从1开始存储数据
    this._indexes[this.count + 1] = i; // 堆从1开始
    this._reverse[i] = this.count + 1;
    this.count++;
    this._shiftUp(this.count);
  }

  extractMax() {
    if (this.count === 0) {
      return;
    }
    let ret = this._data[this._indexes[1]];
    swap(this._indexes, 1, this.count);
    this._reverse[this._indexes[1]] = 1;
    this._reverse[this._indexes[this.count]] = 0; // 被删除则指向0就行
    this._data.splice(this._indexes[this.count], 1);
    this.count--;
    this._shiftDown(1);
    return ret;
  }

  extractMaxIndex() {
    if (this.count === 0) {
      return;
    }
    let ret = this._indexes[1] - 1;
    swap(this._indexes, 1, this.count);
    this._reverse[this._indexes[1]] = 1;
    this._reverse[this._indexes[this.count]] = 0; // 被删除则指向0就行
    this._data.splice(this._indexes[this.count], 1);
    this.count--;
    this._shiftDown(1);
    return ret;
  }

  contain(i) {
    if (i < 0) {
      return;
    }
    return this._reverse[i + 1] !== 0;
  }

  getItem(i) {
    if (!this.contain(i)) {
      return;
    }
    return this._data[i + 1];
  }

  change(i, newItem) {
    if (!this.contain(i)) {
      return;
    }
    i+=1;
    data[i] = newItem;
    // n次改变，此种情况最差回到O(n^2)
    // for (let j = 1; j < this.count; j++) {
    //   if (this._indexes[j] === i) {
    //     this._shiftUp(j);
    //     this._shiftDown(j);
    //     return;
    //   }
    // }

    // 优化上面注释的部分
    let j = this._reverse[i];
    this._shiftUp(j);
    this._shiftDown(j);
  }
}
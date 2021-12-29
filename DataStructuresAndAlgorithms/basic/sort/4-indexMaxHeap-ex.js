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

  insertWithinCapacity(item) {
    if (this.count > this.capacity) {
      this.extractMin();
    }
    this.insert(item)
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

function getTopK(arr) {
  const n = arr.length;
  const heap = new MinHeap(100);
  for (let i = 0; i < n; i++) {
    heap.insertWithinCapacity(arr[i]);
  }
  console.log(heap.data);
  return heap.data;
}






/**
 * 最小索引堆
 */
 class IndexMinHeap {
  constructor(capacity) {
    this.count = 0;
    this.capacity = capacity;
  }
  
  _data = [];
  _indexes = [];
  _reverse = []; // 反向查找表

  _shiftUp(k) {
    while(k > 1 &&
      this._data[this._indexes[Math.floor(k/2)]] > this._data[this._indexes[k]]
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
        this._data[this._indexes[j+1]] < this._data[this._indexes[j]]
      ) {
        j++;
      }
      if (this._data[this._indexes[k]] <= this._data[this._indexes[j]]) {
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
    if (i < 0 || i >= this.capacity) {
      throw new Error('index not within capacity');
    }
    
    i += 1;
    this._data[i] = item; // 从1开始存储数据
    this._indexes[this.count + 1] = i; // 堆从1开始
    this._reverse[i] = this.count + 1;
    this.count++;
    this._shiftUp(this.count);
  }

  extractMin() {
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

  extractMinIndex() {
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

/**
 * 多路归并排序
 * 
 * 看后续课程会不会有
 * 未写出
 */

function mergeSortD(arr) {
  const n = arr.length;
  _mergeSort(arr, 0, n-1, d);
}

function _mergeSort(arr, l, r, d) {
  if (l>=r) {
    return;
  }
  if (r-l+1 <= d) {
    // 直接堆排序？
    return;
  }
  let i = 1;
  let j = l;
  let gap = [];
  while(i < d) {
    _mergeSort(arr, j, (r+l)*i/d);
    gap.push((r+l)*i/d);
    j = (r+l)*i/d + 1;
    i++;
  }
  _merge(arr, l, gap, r);
}

function _merge(arr, l, gap, r) {
  let copy = [];
  for (let i = l; i <= r; i++) {
    copy[i-l] = arr[i];
  }
  gap = [l-1, ...gap, r]
  let pointerMap = new Map();
  let minHeap = new IndexMinHeap();
  for (let i = 0; i < gap.length - 1; i++) {
    pointerMap.set([gap[i]+1, gap[i+1]], 0);
  }

  for (let k = l; k <= r; k++) {
    let lastInsertIndex = -1;
    if (lastInsertIndex === r) {
      lastInsertIndex = 0;// gap去掉l之后随机指定一个
    }
    for (const key of pointerMap.keys()) {// 不行，还是要用对象数组，保证顺序，最后一个位置问题无法解决
      let pointer = pointerMap.get(key);
      let index = key[0] + pointer;
      if (lastInsertIndex < 0) {
        if (index <= key[1]) {
          minHeap.insert(index, copy[index - l]);
          pointerMap.set(key, pointer + 1); // 下一次的位置
        }
      } else {
        if (lastInsertIndex >= key[0] && lastInsertIndex < key[1] && index <= key[1]) {
          minHeap.insert(index, copy[index - l]);
          pointerMap.set(key, pointer + 1);
        } else {
          // lastInsertIndex = 
        }
      }
    }
    lastInsertIndex = minHeap.extractMinIndex()
    arr[k] = copy[lastInsertIndex];
  }
}

/**
 * 二叉堆 Binary Heap
 */

/**
 * d叉堆
 * d-ary heap
 */



module.exports = {
  getTopK,
  mergeSortD
}
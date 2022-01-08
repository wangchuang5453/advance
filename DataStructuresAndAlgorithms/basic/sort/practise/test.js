var findKthLargest = function(nums, k) {
  const n = nums.length;
  // console.log(n);
  if (k < 1 || k > n) {
      return;
  }
  let index =  _findKthLargest(nums, 0, n-1, k);
  return nums[index];
};

function _findKthLargest(arr, l, r, k) { // [l, r]
  if (l >= r) {
      return;
  }
  const p = _partition(arr, l, r);
  console.log(p, l, r)
  if (p + 1 === k ) {
      return p;
  } else if (k < p + 1) {
    // console.log(l);
      return _findKthLargest(arr, l, p-1, k);
  } else {
    // console.log(r);
      return _findKthLargest(arr, p+1, r, k);
  }
}

function _partition(arr, l, r) {
  const rIndex = Math.floor(Math.random() * (r-l+1)) + l;
  swap(arr, l, rIndex);
  let v = arr[l];
  let i = l;
  for (let j = l+1; j <= r; j++) {
      if (arr[j] > v) {
          swap(arr, i+1, j);
          i++;
      }
  }
  swap(arr, l, i);
  return i;
}

function _partition3Way(arr, l, r) {
  const rIndex = Math.floor(Math.random() * (r-l+1)) + l;
  swap(arr, l, rIndex);
  let v = arr[l];
  let lt = l;
  let gt = r + 1;
  let i = l + 1;
  while(i < gt) {
      if (arr[i] > v) {
          swap(arr, lt + 1, i)
          lt++;
          i++;
      } else if (arr[i] < v) {
          swap(arr, gt - 1, i);
          gt--;
      } else {
          i++;
      }
  }
  swap(arr, l, lt);
  return lt;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// let arr = [3,2,1,5,6,4];
// let res = findKthLargest(arr, 2);
// console.log(res, arr);
var smallestK = function(arr, k) {

  const p = new MaxHeap(k);
  for(let i = 0; i < arr.length; i++) {
      p.insert(arr[i]);
  }
  return p.data;
};

class MaxHeap {
  constructor(capacity) {
      this.count = 0;
      this.capacity = capacity;
  }

  get data() {
      return this._data;
  }

  _data = [];
  insert(item) {
      if(this.capacity === 0) {
          return;
      }
      this._insert(item);
      if(this._data.length > this.capacity + 1) {
        let data = this._extractMax();
      }
      
  }

  _insert(item) {
      this._data[this.count + 1] = item;
      this.count++;
      this._shiftUp(this.count);
      // console.log(this._data);
  }

  _shiftUp(k) {
      while(k > 1 && this._data[Math.floor(k/2)] < this._data[k] ) {
          swap(this._data, Math.floor(k/2), k);
          k = Math.floor(k/2);
      }
  }

  _extractMax() {
      let res = this._data[1];
      swap(this._data, 1, this.count);
      this._data.splice(this.count, 1);
      this.count--;
      this._shiftDown(1);
      return res;
  }

  _shiftDown(k) {
      while(2*k <= this.count) {
          let j = 2*k;
          // https://www.cnblogs.com/idorax/p/6441043.html
          // 完全二叉树最后一层靠左对齐，都在最左侧
          if(j + 1 <= this.count && this._data[j] < this._data[j+1]) {
              j++;
          }
          if(this._data[k] >= this._data[j]) {
              break;
          }
          swap(this._data, k, j);
          k = j;
      }
  }

}


let data = smallestK([1,3,5,7,2,4,6,8], 4);
console.log(data);
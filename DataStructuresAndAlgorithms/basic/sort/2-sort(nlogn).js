const { insertionSortLR } = require('./1-sort(n^2).js');
const { swap } = require('./sortTestHelper.js');
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
      arr[k] = copy[j - l];// 如果超了，每次都会进入这个判断，如果j没超，那就是一直赋值j的数据了
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
 * 意义所在？链表什么blabla
 * 
 */

function mergeSortBU(arr) { // 比上面的慢一些
  const n = arr.length;
  for (let sz = 1; sz < n; sz += sz) { // 1 2 4 8
    for (let i = 0; i + sz < n; i += sz + sz) { // 2sz代表一个[l,r]
      _merge(arr, i, i + sz -1, Math.min(i + sz + sz - 1, n - 1));
    }
  }
}

/**
 * Quick Sort
 * 快速排序
 * 20世纪对世界影响最大的算法之一，能以非常快的速度完成排序
 * 但是即使如此，也是经过了很长时间的改进和优化才被公认为可以被信任的非常优秀的算法
 */


function quickSort(arr) {
  const n = arr.length;
  _quickSort(arr, 0, n-1);
}


function _quickSort(arr, l, r) {
  if (l>= r) {
    return;
  }
  const p = _partition(arr, l, r);
  _quickSort(arr, l, p-1);
  _quickSort(arr, p+1, r) // 注意是p+1
}

/**
 * 优化
 * @param {*} arr 
 */
function quickSort2(arr) {
  const n = arr.length;
  _quickSort2(arr, 0, n-1);
}

function _quickSort2(arr, l, r) {
  if (r - l <= 15) { // 优化
    insertionSortLR(arr, l, r);
    return;
  }
  const p = _partition(arr, l, r); // 优化
  _quickSort2(arr, l, p-1);
  _quickSort2(arr, p+1, r)
}

function _partition(arr, l, r) {
  let v = arr[l];
  let j = l;
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < v) {
      swap(arr, j+1, i);
      j++;
    }
  }
  swap(arr, j, l);
  return j;
}

/**
 * quickSort quickSort2
 * 这种快排，和归并排序相比，都是将数组拆分成两部分，
 * 但是归并排序是进行平均等分，层数是logn，现在的快排拆分出的数据很可能是一大一小的，
 * 拆分出的层数超过logn，最差可能退化为O(n^2)
 * 数组有序情况下，最左边就是最小的，那就拆分出第一个和剩下的
 * 这样拆分下去递归，就是层数为n，每一层处理又是n，就是n^2的复杂度
 * 
 * 所以优化点就是，尽量选择中间数值的那个是最好的，但是不能快速准确定位这个中间元素
 * 那就选择使用一个随机数据就可以，此时算出的时间复杂度*期望值*是nlogn，不是每次都是nlogn
 * 但是这样退化成n^2是不可能的，因为如果每一次递归都选择到最小值的概率是1/n * 1/(n-1)...
 * 这个概率接近0
 */

function quickSort3(arr) {
  const n = arr.length;
  _quickSort3(arr, 0, n-1);
}

function _quickSort3(arr, l, r) {
  if (r - l <= 15) { // 优化
    insertionSortLR(arr, l, r);
    return;
  }
  const p = _partition2(arr, l, r); // 优化
  _quickSort3(arr, l, p-1);
  _quickSort3(arr, p+1, r)
}

function _partition2(arr, l, r) {
  // 优化
  let rIndex = Math.floor(Math.random()*(r-l+1)) + l; // 囊括r [l, r]
  swap(arr, l, rIndex);

  let v = arr[l];
  let j = l;
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < v) {
      swap(arr, j+1, i);
      j++;
    }
  }
  swap(arr, j, l);
  return j;
}

/**
 * 如果有大量重复数据，那么等于v的数据会出现非常多，处在v的同一侧，会导致不平衡
 * 进一步优化，使得相等的数据被分散，近乎平均分配在v的左右两侧
 * 
 * 二路快速排序
 */
function quickSort4(arr) {
  const n = arr.length;
  _quickSort4(arr, 0, n-1);
}

function _quickSort4(arr, l, r) {
  if (r - l <= 15) { // 优化
    insertionSortLR(arr, l, r);
    return;
  }
  const p = _partition4(arr, l, r); // 优化
  _quickSort4(arr, l, p-1);
  _quickSort4(arr, p+1, r)
}

function _partition4(arr, l, r) {
  let rIndex = Math.floor(Math.random()*(r-l+1)) + l;
  swap(arr, l, rIndex);

  let v = arr[l];
  let i = l + 1; let j = r;
  while(true) {
    while(i <= r && arr[i] < v) i++; // >=v的拿去交换 l可以取到r，如果v就是最大值就这样
    while(j >= l + 1 && arr[j] > v) j--; // <=v的拿去交换
    if (i > j) { // i可以等于j
      break;
    }
    swap(arr, i, j); // 换的数据包含和v相等的，解决了相等数据不平衡问题，换完之后往前走看下一个去了
    i++;
    j--;
  }
  swap(arr, j, l);

  return j; // j此时处于<v的最后一个数值上，因为符合<v条件之后还要多走一步
}

/**
 * 三路快速排序
 * 
 * 等于v的数据被放在中间，下次排序只需要考虑小于v和大于v的部分，
 * 省去了对这部分相等数据的处理
 */
function quickSort3Way(arr) {
  const n = arr.length;
  _quickSort3Way(arr, 0, n-1);
}

function _quickSort3Way(arr, l, r) {
  if (r - l <= 15) { // 优化
    insertionSortLR(arr, l, r);
    return;
  }

  let rIndex = Math.floor(Math.random()*(r-l+1)) + l;
  swap(arr, l, rIndex);
  let v = arr[l];
  // 开始表演了
  let lt = l;
  let gt = r + 1;
  let i = l + 1;
  while(i < gt) { // i处在gt和相等的数据之间
    if (arr[i] < v) {
      swap(arr, lt + 1, i); // lt+1 可遍历数据中的下一个
      lt ++;
      i ++;
    } else if (arr[i] > v) {
      swap(arr, gt - 1, i); // gt-1 可遍历数据中的下一个
      gt --;
    } else {
      i++;
    }
  }
  swap(arr, l, lt);

  _quickSort3Way(arr, l, lt -1); // 相等的可以留下了
  _quickSort3Way(arr, gt, r);
}


module.exports = {
  mergeSort,
  mergeSortBU,
  quickSort,
  quickSort2,
  quickSort3,
  quickSort4,
  quickSort3Way,
}
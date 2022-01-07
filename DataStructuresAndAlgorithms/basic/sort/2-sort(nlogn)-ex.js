/**
 * 归并和快排衍生问题
 */

/**
 * 求逆序对个数  归并的思路
 */

function inversionCount(arr) {
  const n = arr.length;
  return _inversionCount(arr, 0, n-1)
}
  
function _inversionCount(arr, l, r) {
  if (l >= r) {
    return 0; // 
  }

  let mid = Math.floor( (l + r) / 2 );

  let res1 = _inversionCount(arr, l, mid); //

  let res2 = _inversionCount(arr, mid + 1, r); //

  return res1 + res2 + _merge(arr, l, mid, r) //
}

function _merge(arr, l, mid, r) {
  const copy = [];
  for (let i = l; i <= r; i++) {
    copy[i - l] = arr[i];
  }
  
  let i = l;
  let j = mid + 1;
  let res = 0;
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = copy[j - l];
      j++;
    } else if (j > r) {
      arr[k] = copy[i - l];
      i++;
    } else if (copy[i - l] <= copy[j - l]) {
      arr[k] = copy[i - l];
      i++;
    } else {
      // mid-l+1 这一次循环算出的逆序对
      res += mid-l+1;
      arr[k] = copy[j - l];
      j++;
    }
  }
  return res;
}

/**
 * 数据中第n大的数据
 * 
 * O(n)
 * 最大最小的话就可以用遍历比较出来，也是O(n)
 * 
 * 使用快排思想处理
 * 
 */

function quickSort3Way(arr, n) {
  const len = arr.length;
  _quickSort3Way(arr, 0, len - 1, n - 1);
}

function _quickSort3Way(arr, l, r, num) {
  if (l === r) { // 
    return arr[l];
  }

  let rIndex = Math.floor(Math.random()*(r-l+1)) + l;
  swap(arr, l, rIndex);
  let v = arr[l];
  let lt = l;
  let gt = r + 1;
  let i = l + 1;
  while(i < gt) { // i处在gt和相等的数据之间
    if (arr[i] < v) {
      swap(arr, lt + 1, i);
      lt ++;
      i ++;
    } else if (arr[i] > v) {
      swap(arr, gt - 1, i);
      gt --;
    } else {
      i++;
    }
  }
  swap(arr, l, lt);

  if (num >= lt && num <= gt - 1) { // 也可以不用三路快排，都可以找到
    return arr[lt];
  } else if (num < lt) {
    return _quickSort3Way(arr, l, lt -1);
  } else {
    return _quickSort3Way(arr, gt, r);
  }
}
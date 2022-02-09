// 二分搜索

// 迭代
function binarySearch(arr, n, target) {
  let l = 0;
  let r = n - 1;
  while(l <= r) {
    let mid = l + Math.floor((r - l)/2);
    if (target < arr[mid]) {
      r = mid - 1;
    } else if (target > arr[mid]) {
      l = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}


// 递归
function binarySearch(arr, n, target) {
  return _binarySearch(arr, target, 0, n-1);
}

function _binarySearch(arr, target, l, r) {
  if(l > r) {
    return -1;
  }
  let mid = l + Math.floor((r - l)/2);
  if (target === arr[mid]) {
    return mid;
  } else if (target < arr[mid]) {
    return _binarySearch(arr, target, l, mid - 1);
  } else {
    return _binarySearch(arr, target, mid + 1, r);
  }
}


/**
 * 洗牌算法 
 * 数组乱序
 */

function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function shuffle(arr) {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) { // 从后往前获取随机index写法比较简单，也可以从0开始
    let rIndex = Math.floor(Math.random()*i);
    console.log(rIndex);
    swap(arr, rIndex, i);
  }
}

let arr = [1,2,3,4,5,6,7,8,11,2,333,444,555];
shuffle(arr);
console.log(arr);
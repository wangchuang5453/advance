/**
 * 创建一个数组去存储数据，发现已经存储了就不再放进去
 * @param {*} arr 
 * @returns 
 */
function unique1(arr) {
  const res = [];
  for (let i = 0, n = arr.length; i < n; i++) {
    let item = arr[i];
    let j;
    let len = res.length;
    // 在res里面寻找是否有一样的数据
    for (j = 0; j < len; j++) {
      if (res[j] === item) {
        break;
      }
    }
    // 说明遍历提前结束，即使是最后一个数据，也不会有机会j++
    if (j === len) {
      // 没有一样的数据就可以添加，如果有就继续循环就可以了
      res.push(item);
    }
  }
  return res;
}

/**
 * 使用indexOf替换上面的循环，思路一样
 * @param {*} arr 
 * @returns 
 */
function unique2(arr) {
  const res = [];
  for (let i = 0, n = arr.length; i < n; i++) {
    let item = arr[i];
    if (res.indexOf(item) == -1) { // 数字还可以用indexOf 如果是对象数组可以用findIndex find
      res.push(item);
    }
  }
  return res;
}


/**
 * filter进一步简化上面写法
 * @param {*} arr 
 * @returns 
 */

function unique3(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index; // indexOf从前往后找，找到存在了就会停止然后返回索引值
  })
}

/**
 * 排序后去重
 * @param {*} arr 
 * @returns 
 */
 function unique5(arr) {
  const sortedArray = arr.concat([]).sort();
  const res = [];
  let last;
  for (let i = 0, n = sortedArray.length; i < n; i++) {
    let current = sortedArray[i];
    if (current !== last) {
      res.push(current);
    }
    last = current;
  }
  return res;
}

/**
 * filter进一步简化排序后去重
 * @param {*} arr 
 */
function unique4(arr) {
  return arr.concat([]).sort().filter((item, index, array) => {
    return !index || item !== array[index-1];
  })
}



/**
 * es6 Set
 */
function unique6(arr) {
  return Array.from(new Set(arr));
}

/**
 * es6 Map
 */
function unique7(arr) {
  const map = new Map();
  return arr.filter((item) => !map.has(item) && map.set(item, 1));
}



// let arr = [1,2,3,444,555,222,222,1,2,3];
let arr = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
/**
 * 7 map
 */
// console.log(unique7(arr));
// [
//   1,
//   '1',
//   null,
//   undefined,
//   [String: '1'],
//   [String: '1'],
//   /a/,
//   /a/,
//   NaN
// ]
/**
 * 6 set
 */
// console.log(unique6(arr));
// [
//   1,
//   '1',
//   null,
//   undefined,
//   [String: '1'],
//   [String: '1'],
//   /a/,
//   /a/,
//   NaN
// ]
/**
 * 5
 */
// console.log(unique5(arr));
// [
//   /a/,
//   /a/,
//   1,
//   '1',
//   [String: '1'],
//   [String: '1'],
//   NaN,
//   NaN,
//   null,
//   undefined
// ]

/**
 * 4
 */
//  console.log(unique4(arr));
// [
//   /a/,
//   /a/,
//   1,
//   '1',
//   [String: '1'],
//   [String: '1'],
//   NaN,
//   NaN,
//   null,
//   undefined
// ]

/**
 * 3
 * [NaN, NaN].indexOf(NaN) === -1
 * 全都干掉了哈哈，这就出问题了
 * indexOf 底层还是使用 === 进行判断，因为 NaN === NaN的结果为 false，所以使用 indexOf 查找不到 NaN 元素
 */
//  console.log(unique3(arr));
//  [ 1, '1', null, undefined, [String: '1'], [String: '1'], /a/, /a/ ] 

/**
 * 2
 * 
 */
//  console.log(unique2(arr));
// [
//   1,
//   '1',
//   null,
//   undefined,
//   [String: '1'],
//   [String: '1'],
//   /a/,
//   /a/,
//   NaN,
//   NaN
// ]

/**
 * 1
 */
 console.log(unique1(arr));
//  [
//   1,
//   '1',
//   null,
//   undefined,
//   [String: '1'],
//   [String: '1'],
//   /a/,
//   /a/,
//   NaN,
//   NaN
// ]

/**
 * 总结
 * 对象上述所有的方法都处理不掉，都是根据引用不同判断的
 * map set可以去重NaN
 * 剩下的的都是NaN处理不了，因为NaN === NaN的结果为 false，indexOf底层也是===
 * 3的话 array.indexOf(item) === index 因为indexOf取不到NaN得到-1不等于index直接干掉了，问题就比较大了
 */

/**
 * 还可以用reduce处理
 */
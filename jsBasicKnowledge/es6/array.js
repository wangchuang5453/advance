/**
 * [1, 2, [3, [4, 5]]].flat()  // [1, 2, 3, [4, 5]]
 * [1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
 */

function flat(arr, d = 1) {
  if (d > 0) {
    return arr.reduce((res, value) => {
      if (Array.isArray(value)) {
        res = res.concat(flat(value, d - 1)) 
        // 最外层假如要求是打平2层，到这里遍历拿到一个数组，到这一层就是只需要再打平1层，因为上一层已经打平了，就是新进入一层拿到一个数组，就只需要再打平d-1层 
      } else {
        res = res.concat(value)
      }
      return res;
    }, [])
  } else {
    return arr.slice(0);
  }
}

console.log(flat([1,2,[3,4,5,[1,2,3]]], Infinity)); // [1, 2, 3, 4, 5, 1, 2, 3]


/**
 * Array.includes
 */


/**
 * Array.from
 * 考题：如何把类数组转换成真数组
 * 1、[...arguments]
 * 2、Array.from(arguments)
 * 3、Array.prototype.slice.call(arguments)
 */


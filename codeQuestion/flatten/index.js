/**
 * 
 */
function flat(arr) {
  if (!isArray(arr)) {
    return arr;
  }
  return arr.reduce((prev, next) => {
    return prev.concat(flat(next));
  }, [])
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

let arr = [1,2,[3,4,5,[1,2,3]]];
console.log(flat(arr)); 
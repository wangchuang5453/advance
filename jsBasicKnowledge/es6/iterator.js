const arr = [1, 2, 3, 4];

const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    let arr = Object.keys(this);
    let currentIndex = 0;
    let _this = this;
    return {
      next() {
        if (currentIndex < arr.length) {
          let key = arr[currentIndex++];
          return { value: [key, _this[key]], done: false }
        }
        return { value: undefined, done: true }
      }
    }
  },
}

const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
// const map = new Map();
map.set(1, 1);
map.set(2, 2);

const set = new Set([1, 2, 3, 4, 5]);

for (const iterator of arr) {
  console.log(iterator, 'arr'); // 1 2 3 4
}
for (const iterator of obj) {
  console.log(iterator, 'obj');
}
for (const iterator of map) {
  console.log(iterator, 'map');
}
for (const iterator of set) {
  console.log(iterator, 'set');
}


/**
 * Iterator 的作用有三个：
 * 一是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二是使得数据结构的成员能够按某种次序排列；
 * 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
 * 
 * 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
 * 
 * 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
 * 
 * Symbol.iterator属性本身是一个函数，就是当前数据结构默认的 遍历器生成函数
 * 
 * es6新增了Map WeakMap Set WeakSet 
 * 都可以用for of 遍历
 * Array 可以
 * 函数的 arguments 对象
 * NodeList 对象
 * String
 * TypedArray
 * Generator 对象
 */




/**
 * for in 与 for of 比较
 * 
 * for in:
 * 1、不仅会遍历自有属性，还会遍历原型链上的属性，要加如下判断
 * for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        
      }
    }
    
   2、不适合遍历数组

   
 */

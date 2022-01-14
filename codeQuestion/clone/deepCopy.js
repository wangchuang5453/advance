// https://juejin.cn/post/6844903929705136141
/**
 * 基础版本
 */

function deepCopy1(target) {
  if (target === null || typeof target !== 'object') {
    return target;
  }
  let cloneTarget = target instanceof Array ? [] : {};
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepCopy1(target[key]);
    }
  }
  return cloneTarget;
}


const target1 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  field5: null,
};
// let copy = deepCopy1(target1);
// copy.field3.child1 = 1;
// console.log(copy);
// console.log(target);


/**
 * 解决循环引用
 * 解决循环引用问题，
 * 我们可以额外开辟一个存储空间，！！来存储当前对象和拷贝对象的对应关系！！，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
 * 如果有的话直接返回，
 * 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 */

 const target2 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  field5: null,
};
target2.field6 = target2;


function deepCopy2(target, map = new Map()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  const cloneTarget = target instanceof Array ? [] : {};
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepCopy2(target[key], map);
    }
  }
  return cloneTarget;
}

// let copy = deepCopy2(target2);
// copy.field3.child1 = 1;
// console.log(copy);
// console.log(target2);


/**
 * 使用weakMap优化Map，节省空间
 * 
 * 设想一下，如果我们要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗，
 * 而且我们需要手动清除Map的属性才能释放这块内存，而WeakMap会帮我们巧妙化解这个问题。
 * 
 * 如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
 */

function deepCopy2WeakMap(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  const cloneTarget = target instanceof Array ? [] : {};
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepCopy2WeakMap(target[key], map);
    }
  }
  return cloneTarget;
}

/**
 * 优化 for in 性能
 * 待完成
 */

function deepCopy3(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  const cloneTarget = target instanceof Array ? [] : {};
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepCopy2WeakMap(target[key], map);
    }
  }
  return cloneTarget;
}


/**
 * 考虑更多的数据类型
 */
// 可继续遍历的类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
// 不可继续遍历的类型
// 没整明白 待续
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';



const deepTag = [mapTag, setTag, arrayTag, objectTag];

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInstance(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function deepCopy4(target, map = new WeakMap()) {
  // 原始类型
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 获取引用类型的具体数据类型
  const type = getType(target);

  // 获取克隆空间
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInstance(target);
  }
  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);
  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepCopy4(value, map));
    });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepCopy4(value, map));
    });
    return cloneTarget;
  }
  // 数组和对象
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepCopy4(target[key], map);
    }
  }
  return cloneTarget;
}

const map = new Map();
map.set('key', {
  a: 1,
  b: 2
});
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target4 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
};
target4.field5 = target4;

let d4 = deepCopy4(target4)
console.log(d4);
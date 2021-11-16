// 箭头函数

/**
 * 箭头函数的this是在函数定义时位置决定的，普通函数的this是在使用时决定的
 * 
 * 对于普通函数来说，内部的this指向函数运行时所在的对象
 * 
 * 箭头函数没有自己的this对象，内部的this就是定义时上层作用域中的this
 */

const teacher = {
  name: 'wangchuang',
  getName: () => {
    return this.name;
  }
}

console.log(teacher.getName()); // undefined

/**
 * {} 会被认为是函数体，如果简写返回对象时候要用()包起来
 * @returns 
 */
const a = () => ({});
const b = () => 2;

console.log(a());
console.log(b());


/**
 * 箭头函数能不能用作构造函数？
 * 当然不能！！
 * 构造函数的this要指向new出来的实例，使用箭头函数的this是在定义的时候就被指向了
 */


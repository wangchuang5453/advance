// const path = require('path');

// const p = path.join('', './static')

// console.log(p);
// console.log(process.argv);
// console.log('哈哈%s多大的%d还是说%i计算机视觉%o', 'sss', 22, 22.33, Number);

// const x = 1
// const y = 2
// const z = 3
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'x 的值为 ' + x + ' 且已经检查了几次？'
// )
// console.count(
//   'y 的值为 ' + y + ' 且已经检查了几次？'
// )


// const oranges = ['橙子', '橙子']
// const apples = ['苹果']
// oranges.forEach(fruit => {
//   console.count(fruit)
// })
// apples.forEach(fruit => {
//   console.count(fruit)
// })

// const function2 = () => console.trace()
// const function1 = () => function2()
// function1()

// const doSomething = () => console.log('测试')
// const measureDoingSomething = () => {
//   console.time('doSomething()')
//   //做点事，并测量所需的时间。
//   doSomething()
//   console.timeEnd('doSomething()')
// }
// measureDoingSomething()

// import chalk from 'chalk'
// console.log(chalk.yellow('你好'))

// import ProgressBar from 'progress'

// const bar = new ProgressBar(':bar', { total: 10 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)

// import readline from 'readline'

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// rl.question('你叫啥名？', name => {
//   console.log(`你好${name}`);
//   rl.close();
// })
// import info from './sub.js'
// console.log(info.name);


// 事件循环
function eventLoopTest () {
  console.log('a');
  new Promise((resolve, reject) => {
    console.log('b');
    resolve()
  }).then(() => {
    console.log('c');
    setTimeout(() => {
      console.log('d');
    }, 0);
  })
  console.log('f');
  setTimeout(() => {
    console.log('e');
    new Promise((resolve, reject) => {
      console.log('h');
      resolve()
    }).then(() => {
      console.log('i');
    })
  }, 0);
  console.log('g');
  process.nextTick(() => {
    console.log('j');
  })
}
// eventLoopTest()
// a
// b
// f
// g
// c
// j
// e
// h
// i
// 


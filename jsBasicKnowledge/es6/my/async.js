/**
 * Promise解决了什么问题 实现原理？
 * async await 解决的问题 实现原理？
 */

/**
 * 异步情况下，可能会出现众多回调函数的嵌套，出现回调地狱的情况
 * Promise 就是为了解决这个问题而提出的，它是一种新的写法，允许将回调函数的嵌套，改成链式调用
 * Promise 的写法只是回调函数的改进，链式调用多了语义就会变的很不清楚
 */


// 协程（coroutine），意思是多个线程互相协作，完成异步任务。
// 第一步，协程A开始执行。
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// 第三步，（一段时间后）协程B交还执行权。
// 第四步，协程A恢复执行。

// 举例来说，读取文件的协程写法如下。


function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}

// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
// 它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
// 它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。


/**
 * Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
 */


/**
 * async 函数是什么？ 就是Generator 函数的语法糖
 * 
 * 
 */

/**
 * async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里
 */

async function fn(args) {
    // ...
}   
  
// 等同于

function fn(args) {
  // spawn 自执行器
  return spawn(function* () {
      // ...
  });
}

// function spawn(genF) {
//   return new Promise(function(resolve, reject) {
//     const gen = genF();
//     function step(nextF) {
//       let next;
//       try {
//         next = nextF();
//       } catch(e) {
//         return reject(e);
//       }
//       if(next.done) {
//         return resolve(next.value);
//       }
//       Promise.resolve(next.value).then(function(v) {
//         step(function() { return gen.next(v); });
//       }, function(e) {
//         step(function() { return gen.throw(e); });
//       });
//     }
//     step(function() { return gen.next(undefined); });
//   });
// }

/**
 * 以下是自己的手写 
 */
async function name(params) {
  // 
}


function name(params) {
  return spawn(function* () {
    // yield
  });
}

/**
 * next方法的参数表示上一个yield表达式的返回值
 * @param {*} genF 
 * @returns 
 */
function spawn(genFn) {
  return new Promise((resolve, reject) => {
    const iterator = genFn();

    function step(nextF) {
      let nextRes;

      try {
        nextRes = nextF();
      } catch (error) {
        reject(error);
      }
      
      if (nextRes.done) {
        return resolve(nextRes.value);
      }

      /**
       * Promise.resolve
       */
      // static resolve(value) {
      //   if (value instanceof Promise) {
      //     return value;
      //   }
      //   return new Promise((resolve) => {
      //     resolve(value);
      //   })
      // }
      // 兼容处理
      Promise.resolve(nextRes.value).then((v) => {
        step(function() { return iterator.next(v) });
      }, (e) => {
        step(function() { return iterator.throw(e) });
      })
    }

    step(function() { return iterator.next() });
  });
}






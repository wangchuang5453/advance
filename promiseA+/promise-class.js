const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Mpromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];

  _status = PENDING;

  constructor(fn) {
    /**状态 */
    this.status = PENDING;
    /**fulfilled 值 */
    this.value = null;
    /**rejected 值 */
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED:
        this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
      case REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((callback) => {
          callback(this.reason);
        });
        break;
    }
  }

  resolve(value) {
    if (this.status ===  PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status == PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
    const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason };
    const promise2 = new Mpromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      switch (this.status) {
        case FULFILLED: // 同步
          fulfilledMicrotask();
          break;
        case REJECTED: // 同步
          rejectedMicrotask();
          break;
        case PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
          break;
      }
    });
    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
    if (x instanceof Mpromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === 'object' || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
      }

      let then = null;
      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }

      if (this.isFunction(then)) {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) {
                return;
              }
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) {
                return;
              }
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          if (called) {
            return;
          }
          reject(error);
        }
      } else {
        resolve(x);
      }

    } else {
      resolve(x);
    }
  }

  isFunction(param) {
    return typeof param === 'function';
  }

  static resolve(value) {
    if (value instanceof Mpromise) {
      return value;
    }
    return new Mpromise((resolve) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new Mpromise((resolve, reject) => {
      reject(reason);
    });
  }

  static race(promiseList) {
    return new Mpromise((resolve, reject) => {
      const length = promiseList.length;
      if (length === 0) {
        return resolve();
      } else {
        for (let index = 0; index < length; index++) {
          Mpromise.resolve(promiseList[index])
          .then((value) => {
            return resolve(value);
          })
          .catch((reason) => {
            return reject(reason);
          });
        }
      }
    });
  }

  static all(promiseList) {
    return new Mpromise((resolve, reject) => {
      const length = promiseList.length;
      const stack = [];
      if (length === 0) {
        return reject();
      } else {
        for (let index = 0; index < length; index++) {
          Mpromise.resolve(promiseList[index])
          .then((value) => {
            stack.push({
              index,
              value,
            });
            if (stack.length === length) {
              const result = [];
              stack.forEach((item) => {
                result[item.index] = item.value;
              });
              return resolve(result);
            }
          })
          .catch((reason) => {
            return reject(reason);
          });
        }
      }
    });
  }
}


// 1

// const p = new Mpromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1111)
//   }, 1000);
// }).then(console.log);
// console.log(p, '====1');
// setTimeout(() => {
//   console.log(p, '====2');
// }, 2000);

// 打印结果
/**
 * Mpromise {
  FULFILLED_CALLBACK_LIST: [],
  REJECTED_CALLBACK_LIST: [],
  _status: 'pending',
  value: null,
  reason: null
} ====1
1111
Mpromise {
  FULFILLED_CALLBACK_LIST: [],
  REJECTED_CALLBACK_LIST: [],
  _status: 'fulfilled',
  value: undefined,
  reason: null
} ====2
 */

// 问题： 上述value为啥最后是undefined？
// 答案：因为then里面调用的函数console.log没有返回值，返回的undefined
// 不要被promise函数里面的resolve误导，要把整个流程想一遍思考，哪里对value进行了赋值才行！！！

//2
/**
 * FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  这两个数组是不是过渡设计？有没有用到？
  答案：有 下面①情况没有用到，但是②的用法用到了
  ①
  const p = new Mpromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1111)
    }, 1000);
  }).then(() => {}).then(() => {});

  ②
  const p = new Mpromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1111)
    }, 1000);
  })
  p.then(() => {});
  p.then(() => {});
  p.then(() => {});
 */

//3
// const p = new Mpromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1111)
//   }, 1000);
// }).catch((reason) => {
//   console.log('报错', reason);
//   console.log(p, '==== inner'); // 猜一下status是什么 pending
// })

// setTimeout(() => {
//   console.log(p, '==== outer'); // 猜一下status是什么 fulfilled
// }, 2000);

/**
 *  报错 1111
    Mpromise {
      FULFILLED_CALLBACK_LIST: [],
      REJECTED_CALLBACK_LIST: [],
      _status: 'pending',
      value: null,
      reason: null
    } ==== inner
    Mpromise {
      FULFILLED_CALLBACK_LIST: [],
      REJECTED_CALLBACK_LIST: [],
      _status: 'fulfilled',
      value: undefined,
      reason: null
    } ==== outer
 */
// 1、需要关注的是 reject掉的是最初的promise，而p其实是，catch返回的新的promise，
// 而.catch的回调函数正常执行完了没有报错，所以新的promise是fulfilled

// 2、.catch打印console.log的过程，其实是执行回调函数的过程中，而只有回调函数执行完成了，
// 无论是正常的还是报错的，promise2才有一个新的结果。


// test
const p1 = new Mpromise((resolve, reject) => {
  setTimeout(() => {
    resolve(11);
  }, 1000);
});

const p2 = new Mpromise((resolve, reject) => {
  setTimeout(() => {
    resolve(22);
  }, 2000);
});
Mpromise.race([p1, p2]).then((arr) => {
  console.log(arr);
}).catch((error) => {
  console.log(error);
});

Mpromise.all([p1, p2]).then((arr) => {
  console.log(arr);
}).catch((error) => {
  console.log(error);
});
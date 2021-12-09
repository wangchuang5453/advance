const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];

  _status = PENDING;

  constructor(fn) {
    this.status = PENDING;
    
    this.value = null;

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
          callback();
        })
        break;
      case REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((callback) => {
          callback();
        })
      default:
        break;
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
    const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason };
    const promise2 = new MyPromise((resolve, reject) => {
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
        })
      }

      // 根据状态执行微任务
      switch (this.status) {
        case FULFILLED:
          fulfilledMicrotask();
          break;
        case REJECTED:
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

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x ) {
      return reject(new TypeError('The Promise and the value are the same'));
    }
    if (x instanceof MyPromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject)
      })
    } else if(typeof x === 'object' || this.isFunction(x)) {
      if (x === null) {
        return resolve(null);
      }
      let then;
      try {
        then = x.then;
      } catch (error) {
        return reject(error)
      }
      if (this.isFunction(then)) {
        let called = false;
        try {
          then.call(x, (y) => {
            if (called) {
              return;
            }
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            if (called) {
              return;
            }
            called = true;
            this.resolvePromise(promise2, r, resolve, reject);
          })
        } catch (error) {
          if (called) {
            return;
          }
          called = true;
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    })
  }

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (promiseList.length == 0) {
        resolve();
      } else {
        for (let index = 0; index < promiseList.length; index++) {
          MyPromise.resolve(promiseList[index]).then((value) => {
            resolve(value);
          }).catch((error) => {
            reject(error);
          })
        }
      }
    })
  }

  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      const stack = [];
      const length = promiseList.length
      if (length == 0) {
        reject();
      } else {
        for (let index = 0; index < length; index++) {
          MyPromise.resolve(promiseList[index])
          .then((value) => {
            stack.push({ index, value });
            if (stack.length == length) {
              const res = [];
              stack.forEach((item) => {
                res[item.index] = item.value;
              });
              resolve(res);
            }
          }).catch((reason) => {
            reject(reason);
          });
        }
      }
    });
  }

  isFunction(param) {
    return typeof param === 'function';
  }
}
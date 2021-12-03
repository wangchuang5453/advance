const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
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
    
  }

  isFunction(param) {
    return typeof param === 'function';
  }
}
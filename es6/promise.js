function PromiseAll(promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      return reject(new TypeError('参数必须是一个数组'));
    }
    const length = promiseArray.length;
    const resolvedArray = [];
    let counter = 0;
    for (let index = 0; index < length; index++) {
      Promise.resolve(promiseArray[index])
        .then((value) => {
          resolvedArray[index] = {
            status: 'fulfilled',
            value,
          }
        })
        .catch((reason) => {
          resolvedArray[index] = {
            status: 'rejected',
            reason,
          }
        })
        /**
         * 技巧在这里
         */
        .finally(() => {
          counter ++;
          if (counter === length) {
            resolve(resolvedArray);
          }
        });
    }
  });
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000);
})

const p3 = PromiseAll([p1, p2]);
p3.then(() => {
  console.log('11111');
})
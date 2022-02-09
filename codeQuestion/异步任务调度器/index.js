class Scheduler {
  list = []; // 用来承载还未执行的异步
  
  count = 1; // 用来计数

  limit = 0;

  constructor(limit) {
    this.limit = limit;
  }

  async add(fn) {
    if (this.count > this.limit) {
      await new Promise((resolve) => {
        this.list.push(resolve);
      })
    }

    this.count ++;
    const result = await fn();
    this.count --;

    if (this.list.length > 0) {
      this.list.shift()();
    }

    return result;
  }
}

const s = new Scheduler(3);

const asyncFactory = (n, time) => {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(n);
      }, time);
    });
  }
}

s.add(asyncFactory(1, 2000)).then((n) => { console.log(`异步任务:${n}`); })
s.add(asyncFactory(2, 2000)).then((n) => { console.log(`异步任务:${n}`); })
s.add(asyncFactory(3, 2000)).then((n) => { console.log(`异步任务:${n}`); })
s.add(asyncFactory(4, 2000)).then((n) => { console.log(`异步任务:${n}`); })
s.add(asyncFactory(5, 2000)).then((n) => { console.log(`异步任务:${n}`); })
s.add(asyncFactory(6, 2000)).then((n) => { console.log(`异步任务:${n}`); })

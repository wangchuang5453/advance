# 做习题
## 参考文章
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

每个线程都有自己的事件循环

微任务通常安排在当前执行的脚本之后应该立即发生的事情，
例如对一批动作做出反应，或者在不承担全新任务的情况下进行异步操作。只要没有其他 JavaScript 在中间执行，微任务队列就会在回调之后处理，并且在每个任务结束时处理。在微任务期间排队的任何其他微任务都将添加到队列的末尾并进行处理。微任务包括突变观察者回调，如上例所示，承诺回调。

一旦 Promise 完成，或者如果它已经完成，它会为它的反动回调排队一个微任务。这确保了 Promise 回调是异步的，即使 Promise 已经完成。因此，针对已确定的承诺调用 .then(yey, nay) 会立即将微任务排队。这就是为什么在脚本结束后记录 promise1 和 promise2 的原因，因为当前运行的脚本必须在处理微任务之前完成。 promise1 和 promise2 在 setTimeout 之前记录，
因为微任务总是在下一个任务之前发生。


如果脚本设置对象堆栈现在为空，则执行微任务检查点

— HTML：回调步骤 3 后的清理



--Level 1 boss's angry older brother

以前，这意味着微任务在侦听器回调之间运行，但 .click() 会导致事件同步调度，因此调用 .click() 的脚本仍在回调之间的堆栈中。 上述规则确保微任务不会中断正在执行的 JavaScript。 这意味着我们不在侦听器回调之间处理微任务队列，它们在两个侦听器之后处理。



# 整体描述事件循环机制
## 参考文章 浏览器和 Node.js 的 EventLoop 为什么这么设计？
https://juejin.cn/post/7049385716765163534
zxg_神说要有光

Event Loop 是 JavaScript 的基础概念，面试必问，平时也经常谈到，但是有没有想过为什么会有 Event Loop，它为什么会这样设计的呢？

今天我们就来探索下原因。

浏览器的 Event Loop

JavaScript 是用于实现网页交互逻辑的，涉及到 dom 操作，如果多个线程同时操作需要做同步互斥的处理，为了简化就设计成了单线程，但是如果单线程的话，遇到定时逻辑、网络请求又会阻塞住。怎么办呢？

可以加一层调度逻辑。把 JS 代码封装成一个个的任务，放在一个任务队列中，主线程就不断的取任务执行就好了。
每次取任务执行，都会创建新的调用栈。

其中，定时器、网络请求其实都是在别的线程执行的，执行完了之后在任务队列里放个任务，告诉主线程可以继续往下执行了。

因为这些异步任务是在别的线程执行完，然后通过任务队列通知下主线程，是一种事件机制，所以这个循环叫做 Event Loop。

这些在其他线程执行的异步任务包括定时器（setTimeout、setInterval），UI 渲染、网络请求（XHR 或 fetch）。
但是，现在的 Event Loop 有个严重的问题，没有优先级的概念，只是按照先后顺序来执行，那如果有高优先级的任务就得不到及时的执行了。所以，得设计一套插队机制。
那就搞一个高优先级的任务队列就好了，每执行完一个普通任务，都去把所有高优先级的任务给执行完，之后再去执行普通任务。

有了插队机制之后，高优任务就能得到及时的执行。
这就是现在浏览器的 Event Loop。
其中普通任务叫做 MacroTask（宏任务），高优任务叫做 MicroTask（微任务）。
宏任务包括：setTimeout、setInterval、requestAnimationFrame、Ajax、fetch、**script 标签**的代码。
微任务包括：Promise.then、MutationObserver、Object.observe(这个接口已经被废弃并从各浏览器中移除)。

```js MutationObserver
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();


```

怎么理解宏微任务的划分呢？

定时器、网络请求这种都是在别的线程跑完之后通知主线程的普通异步逻辑，所以都是宏任务。

而高优任务的这三种也很好理解，MutationObserver 和 Object.observe 都是监听某个对象的变化的，变化是很瞬时的事情，肯定要马上响应，不然可能又变了，Promise 是组织异步流程的，异步结束调用 then 也是很高优的。

这就是浏览器里的 Event Loop 的设计：设计 Loop 机制和 Task 队列是为了支持异步，解决逻辑执行阻塞主线程的问题，设计 MicroTask 队列的插队机制是为了解决高优任务尽早执行的问题。

但是后来，JS 的执行环境不只是浏览器一种了，还有了 Node.js，它同样也要解决这些问题，但是它设计出来的 Event Loop 更细致一些。


## node官网 事件循环 图文并茂
http://www.nodejs.cn/learn/the-nodejs-event-loop

当调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。 当定时器到期时（在此示例中会立即到期，因为将超时值设为 0），则回调函数会被放入“消息队列”中。

在消息队列中，用户触发的事件（如单击或键盘事件、或获取响应）也会在此排队，然后代码才有机会对其作出反应。 类似 onLoad 这样的 DOM 事件也如此。

事件循环会赋予调用堆栈优先级，它首先处理在调用堆栈中找到的所有东西，**一旦其中没有任何东西**，便开始处理消息队列中的东西。

我们不必等待诸如 setTimeout、fetch、或其他的函数来完成它们自身的工作，因为它们是由浏览器提供的，并且位于它们自身的线程中。 例如，如果将 setTimeout 的超时设置为 2 秒，但不必等待 2 秒，等待发生在其他地方。



## tick
在Event Loop中，每一次循环称为tick，每一次tick的任务如下：

执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
检查是否存在微任务，有则会执行至微任务队列为空；
如果宿主为浏览器，可能会渲染页面；
开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。


单线程的运行环境有且只有一个call-stack调用栈(执行栈)，所有的任务(代码)都会被放到调用栈等待浏览器的主线程执行。

此时整体代码script作为第一个宏任务开始执行，执行到异步代码时会先把异步代码放到event Table/webapi注册，注册之后根据异步代码选择放入微任务/宏任务的event queue，同时继续执行主线程中的同步代码。

整体代码执行完之后event loop会先检查微任务Event Queue队列中有没有回调函数，如果有就将它放到执行栈中执行(执行完一个函数检查一次队列，如果队列还有函数就再继续执行下一个一个函数，以此类推队列的函数一个一个执行)，执行完微任务Event Queue后第一轮事件循环就结束了。

第二轮循环事件开始，先从宏任务开始，发现宏任务Event Queue中有上一轮保存的回调函数，立即执行，执行完检查该回调函数中有没有微任务，有就放入微任务Eevent Queue，执行完宏任务之后就又执行刚刚放入的微任务，结束
后续如果有嵌套更多的微/宏任务就继续像上面一样循环，直到执行完所有代码

每当事件循环进行一次完整的行程时，我们都将其称为一个滴答。

当将一个函数传给 process.nextTick() 时，则指示引擎在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数：
```js
process.nextTick(() => {
  //做些事情
})
```
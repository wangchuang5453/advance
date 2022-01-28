# 对data中的某个属性进行多次重复的赋值，页面更新几次？

1次
Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
-- vue官方文档

watcher实例上存在id，绑定时候就已经生成，每次set触发watcher，watcher会被nextTick推入到任务队列中等待执行，推入前会判断wactherid是否已经存在，
如果已经存在就不再推入watcher实例。在清空队列时，会清除id存在的记录，然后执行watcher.run。run 函数中会调用get函数，重新获取绑定watcher的数据的新的赋值，
比较新获取的值和watcher中存储的旧值，如果相同则不做处理。如果不同，则执行cb函数或者刷新组件。



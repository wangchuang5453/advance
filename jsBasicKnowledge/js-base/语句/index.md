# break 和 continue 
break立即退出循环，执行循环后的下一条语句

continue立即退出本轮循环，进行下一次

# with语句

with将代码的作用域设置为特性的对象

let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.url;
=>
with(location) {
  let qs = search.substring(1);
  let hostName = hostname;
  let url = url;
}

意味着这个语句内部，每个变量会首先被认为是一个局部变量。
如果没有找到该局部变量，搜索location对象

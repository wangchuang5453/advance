# 类型转换

## number

let a = 1;
a.toString() // 自动包装类  '1'
Number(1).toString() // '1'

String(1) // '1'

## boolean
let a = true;
a.toString() // 'true'
Boolean(true).toString() // 'true'

String(true) // 'true'

toString 方法可以用于数值 布尔值 对象 和 字符串值

## null 和 undefined 没有toString()方法
let a = null | undefined
a.toString() // 个人觉得没有包装类
Uncaught TypeError: Cannot read properties of null (reading 'toString')
    at <anonymous>:1:3
(anonymous) @ VM2138:1

可以使用String()
String(null) // 'null'
String(undefined) // 'undefined'

## symbol
let s = Symbol()
typeof s // 'symbol'

s.toString() // 'Symbol()'

String(Symbol) // 'function Symbol() { [native code] }'

## 引用类型
### 函数
function fn() {}
fn.toString() // 'function fn() {}'

### 数组
[].toString() // ''
[1,2,3].toString() // '1,2,3'
[1,2,3,[2,3,[4]]].toString() // '1,2,3,2,3,4'

### 对象
{}.toString() // 报错 对象字面量拿不到这个函数 Uncaught SyntaxError: Unexpected token '.'

let a = {};
a.toString() // '[object Object]'  自动包装类
String({}) // '[object Object]' 手动包装

===================================================


# toString 可以转进制
let num = 10;

num.toString() // '10'
num.toString(2) // '1010'
num.toString(8) // '12'
num.toString(10) // '10'
num.toString(16) // 'a'

===================================================

# 模板字面量

let value = 1;
function fn() {
  console.log('fn')
  return 'fn'
}

`${value} ${fn()}`

所有插入的值都会使用**toString()**强制转型为字符串，而且任何Javascript 表达式都可以用于插值

let s = Symbol();
`${s}`
Symbol无法转换
VM1848:1 Uncaught TypeError: Cannot convert a Symbol value to a string
    at <anonymous>:1:1

对象调用toString 是'[object Object]'
let obj = {
  toString() {
    return 1;
  }
}
`${obj}` // '1'









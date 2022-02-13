# symbol

符号 原始类型

### 特性：
符号实例 唯一 不可变

### 作用：
符号是用来创建唯一记号，进而用作非字符串形式的对象属性

### 如何创建：

let sym = Symbol()

typeof sym // 'symbol'

也可以传入一个参数作为对符号的描述
let sym = Symbol('foo')
let sym1 = Symbol('foo')
...

sym == sym1 // false


符号没有字面量语法，这也是发挥它作用的关键

按照规范，只要创建Symbol()实例并将其用作对象的新属性，就可以保证不会覆盖已有的对象属性，无论是符号属性还是字符串属性

### Symbol.iterator

这个符号作为一个属性表示，该**方法**返回对象的默认迭代器




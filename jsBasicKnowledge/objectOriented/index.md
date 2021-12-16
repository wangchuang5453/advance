# 3、原型链

# 4、静态属性/方法 实例属性/方法

```js

function Player(color) {
  this.color = color;
  if (Player.total) {
    Player.total = 0;
  }
  Player.total++;
}

```



# 各种继承

## 原型链继承

```js

function Parent() {
  this.name = 'parent name';
}

Parent.prototype.getName = function () {
  console.log(this.name);
}

function Child() {
  
}

// 原型链继承
Child.prototype = new Parent();
Child.prototype.construct = Child;

const child = new Child();

```

### 缺点

1、如果有属性是引用类型的，一旦某个实例修改了这个属性，所有实例都会受到影响

2、创建child实例时候，不能传参


## 构造函数继承

```js

function Parent(name, actions) {
  this.name = name;
  this.actions = actions;
  this.eat = function () {
    // 
  }
}

function Child(id, name, actions) {
  Parent.call(this, name, actions);
  this.id = id;
}

const child = new Child(1, 'c1', ['eat']);

```

### 缺点

1、属性或者方法如果想要被继承的话，只能在构造函数中定义。
而如果方法在构造函数中定义了，那么每次创建实例都会创建一遍方法，多占一块内存。


## 组合继承

原型链继承 方法存在于prototype上，子类可以直接调用，但是引用类型的属性会被所有实例共享，并且不能传参
构造函数继承，使用call在子构造函数中重复一遍属性和方法的操作，可以传参了

```js

function Parent(name, actions) {
  this.name = name;
  this.actions = actions;
}

Parent.prototype.eat = function () {
  console.log(`${this.name}eat`);
}

function Child(id, ...args) {
  Parent.apply(this, args); // 
  this.id = id;
}

Child.prototype = new Parent(); //
Child.prototype.construct = Child;

const child = new Child(1, 'c1', ['eat']);

```

### 缺点

1、Parent函数被调用了2次 Parent.call 和 Child.prototype = new Parent()


## 寄生组合继承

```js

function Parent(name, actions) {
  this.name = name;
  this.actions = actions;
}

Parent.prototype.eat = function () {
  console.log(`${this.name}eat`);
}

function Child(id, name, actions) {
  Parent.call(this, name, actions);
  this.id = id;
}

// Child.prototype = new Parent();

// 1、可以
// let TempFunction = function () {};
// TempFunction.prototype = Parent.prototype;
// Child.prototype = new TempFunction();

// 2、这种最省事
Child.prototype = Object.create(Parent.prototype);

// 3、 这样做修改子的prototype会影响父的prototype
// hild.prototype = Parent.prototype;

Child.prototype.construct = Child;

const child = new Child(1, 'c1', ['eat']);

```


## class继承

```js

class Parent {
  constructor() {
    this.name = 'aaa';
  }

  getName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  name = 'ss';

  constructor() {
    super();
  }

  static age = 10;

  getXXX() {
    console.log(this.name);
    console.log(Child.age);
  }
}

const p1 = new Child();

p1.getName();

```
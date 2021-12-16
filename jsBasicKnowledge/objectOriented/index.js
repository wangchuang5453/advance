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



class Parent {
  constructor() {
    this.name = 'aaa';
  }

  getName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor() {
    super();
  }
}

const p1 = new Child();

p1.getName();
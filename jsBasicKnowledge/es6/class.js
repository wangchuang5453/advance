class Test {
  _name = '';

  constructor(name) {
    this.name = name;
  }

  static getFormatName() {
    return `${this.name} afafafa`;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

const { name } = new Test('wangchuang');
console.log(name);
console.log(Test.getFormatName()); // Test afafafa




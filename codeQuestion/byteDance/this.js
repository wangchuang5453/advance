var name = 'global';

const data1 = {
  name: '111',
  fn() {
    console.log(this.name);
  }
}

const data2 = {
  name: '222',
  fn(say) {
    console.log(this.name);
    say(); // 默认绑定独立调用指向全局
  }
}

data2.fn(data1.fn); // 222 'global'

data2.fn = data1.fn;
data2.fn(); // 222




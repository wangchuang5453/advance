var name = '123';

var obj = {
  name: 'wang',
  print: function () {
    function a() {
      console.log(this.name);
    }
    a(); // 默认绑定
  }
}

obj.print(); // 123
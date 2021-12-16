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
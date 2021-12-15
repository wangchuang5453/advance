function v() {
  console.log(a); // [function] a
  var a = 1;
  console.log(a); // 1
  function a() {}
  console.log(a); // 1
  console.log(b); // [function] b
  var b = 2;
  console.log(b); // 2
  function b() {}
  console.log(b); // 2
}
v();
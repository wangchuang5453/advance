if (!(a in window)) { // a声明提升 a in window => true
  var a = 1;
}

console.log(a);

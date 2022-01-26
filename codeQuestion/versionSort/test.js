const arr = ['0.5.1','0.1.1','2.3.3','0.302.1','4.2','4.3.5','4.3.4.5'];

// arr.sort((a, b) => {
//   let s1 = a.split('.');
//   let s2 = b.split('.');
//   let i = 0;
//   while(s1[i] !== undefined && s2[i] !== undefined) {
//     let res = s2[i] - s1[i];
//     i++;
//     if (res === 0) { // 考虑相等的情况
//       continue;
//     }
//     return res;
//   }
//   return s2.length - s1.length;
// })


/**
 * 思路： 逐位比较
 * 指针超出长度，则使用位数排序，因为前几位都相等，位数多的就大
 * 具体还是要看怎么设计版本号，然后根据版本号规则进行比较排序
 */
arr.sort((a, b) => {
  let arr1 = a.split('.');
  let arr2 = b.split('.');
  let i = 0;
  while(true) {
    let s1 = arr1[i];
    let s2 = arr2[i++];
    if (s1 === undefined || s2 === undefined) {
      return s2.length - s1.length;
    }
    if (s1 === s2) {
      continue
    }
    return s2 - s1;
  } 
});

console.log(arr);
/**
两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。

给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
示例 1：

输入：x = 1, y = 4
输出：2
解释：
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
示例 2：

输入：x = 3, y = 1
输出：1
 

提示：

0 <= x, y <= 231 - 1
*/

var hammingDistance = function(x, y) {
  let s = x ^ y, ret = 0; // 与或位运算
  while (s != 0) {
      ret += s & 1; // 获取到最后一位的值是0还是1
      s >>= 1; // 有符号位右移
  }
  return ret;
};

const res = hammingDistance(3,1)
console.log(res);

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/hamming-distance/solution/yi-ming-ju-chi-by-leetcode-solution-u1w7/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
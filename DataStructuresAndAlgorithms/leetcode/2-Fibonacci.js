/**
  写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。
  斐波那契数列的定义如下：
  F(0) = 0,   F(1) = 1
  F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
  斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
  答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
  示例 1：
  输入：n = 2
  输出：1
  示例 2：
  输入：n = 5
  输出：5
 * 
 */
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  //执行用时：60 ms, 在所有 JavaScript 提交中击败了78.63%的用户
  //内存消耗：41.2 MB, 在所有 JavaScript 提交中击败了11.32%的用户
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  const MOD = 1000000007;
  let arr = [0, 1];
  let i = 0;
  let j = 1;
  while(j < n) {
    arr.push((arr[i] + arr[j]) % MOD);
    i++;
    j++;
  }
  return arr[n]
};

/**
 * 动态规划
 * @param {*} n 
 * @returns 
 */
var fib2 = function(n) {
  //执行用时：56 ms, 在所有 JavaScript 提交中击败了90.82%的用户
  //内存消耗：40.9 MB, 在所有 JavaScript 提交中击败了37.28%的用户
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  const MOD = 1000000007;
  let i = 0;
  let j = 1;
  let k;
  let l = 1;
  while(l < n) {
    k = (j + i) % MOD;
    l++;
    i = j;
    j = k;
  }
  return k;
}

/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

同上，都是斐波那契问题
 */

 





/**
 * 算法题
 * 动态规划求解最多有几种方案求解硬币找零问题
 * 一定要看网址中的解析
 * https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-yin-ru-pian-zhu-bu-tan-suo-zhao-l/
 */


// 递归
const coinChange = (coins, amount) => {
  if (amount <= 0) {
    return 0;
  }
  let min = Infinity;
  for (const coinVal of coins) {
    if (amount >= coinVal) {
      min = Math.min(min, coinChange(coins, amount - coinVal) + 1);
    }
  }
  return min;
}

// let coins = [1, 5, 11];
// let amount = 70; // 如果是 70 => 8 计算时间超级超级长，具体原因看网址解析
// const res = coinChange(coins, amount);
// console.log(res);

/**
 * 递归的弊端
 * 当n=27000的时候,我们成功的爆栈了
 * 所以为什么会造成如此长的执行耗时?归根到底是递归算法的低效导致的
 * 大量的重复计算导致时间复杂度奇高,我们必须想办法解决这个问题
 * 建立一个备忘录,把计算过的答案记录在备忘录中,再有我们需要答案的时候,我们去备忘录中查找,
 * 如果能查找到就直接返回答案,这样就避免了重复计算,这就是算法中典型的空间换时间的思维，我们用备忘录占用的额外内存换取了更高效的计算。
 * 
 * 有了思路后,其实代码实现非常简单,我们只需要建立一个缓存备忘录,在函数内部校验校验是否存在在结果,如果存在返回即可。
 * 
 * 实际上利用备忘录来解决递归重复计算的问题叫做「记忆化搜索」
 */


const coinChange2 = (coins, amount) => {
  const cache = [];

  const fn = (coins, amount) => {
    if (amount <= 0) {
      return 0;
    }
    if (cache[amount]) return cache[amount];
    let min = Infinity;
    for (const coinVal of coins) {
      if (amount >= coinVal) {
        min = Math.min(min, fn(coins, amount - coinVal) + 1);
      }
    }
    return (cache[amount] = min);
  }

  return fn(coins, amount);
}

// let coins = [1, 5, 11];
// let amount = 70; // 和上面的比简直秒开
// const res = coinChange2(coins, amount);
// console.log(res);

/**
 * 这个带备忘录的递归算法时间复杂度只有O(n),已经跟动态规划的时间复杂度相差不大了
 * 
 * 备忘录递归计算 f(27000) 的结果 还是会爆栈
 * 编程语言栈的深度是有限的,即使我们进行了剪枝,在五位数以上的情况下就会再次产生爆栈的情况,这导致递归根本无法完成大规模的计算任务。
 * 这是递归的计算形式决定的,我们这里的递归是「自顶向下」的计算思路，
 * 即从 f(70) f(69)...f(1) 逐步分解,这个思路在这里并不完全适用,我们需要一种「自底向上」的思路来解决问题。
 * 「自底向上」就是 f(1) ... f(70) f(69)通过小规模问题递推来解决大规模问题,动态规划通常是用迭代取代递归来解决问题。
 * 「自顶向下」的思路在另一种算法思想中非常常见,那就是分治算法
 */


/**
 * 动态转移方程 的方式
 */

const coinChange3 = (coins, amount) => {
  const dp = new Array((amount + 1)).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount ; i++) {
    for (const coinVal of coins) {
      if (i >= coinVal) {
        dp[i] = Math.min(dp[i], dp[i - coinVal] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

let coins = [1, 5, 11];
let amount = 70;
const res = coinChange3(coins, amount);
console.log(res);
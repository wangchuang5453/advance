https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-yin-ru-pian-zhu-bu-tan-suo-zhao-l/
此文章很好，仔细研读并记忆

# 动态规划引入篇: 逐步探索找零问题

动态规划(Dynamic programming，简称DP)是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。

## 那么为什么动态规划会在面试中这么重要?

其实最主要的原因就是动态规划非常适合面试，因为动态规划没办法「背」。

我们很多求职者其实是通过背题来面试的，而之前这个做法屡试不爽，什么翻转二叉树、翻转链表，快排、归并、冒泡一顿背，基本上也能在面试中浑水摸鱼过去，其实这哪是考算法能力、算法思维，这就是考谁的备战态度好，愿意花时间去背题而已，把连背都懒得背的筛出去就完事了。

但是随着互联网遇冷，人才供给进一步过热，背题的人越来越多，面试的门槛被增加了，因此这个时候需要一种非常考验算法思维、变化多端而且容易设计的题目类型，动态规划就完美符合这个要求。

比如 LeetCode 中有1261道算法类题目,其中动态规划题目占据了近200道，动态规划能占据总题目的 1/6 的比例,可见其火热程度。

更重要的是，动态规划的题目难度以中高难度为主:

把「原有的大问题逐渐分解成类似的但是规模更小的子问题」这就是最优子结构,我们可以通过自底向上的方式递归地从子问题的最优解逐步构造出整个问题的最优解。


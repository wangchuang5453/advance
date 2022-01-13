**注意：算法一点都不能错，错一点也不合格了！！实现思量，搞清楚边界，一点不能搞错**

# O(n^2)

## 选择排序 O(n^2)
按顺序选择一个和其他的去做比较

### 选择排序优化
比较过程中，最大值和最小值同时寻找，同时不断移动指针缩小范围，重复这个过程


## 插入排序 insertion sort O(n^2)
类似扑克牌比较，数组中数据的交换，交换之后数据改变然后还要继续向前比对
**错误+1**

## 插入排序 优化
不使用一步步交换

### 插入排序 优化版本 范围为[l, r]
从l+1开始到<=r结束

## 希尔排序 序列选择的好可以达到O(2^3/2)
理解这个过程
**难度+1**

## 冒泡排序
优化版本特别棒

===================================================================

# O(nlogn)

## 归并排序
注意边界判断时候的赋值
二分处理好层级，自下而上的归并操作，归并的时候进行排序

## 快速排序
处理好一层的数据划分后向下拆分，拆分的过程中在进行排序

问题：
可能拆分的数组不平衡，有的大有的小
导致拆分出的层数大于logn，最差可能达到n^2

### 优化1
[l, r]范围内选择一个随机数，和第一个数据交换
解决拆分出的数据大小不平衡问题

### 二路快排 优化大量重复数据造成的不平衡问题
相等的数据参与交换进行优化
左右里面都会有相等的数据

两个指针，分别行进，发现不符合条件的就进行交换

### 三路排序
不处理相等数据

一个指针i遍历所有数据，发现大的放到大的指针(gt-1)那边，发现小的放到小的指针(lt+1)那边，相等的直接跳过不处理
把相等的数据放在中间了


## 归并和快排衍生问题

归并的方式统计逆序对

快速排序思想找到第n大的数据

===================================================================

# 数据结构

## 二叉堆 Binary Heap  
对应二叉树，二叉树就是每 1 个节点可以对应 2 个子节点

二叉堆必须满足满足：
1、任何一个子节点都不大于它的父亲节点（liuyubo称为最大堆 改成不小于 liuyubo称为最小堆）
**注意：不代表上层的数据就比下层的数据大，这里只是针对父子节点之间满足这个条件**
2、是一棵完全二叉树（除最后一层外，其它层节点个数必须是最大值，最后一层的所有节点都必须集中在左侧）

用数组表示 从1开始
insert => shiftUp(this.count) 自下而上
extractMax => shiftDown(1) 自上而下

### 堆排序

### 索引堆
数组中的数据随便位置插入，索引数组用于存储数组每个数据的索引，反向查找表用于在索引数组中找到数组中值的索引在索引数组中的位置
data[i] = value;
indexes[j] = i;
reverse[i] = j;
索引数组还是按照堆的方式存储和使用(从1开始)
二叉堆的逻辑不变，只是直接操作索引数组，相应的也要处理反向数组

反向数组可以直接使用data中的索引查找数据的索引在索引数组中存储的位置，省去遍历索引数组浪费时间
看change函数可知意义


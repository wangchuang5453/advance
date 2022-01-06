const { swap } = require('./sortTestHelper.js');
/**
 * 选择排序 O(n^2)
 * 按顺序选择一个和其他的去做比较
 */

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) { // less(arr[j], arr[minIndex]) 函数 - 定义排序规则
        minIndex = j;
      }
    }
    swap(arr, minIndex, i);
  }
}

/**
 * 选择排序优化
 * 在每一轮中, 可以同时找到当前未处理元素的最大值和最小值
 * @param {*} arr 
 * @param {*} n 
 */
function selectionSort2(arr, n) {
  let left = 0;
  let right = n - 1;
  while(left < right) {
    let minIndex = left;
    let maxIndex = right;
    // 别忘记这里的判断
    if (arr[minIndex] > arr[maxIndex]) {
      swap(arr, minIndex, maxIndex);
    }
    for (let i = left + 1; i < right; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      } else if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }
    swap(arr, left, minIndex);
    swap(arr, right, maxIndex);
    left++;
    right--;
  }
}


/**
 * 插入排序 insertion sort O(n^2)
 * 类似扑克牌比较，数组中数据的交换
 */

function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1)
      } else {
        break;
      }
    }
  }
}
// => 简化但是可读性差，还容易忽略break那部分的意义
function insertionSort2(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1);
    }
  }
}
// => 优化
function insertionSort3(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let e = arr[i];
    let j;
    for (j = i; j > 0 && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1];
    }
    // 循环最后j还会减一次1
    arr[j] = e;
  }
}

// [l, r]
function insertionSortLR(arr, l, r) {
  for (let i = l + 1; i <= r; i++) {
    let e = arr[i];
    let j;
    for (j = i; j > l && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1];
    }
    // 循环最后j还会减一次1
    arr[j] = e;
  }
}

/**
 * 作业
 * 1、冒泡排序
 * 用所学分析插入排序的过程去分析
 * 排序能不能优化
 * 试着分析在各种情况下的性能
 * 和插入排序和选择排序的差别
 * 2、shell sort 希尔排序
 * 和插入排序思想相近
 */



/**
 * bubble sort 冒泡排序
 * 
 *  n-1 轮
 */
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

/**
 * 更好的写法
 * @param {*} params 
 */
function bubbleSort2(arr, n) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i+1]) {
        swap(arr, i, i+1);
        swapped = true; // 这样的好处是如果已经顺序对了就不用无脑比对了
      }
    }
    // 优化, 每一趟Bubble Sort都将最大的元素放在了最后的位置
    // 所以下一次排序, 最后的元素可以不再考虑
    n--;
  } while (swapped);
}

/**
 * 进一步优化
 * @param {*} arr 
 * @param {*} n 
 */
function bubbleSort2(arr, n) {
  let newn; // 使用newn进行优化
  do {
    newn = 0;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i+1]) {
        swap(arr, i, i+1);
        newn = i + 1;
      }
    }
    // 记录最后一次的交换位置,在此之后的元素在下一轮扫描中均不考虑
    n = newn;
  } while (newn > 0);
}

/**
 * shell sort
 * 希尔排序
 * 比较SelectionSort, InsertionSort和BubbleSort和ShellSort四种排序算法的性能效率
 * ShellSort是这四种排序算法中性能最优的排序算法
 * 
 * 简单插入排序很循规蹈矩，不管数组分布是怎么样的，依然一步一步的对元素进行比较，移动，插入，
 * 比如[5,4,3,2,1,0]这种倒序序列，数组末端的0要回到首位置很是费劲，比较和移动元素均需n-1次。
 * 而希尔排序在数组中采用跳跃式分组的策略，通过某个增量将数组元素划分为若干组，然后分组进行插入排序，
 * 随后逐步缩小增量，继续按组进行插入排序操作，直至增量为1。
 * 希尔排序通过这种策略使得整个数组在初始阶段达到从宏观上看基本有序，小的基本在前，大的基本在后。
 * 然后缩小增量，到增量为1时，其实多数情况下只需微调即可，不会涉及过多的数据移动。
 * 
 * 在希尔排序的理解时，我们倾向于对于每一个分组，逐组进行处理，但在代码实现中，
 * 我们可以不用这么按部就班地处理完一组再调转回来处理下一组（这样还得加个for循环去处理分组）比如[5,4,3,2,1,0] ，
 * 首次增量设gap=length/2=3,则为3组[5,2] [4,1] [3,0]，实现时不用循环按组处理，
 * 我们可以从第gap个元素开始，逐个跨组处理。
 * 同时，在插入数据时，可以采用元素交换法寻找最终位置，也可以采用数组元素移动法寻觅。
 * 
 * https://www.cnblogs.com/chengxiao/p/6104371.html
 */
function shellSort(arr) {
  const n = arr.length;
  
  let h = 1;
  
  while (h < Math.floor(n/3)) {
    h = h * 3 + 1; // 接近n的长度

    // sequence 1 4 13 40 121 364 1093 ...    => O(n^(3/2))
    // 一些经过优化的增量序列如Hibbard经过复杂证明可使得最坏时间复杂度为O(n3/2)
    // Hibbard增量序列的取法为𝐷𝑘=2𝑘−1：{1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191...}
    // 最坏时间复杂度为𝑂(𝑁3/2)；平均时间复杂度约为𝑂(𝑁5/4)
  }

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      let j;
      // 对 arr[i], arr[i-h], arr[i-2*h], arr[i-3*h]... 使用插入排序
      let e = arr[i];
      for (j = i; j >= h && arr[j - h] > e; j-=h) {
        arr[j] = arr[j - h];
      }
      arr[j] = e;
    }

    h = Math.floor(h/3)
  }
}



module.exports = {
  selectionSort,
  insertionSort3,
  bubbleSort,
  shellSort,
  insertionSortLR,
}



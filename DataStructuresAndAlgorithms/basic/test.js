const { generateRandomArray, testSort, generateNearlyOrderedArray } = require('./sortTestHelper.js');
const { 
  selectionSort,
  insertionSort3,
  bubbleSort,
  shellSort,
} = require('./1-sort(n^2).js');

const { mergeSort, mergeSortBU, quickSort, quickSort2, quickSort3, quickSort4, quickSort3Way } = require('./2-sort(nlogn).js');

// const bubbleArr = generateRandomArray(1000000, 0, 10000000);
// const bubbleArr = generateNearlyOrderedArray(1000000, 100)
// const bubbleArr = generateNearlyOrderedArray(10000, 100).reverse();
// const bubbleArr = generateNearlyOrderedArray(10000, 0);
// 重复数组
const bubbleArr = generateRandomArray(1000000, 0, 10);

// testSort(selectionSort, bubbleArr.concat([]))
// testSort(insertionSort3, bubbleArr.concat([]));
// testSort(bubbleSort, bubbleArr.concat([]));
// testSort(shellSort, bubbleArr.concat([]));


testSort(mergeSort, bubbleArr.concat([]));
// testSort(mergeSortBU, bubbleArr.concat([]));
// testSort(quickSort, bubbleArr.concat([]));

/**
 * *有序数据* 排序现在的快排（quickSort2）超级慢
 */
// testSort(quickSort2, bubbleArr.concat([]));


/**
 * 进一步优化后处理有序数组
 */
// testSort(quickSort3, bubbleArr.concat([]));

/**
 * 优化，处理大量重复数据的数组
 * 2路快排
 */
testSort(quickSort4, bubbleArr.concat([]));

 /**
  * 优化，处理大量重复数据的数组最快，无序数组和二路差不多，顺序数组二路快但是三路也可以保证，归并都是最慢
  * 各有优劣
  * 
  * 3路快排
  */
testSort(quickSort3Way, bubbleArr.concat([]));



const { generateRandomArray, testSort, generateNearlyOrderedArray } = require('./sortTestHelper.js');
const { 
  selectionSort,
  insertionSort3,
  bubbleSort,
  shellSort,
} = require('./1-sort(n^2).js');

const { mergeSort, mergeSortBU } = require('./2-sort(nlogn).js');

const bubbleArr = generateRandomArray(50000, 0, 100000);
// const bubbleArr = generateNearlyOrderedArray(50000, 100)
// const bubbleArr = generateNearlyOrderedArray(10000, 100).reverse();
// const bubbleArr = generateNearlyOrderedArray(10000, 0);


// testSort(selectionSort, bubbleArr.concat([]))
testSort(insertionSort3, bubbleArr.concat([]));
// testSort(bubbleSort, bubbleArr.concat([]));
// testSort(shellSort, bubbleArr.concat([]));


testSort(mergeSort, bubbleArr.concat([]));
testSort(mergeSortBU, bubbleArr.concat([]));


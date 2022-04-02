// 通过 PerformancePaintTiming 获取 FP 和 FCP
function getPaintTimings() {
  let performance = window.performance;
  if (performance) {
    let paintEntries = performance.getEntriesByType('paint');
    console.log(paintEntries);
    return {
      FP: paintEntries.filter((entry) => entry.name === 'first-paint')[0].startTime,
      FCP: paintEntries.filter((entry) => entry.name === 'first-contentful-paint')[0].startTime,
    }
  }
}

// const observer = new PerformanceObserver((entryList) => {
//   for (const entry of entryList.getEntries()) {
//     console.log('LCP candidate', entry.startTime, entry);
//   }
// })
// observer.observe({type: 'largest-contentful-paint', buffered: true});

const onFirstInputEntry = (entry) => {
  const fid = entry.processingStart - entry.startTime;
  console.log(fid);
  //report({fid});
}

const observer = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach(onFirstInputEntry)
})
observer.observe({type: 'first-input', buffered: true});
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
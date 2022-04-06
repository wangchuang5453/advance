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

let clsValue = 0;
let clsEntries = [];
let sessionValue = 0;
let sessionEntries = [];
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      const firstSessionEntry = sessionEntries[0];
      const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
      if (sessionValue
          && entry.startTime - lastSessionEntry.startTime < 1000
          && entry.startTime - firstSessionEntry.startTime < 5000) {
        sessionValue += entry.value;
        sessionEntries.push(entry);
      } else {
        sessionValue = entry.value;
        sessionEntries = [entry];
      }
      if (sessionValue > clsValue) {
        clsValue = sessionValue;
        clsEntries = sessionEntries;
        console.log('CLS:', clsValue, clsEntries);
      }
    }
  }
}).observe({ type: 'layout-shift', buffered: true });


// sampleRate 0~1
Report.send = function (data, sampleRate) {
  // 采样率
  if (Math.random() < sampleRate) {
    return send(data) // 上报错误信息
  }
}
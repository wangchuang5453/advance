import a from './views/a.js';
import './css/c.less';
export function b() {
  a.test();
  console.log('index.js');
}

function generate() {
  b();
  const ele = document.getElementById('app');
  ele.classList.add('wrapper');
}

document.body.appendChild(generate());
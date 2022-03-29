import a from './views/a.js';
import './css/c.less';
import ipImg from './static/images/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg';
export function b() {
  a.test();
  console.log('index.js ====');
}

function generate() {
  b();
  const ele = document.getElementById('app');
  ele.classList.add('wrapper');
  let img = document.createElement('img');
  img.src = ipImg;
  ele.appendChild(img);
}

document.body.appendChild(generate());
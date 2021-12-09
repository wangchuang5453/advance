import add from './moduleA.js';
import multiply from './moduleB.js';

const res = add(1, 2);
const result = multiply(res, 2);
console.log(result);

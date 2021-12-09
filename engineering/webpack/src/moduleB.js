import add from './moduleA.js';

export default function multiply(a, b) {
  return a * add(a, b);
}
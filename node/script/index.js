const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../assets/react.js')).toString();

console.log(content);


    (function(modules) {
      function localRequire(id) {
        const [ fn, mapping ] = modules[id];
        function require(relativePath) {
          const id = mapping[relativePath];
          return localRequire(id);
        }
        const module = {exports: {}}
        fn(require, module, module.exports);

        return module.exports;
      }
      localRequire(0);
    })({0: [
      function(require, module, exports) {
        "use strict";

var _moduleA = require("./moduleA.js");

var _moduleA2 = _interopRequireDefault(_moduleA);

var _moduleB = require("./moduleB.js");

var _moduleB2 = _interopRequireDefault(_moduleB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var res = (0, _moduleA2.default)(1, 2);
var result = (0, _moduleB2.default)(res, 2);
console.log(result);
      },
      {"./moduleA.js":1,"./moduleB.js":2}
    ],
    1: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = add;
function add(a, b) {
  return a + b;
}
      },
      {}
    ],
    2: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multiply;

var _moduleA = require("./moduleA.js");

var _moduleA2 = _interopRequireDefault(_moduleA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function multiply(a, b) {
  return a * (0, _moduleA2.default)(a, b);
}
      },
      {"./moduleA.js":3}
    ],
    3: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = add;
function add(a, b) {
  return a + b;
}
      },
      {}
    ],
    })
  

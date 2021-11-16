class Module {
  constructor(moduleName, source) {
    this.exports = {};

    this.moduleName = moduleName;

    _cacheModule = new Map();

    this.source = source;
  }

  

  require = (moduleName, source) => {
    if (this._cacheModule.has(moduleName)) {

      this._cacheModule.get(moduleName).exports;

    }

    const module = new Module(moduleName, source);

    const exports = this.compile(module, source);

    this._cacheModule.set(moduleName, module);

    return exports;
  }

  _wrap(code) {
    const wrapper = [
      `return (function (module, exports, require) {
        ${code}
      });`
    ];

    return wrapper;
  }

  /**
   * code 代码字符串
   */
  _runInThisContext = (code, whiteList=['console']) => {
    const func  = new Function('sandbox', `with(sandbox) {${code}}`)
    return function(sandbox) {
      if (!sandbox || typeof sandbox !== 'object') {
        throw Error('sandbox parameter must be an object');
      }

      const proxyObject = new Proxy(sandbox, {
        // 专门处理in
        has(target, key) {
          if (!whiteList.includes(key)) {
            return true;
          }
        },
        get(target, key, receiver) {
          if (key === Symbol.unscopables) {
            return void 0;
          }
          return Reflect.get(target, key, receiver);
        }
      });

      return func(proxyObject);
    }
  }

  compile = (module, source) => {
    // 
  }
}
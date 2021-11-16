(function (modules) {
    //(HMR runtime代码) module.hot属性就是hotCreateModule函数的执行结果，所有hot属性有accept、check等属性
    function hotCreateModule() {
      var hot = {
          accept: function (dep, callback) {
              for (var i = 0; i < dep.length; i++)
                  hot._acceptedDependencies[dep[i]] = callback;
          },
          check: hotCheck,//【在webpack/hot/dev-server.js中调用module.hot.accept就是hotCheck函数】
      };
      return hot;
  }
    
  //(HMR runtime代码) 以下几个方法是 拉取更新模块的代码
  function hotCheck(apply) {}
  function hotDownloadUpdateChunk(chunkId) {}
  function hotDownloadManifest(requestTimeout) {}

  //(HMR runtime代码) 以下几个方法是 执行新代码 并 执行accept回调
  window["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) {
      hotAddUpdateChunk(chunkId, moreModules);
  };
  function hotAddUpdateChunk(chunkId, moreModules) {hotUpdateDownloaded();}
  function hotUpdateDownloaded() {hotApply()}
  function hotApply(options) {}

  //(HMR runtime代码) hotCreateRequire给模块parents、children赋值了
  function hotCreateRequire(moduleId) {
        var fn = function(request) {
          return __webpack_require__(request);
      };
      return fn;
  }

  // 模块缓存对象
  var installedModules = {};

  // 实现了一个 require 方法
  function __webpack_require__(moduleId) {
      // 判断这个模块是否在 installedModules缓存 中
      if (installedModules[moduleId]) {
          // 在缓存中，直接返回 installedModules缓存 中该 模块的导出对象
          return installedModules[moduleId].exports;
      }
    
      // Create a new module (and put it into the cache)
      var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,  // 模块是否加载
          exports: {},  // 模块的导出对象
          hot: hotCreateModule(moduleId), // module.hot === hotCreateModule导出的对象
          parents: [], // 这个模块 被 哪些模块引用了
          children: [] // 这个模块 引用了 哪些模块
      };

      // (HMR runtime代码) 执行模块的代码，传入参数
      modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

      // 设置模块已加载
      module.l = true;

      // 返回模块的导出对象
      return module.exports;
  }

  // 暴露 模块的缓存
  __webpack_require__.c = installedModules;

  // 加载入口模块 并且 返回导出对象
  return hotCreateRequire(0)(__webpack_require__.s = 0);
})(
  {
      "./src/content.js":
          (function (module, __webpack_exports__, __webpack_require__) {}),
      "./src/index.js":
          (function (module, exports, __webpack_require__) {}),// 在模块中使用的require都编译成了__webpack_require__

      "./src/lib/client/emitter.js":
          (function (module, exports, __webpack_require__) {}),
      "./src/lib/client/hot/dev-server.js":
          (function (module, exports, __webpack_require__) {}),
      "./src/lib/client/index.js":
          (function (module, exports, __webpack_require__) {}),

      0:// 主入口
          (function (module, exports, __webpack_require__) {
              eval(`
                  __webpack_require__("./src/lib/client/index.js");
                  __webpack_require__("./src/lib/client/hot/dev-server.js");
                  module.exports = __webpack_require__("./src/index.js");
              `);
          })
  }
);

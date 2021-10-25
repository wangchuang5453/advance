// 重新第一遍
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');
const path = require('path');
/**
 * 获取单个文件的依赖文件
 */

let ID = 0;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');

  const ast = babylon.parse(content, {
    sourceType: 'module',
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  })

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['env'],
  });

  const id = ID++;

  return {
    id,
    fileName,
    dependencies,
    code,
  }
}

function graph(entry) {
  const entryAsset = createAsset(entry);
  const allAsset = [entryAsset];
  for (const asset of allAsset) {
    asset.mapping = {};
    const dirname = path.dirname(asset.fileName);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      const childAsset = createAsset(absolutePath);
      asset.mapping[relativePath] = childAsset.id;
      allAsset.push(childAsset);
    });
  }
  return allAsset;
}

function bundle(graph) {
  let modules = '';
  graph.forEach((module) => {
    modules += `${module.id}: [
      function(require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],
    `;
  });
  const result = `
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
    })({${modules}})
  `;

  return result;
}

const gh = graph('./src/index.js');
const res = bundle(gh);
console.log(res);

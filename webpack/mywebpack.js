const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');

let ID = 0;

function createAsset(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');

  const ast = babylon.parse(content, {
    sourceType: 'module'
  });

  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  const id = ID++;

  const {code} = babel.transformFromAst(ast, null, {
    presets: ['env']
  });

  return {
    id,
    fileName,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  const entryAsset = createAsset(entry);
  const allAsset = [entryAsset];

  for (const asset of allAsset) {
    const dirname = path.dirname(asset.fileName);

    asset.mapping = {};

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
    modules += `${module.id}:[
      function(require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],
    `;
  });

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }

        const module = {exports: {}};

        fn(localRequire, module, module.exports);

        return module.exports;
      }
      require(0);
    })({${modules}})
  `;

  return result;
}

const graph = createGraph('./src/index.js');
const result = bundle(graph);
console.log(result);
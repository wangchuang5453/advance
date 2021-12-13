/**
 * 我们经常会打印一些日志来辅助调试，但是有的时候会不知道日志是在哪个地方打印的。
 * 希望通过 babel 能够自动在 console.log 等 api 中插入文件名和行列号的参数，方便定位到代码。
 */

const parser = require("@babel/parser");
// @babel/parser 等包都是通过 es module 导出的，所以通过 commonjs 的方式引入有的时候要取 default 属性
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous', 
  plugins: ['jsx'],
});

const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);

traverse(ast, {
  CallExpression(path, state) {
    /**
     * 判断较为复杂
     */
    // if (types.isMemberExpression(path.node.callee)
    //     && path.node.callee.object.name === 'console'
    //     && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
    //   ) {
    //   const { line, column } = path.node.loc.start;
    //   path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
    // }
    /**
     * 使用generate函数判断
     */
    // const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);
    // if (targetCalleeName.includes(generate(path.node.callee).code)) {
    //   const { line, column } = path.node.loc.start;
    //   path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`));
    // }
    /**
     * 还可以调用 path.get('callee').toString()，一样的效果。
     */

    /**
     * 需求变更：改为在 console.xx 节点之前打印的方式
     */
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;
      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  }
});

const { code, map } = generate(ast);
console.log(code);
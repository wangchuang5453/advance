const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const DOUBLE_BYTE_REGEX = /[^\x00-\xff]/g;
const CHINESE_REGEX = /.*[\u4e00-\u9fa5]+.*$/g;
const INTL_FORMAT_IGNORE = '@intl_format_ignore';


// const code = fs.readFileSync(path.resolve(__dirname, '../assets/react.ts')).toString();
const code = fs.readFileSync(path.resolve(__dirname, '../assets/react.tsx')).toString();

const ast = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TSX)

const lines = ast.getFullText().split('\n');

const matches = [];

const hasChinese = (text) => {
  if (CHINESE_REGEX.test(text) && DOUBLE_BYTE_REGEX.test(text)) {
    return true;
  }
  return false;
}

function isIgnoreText(text) {
  if (text.indexOf(INTL_FORMAT_IGNORE) > -1) {
      return true;
  }
  return false;
}

function removeFileComment(code, fileName) {
  const printer = ts.createPrinter({ removeComments: true });
  const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  return printer.printFile(sourceFile);
}

const check = (text, start, end, node) => {
  if (hasChinese(text)) {
    const lineAndCharacter = ast.getLineAndCharacterOfPosition(start); // 返回行列信息 line: number character: number
    const lineText = lines[lineAndCharacter.line]
    
    // 检查是否已经用intl格式化
    const isFormatMessage =
        node.parent
        && node.parent.parent
        && node.parent.parent.parent
        && node.parent.parent.parent.expression
        && node.parent.parent.parent.expression.name
        && node.parent.parent.parent.expression.name.escapedText === 'formatMessage';
    
    const isDefineMessages =
        node.parent
        && node.parent.parent
        && node.parent.parent.parent
        && node.parent.parent.parent.parent
        && node.parent.parent.parent.parent.parent
        && node.parent.parent.parent.parent.parent.expression
        && node.parent.parent.parent.parent.parent.expression.text === 'defineMessages';
    
    const isConsoleLog =
        node.parent
        && node.parent.expression
        && node.parent.expression.expression
        && node.parent.expression.expression.text === 'console';
    
      
    if (!isFormatMessage && !isDefineMessages && !isConsoleLog && !isIgnoreText(lineText)) {
      if (lineText.indexOf('console.log') > -1) {
          console.log('node.parent.expression.name.escapedText:' + node.parent.expression.name.text);
          console.log('node.parent.expression.expression.text:' + node.parent.expression.expression.text);

          return
      }
      
      matches.push({
        text,
        line: lineText,
        position: lineAndCharacter,
      });
    }
  }
}

const visit = (node) => {
  switch (node.kind) {
      case ts.SyntaxKind.StringLiteral: {
        const { text } = node;
        const start = node.getStart();
        const end = node.getEnd();
        check(text, start, end, node);
        break;
      }
      case ts.SyntaxKind.JsxElement: {
        const { children } = node;
        children.forEach(child => {
          if (child.kind === ts.SyntaxKind.JsxText) {
            const text = child.getText();
            /** 修复注释含有中文的情况，Angular 文件错误的 Ast 情况 */
            const noCommentText = removeFileComment(text, 'react.jsx');// filename
            if (noCommentText.match(DOUBLE_BYTE_REGEX)) {
              const start = child.getStart();
              const end = child.getEnd();
              check(noCommentText.trim(), start, end, node);
            }
          }
        });
        break;
      }
      case ts.SyntaxKind.TemplateExpression: { // `${a}哈哈` 模板表达式
        const { pos, end } = node;
        let templateContent = code.slice(pos, end); // `${a}啦啦啦`
        templateContent = templateContent.toString().replace(/\$\{[^\}]+\}/, ''); // `啦啦啦`
        if (templateContent.match(DOUBLE_BYTE_REGEX)) {
            const start = node.getStart();
            const end = node.getEnd();
            check(code.slice(start + 1, end - 1), start, end, node);
        }
        break;
      }
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral: {// `哈哈啊吼吼吼`
        const { pos, end } = node;
        let templateContent = code.slice(pos, end);
        if (templateContent.match(DOUBLE_BYTE_REGEX)) {
          const start = node.getStart();
          const end = node.getEnd();
          check(code.slice(start + 1, end - 1), start, end, node);
        }
        break;
      }
  }
  ts.forEachChild(node, visit);
}

ts.forEachChild(ast, visit);

console.log(matches);
// path ../assets/react.ts
// console.warn('\x1B[33m', `未国际化：${chinese.text} (${file.path}:${chinese.position.line + 1}:${chinese.position.character + 2})`);


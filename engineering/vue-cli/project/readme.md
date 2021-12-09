### 

```js
#!/usr/bin/env node 
```
这段话的意思是让使用 node 进行脚本的解释程序，那下面的就可以使用 node 的语法了

### 暴露出命令
package.json => "bin": "bin/index.js" => npm link 暴露到全局 => demo下 npm link project => npm run build 执行project命令

npm unlink project 全局卸载掉

npm ls --global project

➜  project npm ls --global project
/Users/ubtech/.nvm/versions/node/v14.16.0/lib
└── project@1.0.0  -> /Users/ubtech/Documents/ex/vue-cli/project

删除干净


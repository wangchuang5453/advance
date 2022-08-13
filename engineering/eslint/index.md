https://juejin.cn/post/7007617841817976869  基础解析
=>
https://juejin.cn/post/7043702363156119565  实战配置

https://eslint.org/docs/latest/user-guide/getting-started 官网

ESLint是一个十分优秀的JavaScript代码检查工具，我们可以用ESLint来检查TypeScript和JavaScript代码。

# ESLint和TSLint
在2019年，TSLint的团队决定不再继续维护，推荐使用ESLint来替代。主要不维护的原因就是TSLint和ESLint功能一致，有这大量重复的代码。所以不搞了。
以后TypeScript的项目我们去使用ESLint就好了。

# 集成eslint

yarn add eslint  -D

初始化eslint:
npx eslint --init  You can also run this command directly using 'npm init @eslint/config'.

# 解决遇到的问题

https://segmentfault.com/q/1010000040801494
vite 配置别名使用报错

https://blog.csdn.net/weixin_43985637/article/details/124354417
【vscode插件】ESLint报错 ‘plugins‘ doesn‘t add plugins to configuration to load.


loader和plugin的区别
tapable
webpack hmr原理
webpack 编译流程
webpack 优化
tree shaking

# webpack优化解决项目体积大、打包时间长、刷新时间长问题
1、提升基础环境版本
脚手架版本 webpack版本

2、使用include exclude配置避免重复打包
引入的一些插件，类库，代码，如果是被打包过了，比如开发tooltip组件使用的popper.js，
或者
```js
import $ from 'jquery'
```

```js
{ 
  test: /\.js$/, 
  //使用include来指定编译文件夹
  include: path.resolve(__dirname, '../src'),
  //使用exclude排除指定文件夹
  exclude: /node_modules/
  use: [{
    loader: 'babel-loader'
  }]
}

```
当然还能使用noParse指定文件，避免重复打包

3、合理利用缓存来减少打包时间

babel-loader来举例

```js
{ 
  test: /\.js$/,
  use: [{
      //如果文件没被改动则使用缓存
    loader: 'babel-loader?chaheDirectory'
  }]
}
```
cache-loader，也能开启缓存，用法非常简单，在开销较大的loader前使用即可

```js
{
  test: /\.js$/,
  use: [
    'cache-loader',
    'babel-loader'
  ],
  include: path.resolve('src')
}
```


待续
https://juejin.cn/post/6844904174937718792
webpack优化解决项目体积大、打包时间长、刷新时间长问题！

https://juejin.cn/post/6844904093463347208
带你深度解锁Webpack系列(优化篇)









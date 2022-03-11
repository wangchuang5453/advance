const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/css-loader.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        // test: /\.less$/i,
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader', 'postcss-loader'], // 从后往前
        use: [
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader'
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         // [
          //         //   'autoprefixer',
          //         //   {
          //         //     // 选项
          //         //   },
          //         // ],
          //         [
          //           'postcss-preset-env',// postcss-preset-env 包含 autoprefixer，因此如果你已经使用了 preset 就无需单独添加它了
          //           // PostCSS Preset Env 可以将现代 CSS 转换为大多数浏览器可以理解的内容，并根据目标浏览器或运行时环境确定所需的 polyfill
          //           {
          //             // 选项
          //           },
          //         ],
          //       ],
          //     }
          //   }
          // },
          // {
          //   loader: 'less-loader'
          // }
        ],
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { library } = require('webpack');

module.exports = {
  mode: 'development', // 设置模式为开发
  entry: './src/main.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
    // library: 'MyApp', // 定义全局对象名称
    // libraryTarget: 'umd', // 以变量形式导出 

  },
  module: {
    rules: [
      {
        test: /\.vue$/i, // 处理 .vue 文件
        loader: 'vue-loader',
      },
      {
        test: /\.js$/i, // 处理 .js 文件
        exclude: /node_modules/, // 排除 node_modules
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i, // 处理 .css 文件
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // 自定义文件名
              // outputPath: 'images/', // 输出路径
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 添加 VueLoaderPlugin
    new HtmlWebpackPlugin({
      template: './index.html', // 使用的 HTML 模板
      //   scriptLoading: 'defer', // 设置脚本加载方式为 defer
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 输出的 CSS 文件名
    }),
  ],


};

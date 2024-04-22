const path = require('path');
const { VueLoaderPlugin } = require("vue-loader"); // 引入 vue-loader，vue-loader 会自带一个 VueLoaderPlugin 

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../main'),
  },
  output: {
    filename: '[name]-[hash].js', // 加入哈希值作文件名称
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 只有js文件会走这个规则
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      },
      // 对于 .vue 文件使用 vue-loader 进行处理
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  resolve: { // 声明自动解析 `.ts` 后缀文件，这意味着代码如 `import "./a.ts"` 可以忽略后缀声明，简化为 `import "./a"` 文件
    extensions: ['.ts', '.js', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(), // 使用VueLoaderPlugin
  ]
}
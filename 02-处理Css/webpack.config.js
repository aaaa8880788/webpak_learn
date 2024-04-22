const path = require('path');
const EslintPlugin = require('eslint-webpack-plugin'); // 引入esling-webpack-plugin 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入mini-css-extract-plugin
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin


// 配置node的环境变量
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development', // 不生效，不知道为毛,所以上面配置node的环境变量
  entry: {
    index: './src/index.js',
    // test: './src/index.ts',
  },
  output: {
    filename: '[name]-[hash].js', // 加入哈希值作文件名称
    path: path.resolve(__dirname, 'dist'),
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
      {
        test: /\.css$/,
        use: [
          (process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader), // 根据运行环境判断使用哪个loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
            }
          },
          // 这里因为 postcss.config.js 文件已经配置好,可以简写
          'postcss-loader', // 可以不加配置属性，简写了
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 主要是用来处理@import引入的css，如果不加这个，@import引入的css不会被postcss-loader处理
            }
          },
          // postcss.config.js 没有的话,不能简写
          {
            loader: 'postcss-loader', // 和预处理器是兼容的，但是需要预处理器处理完了之后再给它处理哟，不要弄错顺序了
            options: {
              postcssOptions: {
                // 添加 autoprefixer 插件
                plugins: [require("autoprefixer")],
              },
            }
          },
          'less-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 可以不加配置属性，简写了
          'sass-loader',
        ]
      }
    ]
  },
  resolve: { // 声明自动解析 `.ts` 后缀文件，这意味着代码如 `import "./a.ts"` 可以忽略后缀声明，简化为 `import "./a"` 文件
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // 注册 eslint 插件
    new EslintPlugin({
      extensions: ['.ts', '.js']
    }),
    new MiniCssExtractPlugin(), // 使用MiniCssExtractPlugin
    new HTMLWebpackPlugin({
      filename:'index.html', // 生成的文件名，其实默认就是index.html
      template:'./public/index.html' // 引用的模板文件地址
    }) // 使用HTMLWebpackPlugin
  ]
}
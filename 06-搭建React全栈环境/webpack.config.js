const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin

module.exports = {
	mode: "development",
	entry: {
		index: "./index.tsx",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
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
				test: /.jsx$/,
				use: [
					// 这里可以直接'babel-loader'的原因：
					// .babelrc里面已经申明了presets，如果没有则需要用下面的写法
					'babel-loader',
					// {
					// 	loader: 'babel-loader',
					// 	options: {
					// 		presets: [
					// 			'@babel/preset-env',
					// 			'@babel/preset-react'
					// 		],
					// 	},
					// },
				],
			},
			{
				test: /.tsx$/,
				use: [
					// 这里可以直接'babel-loader'的原因：
					// .babelrc里面已经申明了presets，如果没有则需要用下面的写法
					'babel-loader',
					// {
					// 	loader: 'babel-loader',
					// 	options: {
					// 		presets: [
					// 			'@babel/preset-env',
					// 			'@babel/preset-react'
					// 		],
					// 	},
					// },
				],
			},
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
		],
	},
  devServer: {
		host:"localhost",
		static: {
      directory: path.join(__dirname, "public"),
    },
		port:3000,
    hot: true, // 是否热更新
    open: false // 是否自动打开浏览器
  },
	resolve: {
		extensions: [".js", ".jsx", ".tsx"], // 这个可以让webpack默认入口的文件类型（.js/.json/.wasm）新增额外类型
		alias: {
      "@": path.resolve(__dirname, "./src"),
    },
	},
	performance: {
		maxEntrypointSize: 50000000,
		maxAssetSize: 30000000,
	},
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, './public/index.html') // 引用的模板文件地址
    }) // 使用HTMLWebpackPlugin
  ]
};

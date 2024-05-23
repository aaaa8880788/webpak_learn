const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: false,
	entry: path.resolve(__dirname, "./main"),
	output: {
		path: path.resolve(__dirname, "./dist"),
	},
	module: {
		rules: [
			{
        test: /\.js$/, // 只有js文件会走这个规则
        exclude: /node_modules/,
        use: ['babel-loader']
      },
			{
				test: /.jsx$/,
				use: ['babel-loader',],
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
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
					'postcss-loader',
					'sass-loader',
				]
			}
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, './public/index.html') // 引用的模板文件地址
    }) // 使用HTMLWebpackPlugin
	],
	// 应用资源提供方必须以 http(s) 形式提供服务
	// 所以这里需要使用 devServer 提供 http(s) server 能力
	devServer: {
		port: 8081,
		hot: true,
	},
};

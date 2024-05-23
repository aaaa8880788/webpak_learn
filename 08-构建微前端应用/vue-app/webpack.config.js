const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, "./main"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: `http://localhost:8082/dist/`,
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
				test: /\.vue$/,
				use: {
					loader: "vue-loader",
				},
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
		extensions: [".js", ".vue"],
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new ModuleFederationPlugin({
			// 应用名称
			name: "vueApp",
			// 模块入口，可以理解为该应用的资源清单
			filename: `remoteEntry.js`,
			// 定义应用导出哪些模块
			exposes: {
				"./app": "./main",
			},
		}),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, './public/index.html') // 引用的模板文件地址
    })
	],
	devServer: {
		port: 8082,
		hot: true,
	},
};

const Merge = require("webpack-merge");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const base = require("./webpack.base");

// 继承自 `webpack.base.js`
module.exports = Merge.merge(base, {
	mode: "development",
	entry: {
		// 入口指向 `entry-client.js` 文件
		client: path.join(__dirname, "/entry-client.js"),
	},
	output: {
		publicPath: "/",
	},
	module: {
		rules: [{ test: /.css$/, use: ["style-loader", "css-loader"] }],
	},
	plugins: [
		// 这里使用 webpack-manifest-plugin 记录产物分布情况
		// 方面后续在 `server.js` 中使用
		new WebpackManifestPlugin({ fileName: "manifest-client.json" }),
    new HTMLWebpackPlugin({
      filename: 'index.html', // 生成的文件名，其实默认就是index.html
      template: path.resolve(__dirname, './public/index.html') // 引用的模板文件地址
    }) // 使用HTMLWebpackPlugin
	],
});

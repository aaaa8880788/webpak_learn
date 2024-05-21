const Merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const base = require("./webpack.base");

// 继承自 `webpack.base.js`
module.exports = Merge.merge(base, {
	entry: {
		// 入口指向 `entry-client.js` 文件
		client: path.join(__dirname, "../src/entry-client.tsx"),
	},
	output: {
		filename: "client.js",
		publicPath: path.join(__dirname, "../dist"),
	},
	module: {
		rules: [{ test: /.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }],
	},
	plugins: [
		// 这里使用 webpack-manifest-plugin 记录产物分布情况
		// 方面后续在 `server.js` 中使用
		new WebpackManifestPlugin({ fileName: "manifest-client.json" }),
		// 生成CSS文件
		new MiniCssExtractPlugin({
			filename: "client.[contenthash].css",
		}),
		// 自动生成 HTML 文件内容
		new HtmlWebpackPlugin({
      fileName: "client.html",
			templateContent: path.join(__dirname, "./public/index.html"),
		}),
	],
});

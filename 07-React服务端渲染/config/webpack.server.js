const Merge = require("webpack-merge");
const path = require("path");
const base = require("./webpack.base");

module.exports = Merge.merge(base, {
	entry: {
		server: path.join(__dirname, "../src/entry-server.tsx"),
	},
	target: "node",
	output: {
		// 打包后的结果会在 node 环境使用
		// 因此此处将模块化语句转译为 commonjs 形式
		libraryTarget: "commonjs2",
		filename: "server.js",
    publicPath: path.join(__dirname, "../dist"),
	},
	module: {
		rules: [
			{
				test: /.css$/,
				loader: path.join(__dirname, "../loader/removeCssLoader"),
			},
		],
	},
});

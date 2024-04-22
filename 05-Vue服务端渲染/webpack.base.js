const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /.vue$/,
				use: {
					loader: "vue-loader",
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [new VueLoaderPlugin()],
};

const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base.config");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(baseConfig, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin(), // 压缩js代码，例如注释删除 、const -> let 、空格删除等
			new CssMinimizerWebpackPlugin(), // 压缩css代码，例如注释删除等
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
					"less-loader",
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
					"sass-loader"
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
      filename:'index.css',
    }),
		new HtmlWebpackPlugin({
			filename: "index.html", // 生成的文件名，其实默认就是index.html
			template: "./public/index.html", // 引用的模板文件地址
		}),
	],
});

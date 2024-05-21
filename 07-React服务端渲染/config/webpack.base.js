module.exports = {
	mode: "production",
	module: {
		rules: [
			{
				test: /.tsx$/,
				use: [
					"babel-loader"
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx"],
	},
};

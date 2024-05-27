const path = require('path');
const EslintPlugin = require('eslint-webpack-plugin'); // 引入esling-webpack-plugin 插件

module.exports = {
  entry: {
    index: './src/index.js',
    // test: './src/index.ts',
  },
  output: {
    filename: '[name]-[hash].js', // 加入哈希值作文件名称
    path: path.resolve(__dirname, '../dist'),
  },
  cache: {
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, "../.cache/webpack"), // 缓存文件生成的地址
		buildDependencies: { // 那些文件发现改变就让缓存失效，一般为 webpack 的配置文件
			config: [
				path.resolve(__dirname, "./base.config.js"),
				path.resolve(__dirname, "./webpack.dev.config.js"),
				path.resolve(__dirname, "./webpack.prod.config.js")
			]
		},
		managedPaths: [path.resolve(__dirname, "./node_modules"), path.resolve(__dirname, "./libs")], // 受控目录，指的就是那些目录文件会生成缓存
		profile: true, // 是否输出缓存处理过程的详细日志，默认为 false
		maxAge: 1000 * 60 * 60 * 24, // 缓存失效时间，默认值为 5184000000
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
  ]
}
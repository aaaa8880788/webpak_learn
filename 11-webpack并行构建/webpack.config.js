const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpritesmithPlugin = require('webpack-spritesmith');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: "development",
	devtool: false,
	entry: path.resolve(__dirname, "./main"),
	output: {
		path: path.resolve(__dirname, "./dist"),
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
				parallel: 2, // 这里的默认值为 true，数据类型： Boolean|Number
		})]
	},
	module: {
		rules: [
			{
        test: /\.js$/, // 只有js文件会走这个规则
        exclude: /node_modules/,
        // use: ['thread-loader', 'babel-loader'], // 直接将 thread-loader 加到最前面就可以了，在它后面的 loader 就会在一个单独的线程池中运行
				use: ['babel-loader',],
      },
			{
				test: /.jsx$/,
				// use: ['thread-loader', 'babel-loader',], // 直接将 thread-loader 加到最前面就可以了，在它后面的 loader 就会在一个单独的线程池中运行
				use: ['babel-loader',],
			},
      {
        test: /\.css$/,
				exclude: /node_modules/,
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
				exclude: /node_modules/,
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
			},
			// webpack4的写法-------start
			// {
			// 	test: /.(png|jpg|bmp)$/,
			// 	use: [
			// 		// url-loader 内置了 file-loader，所以使用url-loader 就不需要使用 file-loader 了
			// 		// {
			// 		//     loader: "file-loader" // 将图像引用转换为 url 语句并生成相应图片文件。
			// 		// },
			// 		{
			// 			loader: "url-loader", // 有两种表现，对于小于阈值 limit 的图像直接转化为 base64 编码；大于阈值的图像则调用 file-loader 进行加载。
			// 			options: {
			// 				limit: 1024 // 对于小于1kb的图像文件进行base64处理
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	test: /.svg$/,
			// 	use: 'raw-loader' // 不做任何转译，只是简单将文件内容复制到产物中，适用于 SVG 场景。
			// }
			// webpack4的写法-------end
			// type = "asset/resource" 对标到 file-loader
			{
				test: /\.(png|PNG|jpg|JPG|bmp|BMP|GIF|gif)$/,
				type: "asset", // 对标到 url-loader
				exclude: /node_modules/,
				parser: {
					dataUrlCondition: {
						maxSize: 1024
					}
				},
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							// mozjpeg：用于压缩 JPG(JPEG) 图片；
							mozjpeg: {
								quality: 80
							},
							// optipng：用于压缩 PNG 图片；
							// pngquant：同样用于压缩 PNG 图片；
							// svgo：用于压缩 SVG 图片；
							// gifsicle：用于压缩 Gif 图；
							gifsicle: {
								optimizationLevel: 2
							},
							// webp：用于将 JPG/PNG 图压缩并转化为 WebP 图片格式。
						}
					}
				]
			}, 
			{
				test: /\.(svg|SVG)$/,
				exclude: /node_modules/,
				type: "asset/resource" // 对标到 file-loader
				// type: "asset/source" // 对标到 raw-loader
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
    }), // 使用HTMLWebpackPlugin
		// 图像优化：雪碧图 -------- start
		// new SpritesmithPlugin({
		// 	// 将根目录下的 asset 目录下的所有 .png文件合并成一个雪碧图
		// 	src: {
		// 		cwd: path.resolve(__dirname, './image'), 
		// 		glob: '*.png'
		// 	},
		// 	// 生成目标文件存在的路径
		// 	target: {
		// 		image: path.resolve(__dirname, './src/assets/sprite.png'),
		// 		css: path.resolve(__dirname, './src/assets/sprite.scss')
		// 	}
		// })
		// 图像优化：雪碧图 -------- end
	],
	// 应用资源提供方必须以 http(s) 形式提供服务
	// 所以这里需要使用 devServer 提供 http(s) server 能力
	devServer: {
		port: 8081,
		hot: true,
	},
};

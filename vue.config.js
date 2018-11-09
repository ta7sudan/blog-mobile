const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
module.exports = {
	baseUrl: process.env.PUBLIC_PATH,
	css: {
		sourceMap: true
	},
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		}
	},
	chainWebpack(config) {
		// 你可以给我打包慢一点, 但是你要给我把tree shaking搞出来...
		// main和browser不能省, 开发时HMR也会向打包文件中注入脚本, 并且
		// 它们是没有module字段的
		config.resolve.mainFields
			.clear()
			.add('module')
			.add('jsnext:main')
			.add('browser')
			.add('main')
			.end();
		// .alias
		// .set('@asset', path.resolve(__dirname, './src/assets'));
		const imgLoader = config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.options({
				limit: 10240,
				fallback: {
					loader: 'file-loader',
					options: {
						name: 'img/[name].[hash:8].[ext]'
					}
				}
			})
			.end();
		config.module
			.rule('media')
			.use('url-loader')
			.loader('url-loader')
			.options({
				limit: 10240,
				fallback: {
					loader: 'file-loader',
					options: {
						name: 'media/[name].[hash:8].[ext]'
					}
				}
			});
		const svgLoader = config.module
			.rule('svg')
			.use('file-loader')
			.loader('svg-url-loader')
			.options({
				noquotes: true,
				limit: 10240,
				stripdeclarations: true,
				name: 'img/[name].[hash:8].[ext]'
				// iesafe: true,
			})
			.end();
		config.plugin('define').tap(args => [
			{
				...args[0],
				DEBUG: JSON.stringify(process.env.NODE_ENV === 'development')
			}
		]);
		if (process.env.NODE_ENV === 'production') {
			imgLoader
				.use('image-webpack-loader')
				.loader('image-webpack-loader')
				.options({
					// 这里只为开启webp, 注意它不负责把其他jpg, png转成webp,
					// 它只负责把压缩率不到75的webp压到75,
					// 如果需要将其他格式转webp, 请关掉默认的其他格式压缩器,
					// 其他压缩器选项有点多, 有空再慢慢调
					webp: {
						quality: 75
					}
				});
			svgLoader
				.use('image-webpack-loader')
				.loader('image-webpack-loader');
			config.plugin('deepscope').use(WebpackDeepScopeAnalysisPlugin);
			// 其实后面这两条默认是开着的, 实测也有做tree shaking和scope hoisting,
			// 不过为了提醒自己记得这几个选项还是手动开下
			config.optimization.concatenateModules(true);
			config.optimization.usedExports(true);
			config.optimization.splitChunks({
				cacheGroups: {
					vendors: {
						name: 'chunk-vendors',
						test: /[\\\/]node_modules[\\\/]/,
						priority: -10,
						chunks: 'initial'
					},
					common: {
						name: 'chunk-common',
						minChunks: 2,
						priority: -20,
						chunks: 'initial',
						reuseExistingChunk: true
					},
					asyncmodule: {
						name: 'chunk-async',
						minChunks: 2,
						minSize: 10000,
						priority: -30,
						chunks: 'async',
						reuseExistingChunk: true
					}
				}
			});
		}
	}
};

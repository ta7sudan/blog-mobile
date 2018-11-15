const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const { compressCSS, compressHTML, compressJS } = require('./compress');

module.exports = {
	baseUrl: process.env.CDN || '/',
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
				DEBUG: JSON.stringify(process.env.NODE_ENV === 'development'),
				TITLE: JSON.stringify(process.env.TITLE),
				DOMAIN: JSON.stringify(process.env.DOMAIN || '/'),
				THEME_COLOR: JSON.stringify(process.env.THEME_COLOR),
				AUTHOR: JSON.stringify(process.env.AUTHOR),
				DESC: JSON.stringify(process.env.DESC),
				KEYWORDS: JSON.stringify(process.env.KEYWORDS),
				APP_NAME: JSON.stringify(process.env.APP_NAME)
			}
		]);
		// 这里有点恶心, 不走loader的css和js处理起来总是不太方便,
		// 但是那几个内联插件感觉并不好用, 还有一点点小bug,
		// 对于简单的脚本和样式注入页面这样做也还算可以接受, 复杂的
		// 话考虑抽空撸插件了
		// 关于为什么不用一个script把所有压缩后的脚本拼接在一起?
		// 因为uglifyJS分开压缩的话可能有些变量名会导致冲突, 所以还是分开
		// 并且每个script都有一个IIFE对变量名做隔离
		config.plugin('html').tap(args => [{
			...args[0],
			css: compressCSS('./src/styles/reset.css') + compressCSS('./src/styles/loading.css'),
			html: compressHTML('./src/loading.tpl'),
			errorScript: compressJS('./src/lib/error-collect.js'),
			loadingScript: compressJS('./src/lib/loading.js'),
			dprScript: compressJS('./src/lib/data-dpr.js')
		}]);
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

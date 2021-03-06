// eslint-disable-next-line
'use strict';

const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const PreloadFontPlugin = require('preload-font-plugin');
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
// const HtmlTagAttrPlugin = require('html-tag-attributes-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const { compressCSS, compressHTML, compressJS } = require('./compress');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
	publicPath: process.env.CDN || '/',
	// 这个是给initial的chunk加crossorigin的, 但是不会给async chunk加crossorigin
	crossorigin: 'anonymous',
	css: {
		sourceMap: true
	},
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Vary': 'Origin',
			// 这个JWT总是过期的, 不过没什么关系, 反正就多请求一次而已
			'Set-Cookie': 'JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiaGVsbG8gd29ybGQiLCJpYXQiOjE1NDMwMzM4MTgsImV4cCI6MTU0MzAzNzQxOCwiaXNzIjoidGE3c3VkYW4ifQ.EONQutYD4_SelDNePu60f8JVHA3SFdQ7z8K-k7UA3Po; path=/'
			// 'Cache-Control': 'max-age=3600'
		}
	},
	chainWebpack(config) {
		// 这个是给async chunk加crossorigin的, 但是不会给initial chunk加crossorigin
		config.output.crossOriginLoading('anonymous');
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
		// const imgLoader = 
		config.module
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
		// const svgLoader = 
		config.module
			.rule('svg')
			.use('file-loader')
			.loader('svg-url-loader')
			.options({
				limit: 10240,
				stripdeclarations: true,
				name: 'img/[name].[hash:8].[ext]'
				// iesafe: true,
			})
			.end();

		config.plugin('git-plugin')
			.use(GitRevisionPlugin)
			// 本来这里应该返回之前创建好的实例的,
			// 但是Vue Cli的modern模式会构建两次,
			// 导致第二次复用了第一次的实例, 本来
			// 这也没什么问题, 但是webpack-chain会给
			// 这个实例使用Object.defineProperty把
			// configurable设置为false, 导致第二次构建
			// 时候使用Object.defineProperty报错,
			// 所以就不能够复用同一个实例, 但是这东
			// 西不复用实例讲道理是会有问题, 不过实际上
			// 这里不复用实例其实也没什么问题...那就这样吧
			// .init(() => gitRevisionPlugin)
			.before('vue-loader');
		config.plugin('define').tap(args => {
			const env = {
				...args[0]['process.env'],
				RELEASE_VERSION: JSON.stringify(gitRevisionPlugin.commithash()),
				SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
				DEBUG: JSON.stringify(process.env.NODE_ENV !== 'production'),
				TITLE: JSON.stringify(process.env.TITLE),
				DOMAIN: JSON.stringify(process.env.DOMAIN || '/'),
				THEME_COLOR: JSON.stringify(process.env.THEME_COLOR),
				AUTHOR: JSON.stringify(process.env.AUTHOR),
				DESC: JSON.stringify(process.env.DESC),
				KEYWORDS: JSON.stringify(process.env.KEYWORDS),
				APP_NAME: JSON.stringify(process.env.APP_NAME),
				API_HOST: JSON.stringify(process.env.API_HOST),
				API_VERSION: JSON.stringify(process.env.API_VERSION),
				TOKEN_STORAGE_KEY: JSON.stringify(process.env.TOKEN_STORAGE_KEY),
				TOKEN_COOKIE_KEY: JSON.stringify(process.env.TOKEN_COOKIE_KEY),
				ALLOYLEVER_CDN: JSON.stringify(process.env.ALLOYLEVER_CDN)
			};
			args[0]['process.env'] = env;
			return [
				{
					...args[0],
					...env
				}
			];
		});
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
			errorScript: compressJS('./src/lib/error-collect.js')
				.replace(/\w+\.RELEASE/, JSON.stringify(gitRevisionPlugin.commithash()))
				.replace(/\w+\.BACKUP_MONITORURL/, JSON.stringify(process.env.BACKUP_MONITORURL))
				.replace(/\w+\.CHANNEL/, JSON.stringify(process.env.CHANNEL)),
			loadingScript: compressJS('./src/lib/loading.js'),
			dprScript: compressJS('./src/lib/data-dpr.js'),
			alloylever: compressJS('./node_modules/alloylever/alloy-lever.js')
		}]);
		// 搞了半天vue cli有一个crossorigin的配置,
		// 害我还自己写了个, 不过vue cli的配置会给link也加上crossorigin,
		// 感觉没什么必要, 如果哪天不想给link加cors倒是可以考虑自己这个插件了
		// .end();
		// .plugin('crossorigin')
		// .after('html')
		// .use(HtmlTagAttrPlugin, [{
		// 	script: {
		// 		crossorigin: 'anonymous'
		// 	}
		// }]);

		// 暂时还是去掉prefetch, prefetch的页面多了会
		// 后续ajax请求排队自己从代码层面控制是否预加载会更好一些
		config.plugins.delete('prefetch');
		// 这个简直坑爹, vue cli在之后合并的preload插件的配置选项,
		// 于是如果你用tap修改preload插件的配置选项永远是报错,
		// 简单讲, 就是在你tap的时候, vue内部还没有use, 于是gg,
		// 只能一开始覆盖preload插件, 所以我们要用use而不是tap
		// config.plugin('preload').use(PreloadWebpackPlugin, [{
		// 	rel: 'preload',
		// 	include: 'initial',
		// 	fileBlacklist: [
		// 		/\.map$/,
		// 		/hot-update\.js$/
		// 	],
		// 	as(entry) {
		// 		if (/CoveredByYourGrace/.test(entry)) {
		// 			return 'font';
		// 		}
		// 		if (/\.css$/.test(entry)) {
		// 			return 'style';
		// 		}
		// 		if (/\.css$/.test(entry)) {
		// 			return 'style';
		// 		}
		// 		return 'script';
		// 	}
		// }]);
		// 但是现在不需要靠上面那个坑爹东西了, 我自己写了个, 美滋滋.
		// 不过上面的注释保留, 下次踩坑的时候可以记起来
		config.plugin('preloadfont').before('html').use(PreloadFontPlugin, [{
			'./src/assets/fonts/CoveredByYourGrace.ttf': {
				rel: 'preload',
				as: 'font',
				type: 'font/ttf',
				crossorigin: 'anonymous'
			}
		}]);
		if (process.env.NODE_ENV === 'production') {
			config.performance.hints(false);
			// imgLoader
			// 	.use('image-webpack-loader')
			// 	.loader('image-webpack-loader')
			// 	.options({
			// 		// 这里只为开启webp, 注意它不负责把其他jpg, png转成webp,
			// 		// 它只负责把压缩率不到75的webp压到75,
			// 		// 如果需要将其他格式转webp, 请关掉默认的其他格式压缩器,
			// 		// 其他压缩器选项有点多, 有空再慢慢调
			// 		webp: {
			// 			quality: 75
			// 		}
			// 	});
			// svgLoader
			// 	.use('image-webpack-loader')
			// 	.loader('image-webpack-loader');
			config.plugin('deepscope').use(WebpackDeepScopeAnalysisPlugin);
			// 这个坑爹的sentry插件在Windows下建议手动下载它的exe放到它自己的bin目录下
			// 不然谜之卡死
			if (process.env.SENTRY_AUTH_TOKEN) {
				config.plugin('sentry').use(SentryCliPlugin, [{
					include: './dist'
				}]);
			}
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
		// 需要非常细致的调试时用
		// } else {
		// 	config.devtool('eval-source-map');
			// config.devtool('source-map');
		}
	}
};

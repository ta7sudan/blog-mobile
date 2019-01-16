module.exports = {
	plugins: {
		autoprefixer: {},
		// 这东西不能升级到4.0, 否则和postcss-automath冲突导致无法在编译
		// 期进行计算, 只能是有空魔改下
		precss: {},
		'postcss-automath': {},
		'postcss-hexrgba': {},
		'postcss-sprites': {
			filterBy(img) {
				if (img.url.includes('nosprites')) {
					return Promise.reject();
				}
				return Promise.resolve();
			// },
			// TODO
			// groupBy(img) {
			}
		},
		'postcss-functions': {
			functions: {
				// 注意不要指望这里的函数返回一些rule能被后续的插件处理,
				// 这里返回的字符串是不会被重新生成AST的结点的
				even(val) {
					val = parseFloat(val);
					// 减小误差
					return `${Math.floor(val) % 2 ? Math.floor(val) + 1 : Math.floor(val)}px`;
				}
			}
		},
		// 这个放最后, 不然可能functions里有px而不会被转换,
		// 或是sprites有px也不会被转换
		'postcss-convertpx': {}
	}
};

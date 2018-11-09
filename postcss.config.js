module.exports = {
	plugins: {
		autoprefixer: {},
		// mixins要放precss前面
		'postcss-mixins': {
			mixins: {}
		},
		precss: {},
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
				test(val) {
					return val + 'px';
				}
			}
		},
		// 这个放最后, 不然可能functions里有px而不会被转换,
		// 或是sprites有px也不会被转换
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 750,
			unitPrecision: 3,
			viewportUnit: 'vw',
			fontViewportUnit: 'px',
			minPixelValue: 1,
			mediaQuery: false
		}
	}
};

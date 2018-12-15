/* global mainLoading */
import Vue from 'vue';
import Router from 'vue-router';
import loadSentry from './lib/load-sentry';
import { loadAllArr, scrollY, p } from './lib/util';
import errorRoutes from './routes/_error';

Vue.use(Router);

// 匹配不以_开头的文件, 坑爹的地方在于webpack找的路径不仅仅包含文件名,
// 还包含./, eg. ./_error.js和_error.js都需要被去掉, 因为context实际上
// 发生在编译时, 所以这里的正则是给Node用的, 所以用新特性也无所谓,
// 反正不会被编译进去, 于是我们把_error.js单独提出来放数组最后面, 以免
// 404路由的*被先匹配到, 导致所有路由都是404页面, 不过其实Vue Router内部已经
// 把*放到最后面了
const routes = loadAllArr(require.context('./routes', true, /((?<=\/)[^_]|^[^_])(\w|-)*\.js$/)).concat(errorRoutes);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		// 在menu退出的时候不要重复scroll, menu-bar里面会做一次复位
		// 和fixed方案配合
		// if (from.name && from.name.includes('-menu')) {
		// 	return null;
		// } else {
		// 	return savedPosition || {
		// 		x: 0,
		// 		y: 0
		// 	};
		// }
		// 和overflow方案配合
		if (p(to).name('').includes('-menu')) {
			return {
				x: 0,
				y: scrollY()
			};
		} else {
			return savedPosition || {
				x: 0,
				y: 0
			};
		}
	}
});

// 发现有个onReady会在第一次页面加载时回调,
// 就不需要从init里面搞了
router.onReady(() => {
	loadSentry();
	mainLoading.stop();
});

export default router;
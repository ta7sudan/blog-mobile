/* global mainLoading */
import Vue from 'vue';
import Router from 'vue-router';
import loadSentry from './lib/load-sentry';
import { loadAllArr } from './lib/util';
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
		if (from.name && from.name.includes('-menu')) {
			return null;
		} else {
			return savedPosition || {
				x: 0,
				y: 0
			};
		}
	}
});

router.afterEach(() => {
	// 其实我希望这两个函数主逻辑只会执行一次, 之后
	// 都是只有一次if判断, 不过每次route改变都会触发
	// 执行一次, 即便开销不大但多多少少还是有些令人
	// 不爽...其实需求是首屏加载的时候执行一下这两个
	// 就好, 从这一点看, 只有去hook router的私有api
	// init()最理想, 不过私有api这种东西用多了会上瘾...
	// 还是算了
	loadSentry();
	mainLoading.stop();
});

export default router;
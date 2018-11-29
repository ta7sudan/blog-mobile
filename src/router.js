import Vue from 'vue';
import Router from 'vue-router';
import { loadAllArr } from './lib/util';
import errorRoutes from './routes/_error';

Vue.use(Router);

// 匹配不以_开头的文件, 坑爹的地方在于webpack找的路径不仅仅包含文件名,
// 还包含./, eg. ./_error.js和_error.js都需要被去掉, 因为context实际上
// 发生在编译时, 所以这里的正则是给Node用的, 所以用新特性也无所谓,
// 反正不会被编译进去, 于是我们把_error.js单独提出来放数组最后面, 以免
// 404路由的*被先匹配到, 导致所有路由都是404页面
const routes = loadAllArr(require.context('./routes', true, /((?<=\/)[^_]|^[^_])(\w|-)*\.js$/)).concat(errorRoutes);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || {
			x: 0,
			y: 0
		};
	}
});

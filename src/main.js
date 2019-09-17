import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from './lib/http';
import guard from './lib/guard';
import { releaseAllLocks } from './lib/lock';
import NProgress from 'accessible-nprogress';
import './registerServiceWorker';
import 'accessible-nprogress/dist/accessible-nprogress.css';
import './lib/mixins';
import { report } from './lib/util';

guard();
// 暴露给全局
window.NProgress = NProgress;
// ref error-collect.js, 异常处理的时候如果捕获到一个异常则释放掉所有锁
// 逻辑上讲还是有点不合理, 最好能做到捕获到一个异常, 就释放掉触发异常操作对应的锁
window.releaseAllLocks = releaseAllLocks;

// for fucking iOS
document.body.addEventListener('touchstart', () => {}, false);

if (process.env.DEBUG) {
	Vue.config.performance = true;
	window.router = router;
}

const lastHandler = Vue.config.errorHandler;
Vue.config.errorHandler = (err, vm, info) => {
	console.error(err && err.message);
	console.error(err && err.stack);
	if (!window.Sentry) {
		report(err);
	}
	window.releaseAllLocks();
	window.NProgress.done();
	if (typeof lastHandler === 'function') {
		lastHandler(err, vm, info);
	}
};
Vue.config.productionTip = false;

new Vue({
	router,
	apis,
	store,
	render: h => h(App)
}).$mount('#app');

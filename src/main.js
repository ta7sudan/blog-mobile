import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from './lib/apis';
import guard from './lib/guard';

guard();

if (DEBUG) {
	Vue.config.performance = true;
}

Vue.config.productionTip = false;
// 理论上讲, apis可以做成插件, 对于在Vue中的使用来说更为合理一些
// 不过考虑到发送请求这一需求不仅仅是在Vue的生命周期中存在,
// 在其他地方也会有, 所以还是将apis暴露在外面比较好,
// 也许之后想到什么更为优雅的方案再改吧
Vue.prototype.$apis = apis;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from './lib/apis';
import guard from './lib/guard';

guard();

Vue.config.productionTip = false;
Vue.prototype.$apis = apis;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

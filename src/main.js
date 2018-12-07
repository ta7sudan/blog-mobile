import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from './lib/apis';
import guard from './lib/guard';

guard();

if (DEBUG) {
	Vue.config.performance = true;
	window.router = router;
}

Vue.config.productionTip = false;

new Vue({
	router,
	apis,
	store,
	render: h => h(App)
}).$mount('#app');

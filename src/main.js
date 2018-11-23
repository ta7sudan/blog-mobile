import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import secan from 'secan';
import apis from './lib/apis';

// secan({
// 	// debuggerLoop: true
// 	pageDomain: 'localhost'
// });

// window.addEventListener('devtoolsopen', () => {
// 	console.log('devtools');
// });
// window.addEventListener('invaliddomain', () => {
// 	console.log('invalid domain');
// });

Vue.config.productionTip = false;
Vue.prototype.$apis = apis;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

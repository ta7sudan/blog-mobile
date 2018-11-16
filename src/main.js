import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// TODO
setTimeout(() => {
	import('@sentry/browser').then(Sentry => {
		Sentry.init({
			dsn: 'https://379bdb0d84a54e9b9a04ef309b798dc1@sentry.io/1324471',
			integrations: [new Sentry.Integrations.Vue({Vue})],
			release: process.env.RELEASE_VERSION,
			environment: process.env.NODE_ENV
		});
	});
}, 5000);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

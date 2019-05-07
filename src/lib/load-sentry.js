import Vue from 'vue';
function load() {
	Promise.all([
		import(/* webpackChunkName: "sentry" */ '@sentry/browser'),
		import(/* webpackChunkName: "sentry" */ '@sentry/integrations')
	]).then(([Sentry, Integrations]) => {
		Sentry.init({
			// 这东西应该不算是敏感信息吧, 毕竟你都暴露到js里了
			dsn: process.env.SENTRY_DSN,
			integrations: [new Integrations.Vue({
				Vue,
				attachProps: true
			})],
			release: process.env.RELEASE_VERSION,
			environment: process.env.NODE_ENV
		});
		// 虽然这两个里面总有一个看起来有点多余,
		// 不过可读性好一点吧
		window.isSentryLoaded = true;
		window.Sentry = Sentry;
		while (window.errorPool.length) {
			const data = window.errorPool.shift();
			Sentry.captureException(data.error);
		}
	});
}
export default function loadSentry() {
	if (window.isSentryLoaded) {
		return;
	}
	if (typeof window.requestIdleCallback === 'function') {
		window.requestIdleCallback(load);
	} else {
		setTimeout(load, 300);
	}
};
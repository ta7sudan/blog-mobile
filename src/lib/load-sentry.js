import Vue from 'vue';
function load() {
	import('@sentry/browser').then(Sentry => {
		Sentry.init({
			// 这东西应该不算是敏感信息吧, 毕竟你都暴露到js里了
			dsn: process.env.SENTRY_DSN,
			integrations: [new Sentry.Integrations.Vue({Vue})],
			release: process.env.RELEASE_VERSION,
			environment: process.env.NODE_ENV
		});
		window.isSentryLoaded = true;
		while (window.errorPool.length) {
			const data = window.errorPool.shift();
			Sentry.captureException(data.error);
		}
	});
}
export default function loadSentry() {
	if (typeof window.requestIdleCallback === 'function') {
		window.requestIdleCallback(load);
	} else {
		setTimeout(load, 300);
	}
};
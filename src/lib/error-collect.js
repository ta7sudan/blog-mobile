/* global r */
var w = window, handler;
w.isSentryLoaded = false;
w.errorPool = [];
function errHandler(o) {
	if (w.isSentryLoaded) {
		return;
	}
	// 先简单收集信息
	// 其实也可以把数据给到sentry
	// 不过处理起来麻烦一点
	var o = {
		ua: w.navigator.userAgent,
		appV: w.navigator.appVersion,
		url: w.location.href,
		error: o.error,
		colno: o.colno,
		lineno: o.lineno,
		message: o.message,
		filename: o.filename,
		release: r.RELEASE // 编译时替换, r是为了RELEASE不会被压缩
	};
	w.errorPool.push(o);
	if (!handler) {
		handler = setTimeout(function () {
			if (w.isSentryLoaded) {
				return;
			}
			// 一般来讲不会太多, 目前就全量收集,
			// 也应该不会有什么并发问题, 就一次性全发出去好了
			// beacon支持度还是不太OK啊, 还是xhr好了
			w.errorPool.forEach(function (o) {
				var xhr = new XMLHttpRequest(), data = {
					text: JSON.stringify(o),
					channel: r.CHANNEL
				};
				xhr.open('POST', r.BACKUP_MONITORURL, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(data));
			});
			w.errorPool.length = 0;
		}, 5000);
	}
	
}
w.addEventListener('error', function (e) {
	errHandler({
		error: e.error || new Error(e.message),
		lineno: e.lineno,
		colno: e.colno,
		filename: e.filename,
		message: e.message
	});
});

// Promise异常onerror不捕获, 还得加个这个
// 然而也不知道是webpack还是chrome有个非常诡异的bug
// 那就是sourcemap路径会导致跨域, 以至于sentry和
// onerror和unhandledrejection都捕获不到异常,
// 不过仅限于eval的sourcemap, 打包出来以后还是正常的,
// 参考https://github.com/webpack/webpack/issues/6099
w.addEventListener('unhandledrejection', function (e) {
	errHandler({
		error: new Error(e.reason),
		lineno: 0,
		colno: 0,
		filename: '',
		message: e.reason
	});
});
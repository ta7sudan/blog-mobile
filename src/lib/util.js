export function report(err) {
	if (window.Sentry) {
		window.Sentry.captureException(err);
	} else {
		window.errorPool.push(err);
	}
}

export function decodeBase64(str) {
	return decodeURIComponent(atob(str).split('').map(c => 
		'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	).join(''));
}

export function parseJWT(jwt) {
	const parts = jwt.split('.');
	return {
		header: decodeBase64(parts[0]),
		payload: decodeBase64(parts[1]),
		signature: parts[2]
	};
}

export const loadAll = ctx => ctx.keys().reduce((rst, item) => Object.assign(rst, ctx(item).default), {});
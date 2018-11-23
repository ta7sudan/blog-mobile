export function report(err) {
	if (window.Sentry) {
		window.Sentry.captureException(err);
	} else {
		window.errorPool.push(err);
	}
}

export const loadAll = ctx => ctx.keys().reduce((rst, item) => Object.assign(rst, ctx(item).default), {});
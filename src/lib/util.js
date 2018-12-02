export function report(error) {
	if (window.Sentry) {
		window.Sentry.captureException(error);
	} else {
		window.errorPool.push({
			error
		});
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

export function once(fn) {
	let called = false;
	if (typeof fn !== 'function') {
		throw new TypeError('fn is not a function');
	}
	return function (...args) {
		if (called) return;
		called = true;
		fn.apply(this, args);
	};
}

export function scrollY(val) {
	const root = document.documentElement || document.body.parentNode || document.body;
	if (val !== undefined) {
		root.scrollTop = val;
	} else {
		return (window.pageYOffset !== undefined) ? window.pageYOffset : root.scrollTop;
	}
}

export function throttle(fn, intv = 100, ctx, immediate = true) {
	if (!isFn(fn)) {
		throw new TypeError('fn is not a function');
	}
	let handler = null, f = fn.apply.bind(fn);

	const newFn = immediate ? function () {
		if (!handler) {
			const args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
			setTimeout(f, 0, this, args);
			handler = setTimeout(() => handler = null, intv);
		}
	} : function () {
		if (!handler) {
			const args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
			handler = setTimeout(() => f(this, args) || (handler = null), intv);
		}
	};
	return ctx ? newFn.bind(ctx) : newFn;
}

export const isFn = f => typeof f === 'function';

export const loadAllObj = ctx => ctx.keys().reduce((rst, item) => Object.assign(rst, ctx(item).default), {});

export const loadAllArr = ctx => ctx.keys().reduce((rst, item) => rst.concat(ctx(item).default), []);

export const rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

export const clearRAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
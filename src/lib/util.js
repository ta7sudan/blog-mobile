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

export function routerLock(fn, timeout) {
	let lock = false, timer = null, nextQueue = [], runNext = function (cb) {
		while (nextQueue.length) nextQueue.shift()(nextQueue.length === 0 ? cb : undefined);
	};
	return function (to, from, next) {
		nextQueue.push(next);
		if (lock) {
			return;
		}
		lock = true;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		if (timeout) {
			timer = setTimeout(() => lock = false, timeout);
		}
		const rst = fn.call(this, to, from, runNext);
		if (typeof p(rst).then() === 'function') {
			return rst.then(v => (lock = false, v), v => (lock = false, v));
		}
		lock = false;
		return rst;
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

const _tween = {
	linear(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	strongEaseIn(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	sineaseIn(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	sineaseOut(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
};

function _step(startPos, endPos, startTime, duration, easing, setValue) {
	const curTime = Date.now();
	if (curTime >= startTime + duration) {
		setValue(endPos);
		return false;
	}
	const pos = _tween[easing](curTime - startTime, startPos, endPos - startPos, duration);
	setValue(pos);
}

export function animate({
	endPos,
	duration,
	setValue,
	cb = function () {},
	startPos = 0,
	easing = 'easeIn'
} = {}) {
	function run() {
		if (_step(startPos, endPos, startTime, duration, easing, setValue) === false) {
			clearRAF(id);
			cb();
		} else {
			rAF(run);
		}
	}
	const startTime = Date.now();
	const id = rAF(run);
}

export function p(obj, path = []) {
	const value = defaultValue => {
		let val = obj;
		while (val != null && path.length && (val = val[path.shift()]));
		return val == null ? defaultValue : val;
	};
	return new Proxy(value, {
		get(target, key) {
			path.push(key);
			return p(obj, path);
		}
	});
}

function isTwoCodePoint(char) {
	try {
		encodeURIComponent(char);
		return false;
	} catch (e) {
		return true;
	}
}

const selfCloseTags = ['link', 'meta', 'hr', 'br', 'area', 'img', 'track', 'source', 'col', 'input'],
	noRenderTags = ['script', 'video', 'audio'];

export function trimHtml(html, {
	limit = 100,
	suffix = null
} = {}) {
	let tagStack = [],
		currentTag = '',
		more = false,
		count = 0;
	for (var i = 0, len = html.length; i < len; ++i) {
		let tagName = [];
		if (count >= limit) {
			more = i + 1 < len;
			break;
		}
		if (html[i] === '<' && html[i+1] !== '/') {
			++i;
			while (html[i] !== '>' && !html[i].match(/\s|\//)) {
				tagName.push(html[i++]);
			}
			while (html[i] !== '>') ++i;
			currentTag = tagName.join('');
			if (selfCloseTags.includes(currentTag)) {
				continue;
			}
			tagStack.push(currentTag);
		} else if (html[i] === '<' && html[i+1] === '/') {
			i += 2;
			while (html[i] !== '>') ++i;
			tagStack.pop();
		} else if (noRenderTags.includes(currentTag)) {
			continue;
		} else {
			++count;
		}
	}
	if (isTwoCodePoint(html[i])) {
		++i;
	}
	let rst = html.slice(0, i);
	if (suffix && more) {
		rst += suffix;
	}
	while (tagStack.length) {
		rst += `</${tagStack.pop()}>`;
	}
	return {
		html: rst,
		more
	};
}

export function range(start, count) {
	return Array.from({length: count}, (v, k) => k + start);
}

export function getDate(timestamp) {
	const date = new Date(timestamp),
		year = date.getFullYear(),
		month = date.getUTCMonth() + 1,
		day = date.getUTCDate();
	return `${year}/${month}/${day}`;
}

export function addTableWrapper(htmlStr, classStr) {
	return htmlStr.replace(/<\/?table.*?>/g, m => {
		if (m === '</table>') {
			return '</table></div>';
		} else {
			return `<div class="${classStr}">${m}`;
		}
	});
}

export const isFn = f => typeof f === 'function';

export const loadAllObj = ctx => ctx.keys().reduce((rst, item) => Object.assign(rst, ctx(item).default), {});

export const loadAllArr = ctx => ctx.keys().reduce((rst, item) => rst.concat(ctx(item).default), []);

export const rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

export const clearRAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

export const apizHelper = p => p.catch(({ next }) => next());
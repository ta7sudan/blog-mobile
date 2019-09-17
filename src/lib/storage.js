const ls = window.localStorage;
export function getStorage(key) {
	const payload = ls.getItem(key);
	if (payload == null) {
		return;
	}

	const { data, expires } = JSON.parse(payload);
	if (typeof expires === 'number' && Date.now() > expires) {
		removeStorage(key);
		return;
	}
	if (data === 'undefined') {
		return;
	}
	try {
		/**
		 * warning: 存在可能的类型转换, 比如'5'会变成5, 但是这里我们应当确保不要去存类似'false'这样的字符串
		 */
		const $data = JSON.parse(data);
		return $data;
	} catch (e) {
		// 纯字符串非undefined直接返回
		return data;
	}
}

export function setStorage(key, value, timeout = Infinity) {
	const data = JSON.stringify(value);
	const expires = typeof timeout === 'number' && timeout !== Infinity && timeout > 0 ? Date.now() + timeout : timeout;
	return ls.setItem(key, JSON.stringify({
		data,
		expires
	}));
}

export function removeStorage(key) {
	return ls.removeItem(key);
}

export function clearStorage() {
	return ls.clear();
}
const locks = {};
let lockId = Date.now();

export function createLock() {
	const id = ++lockId;
	locks[id] = false;
	return {
		_timer: null,
		check() {
			return locks[id];
		},
		set() {
			locks[id] = true;
			// 对自己操作没自信...万一有个地方异常了没捕获导致锁没释放掉, 那有些
			// 操作就永久锁住了, 不太好, 给个30s自动释放好了, 如果有个全局异常捕获
			// 那就不需要这种傻逼操作...
			this._timer = setTimeout(() => this.release(), 30000);
		},
		release() {
			if (this._timer) {
				clearTimeout(this._timer);
			}
			locks[id] = false;
			this._timer = null;
		}
	};
}

export function releaseAllLocks() {
	Object.keys(locks).forEach(k => (locks[k] = false));
}

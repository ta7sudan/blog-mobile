// 其实这里应该都用es6写, 不过考虑到它不走loader, 用es5写提醒自己
// 这个文件下面还是不要太放肆了...
var loadingBlock = document.querySelector('.main-loading-bg'), show = true;
loadingBlock.addEventListener('transitionend', function (e) {
	if (show) {
		this.style.display = 'none';
		show = false;
	} else {
		show = true;
	}
});

window.mainLoading = {
	start: function () {
		if (!show) {
			loadingBlock.style.display = 'block';
			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					loadingBlock.classList.remove('main-loading-stop');
				});
			});
		}
	},
	stop: function () {
		if (show) {
			loadingBlock.classList.add('main-loading-stop');
		}
	}
};

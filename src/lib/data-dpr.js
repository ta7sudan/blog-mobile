/* 自己调整的适配方案, 就不需要像写库那样考虑通用性了 */
function run() {
	var doc = document,
		html = doc.documentElement,
		dpr = window.devicePixelRatio,
		scale = 1,
		meta = doc.querySelector('meta[name="viewport"]');
	// 不要去设置width, 设置了scale会自动以相反比例确定width, 手动设置width反而
	// 容易导致浮点数精度问题
	[2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 1].some(function (v, i) {
		return (Math.abs(v - dpr) < 0.25 || i === 7) && (dpr = v);
	});
	html.setAttribute('data-dpr', dpr);
	// scale 也可以在dpr取整之前用来设置meta, 那样可以获得所有物理像素的使用权
	// 但是会导致和dpr比例有一点点失调, 放这里的话, scale和dpr比例总是反比, 但是
	// 不能获得所有物理像素的使用权
	scale = 1 / dpr;
	meta.setAttribute('content', 'initial-scale=' + scale + ', shrink-to-fit=no, user-scalable=no');
	var fontSize = 12 * dpr;
	fontSize % 2 && (fontSize = fontSize + 1);
	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = fontSize + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function () {
			doc.body.style.fontSize = fontSize + 'px';
		});
	}
}
run();
// 其实这句没必要的, 不过为了调试方便加上吧,
// 又是讲如果这里走webpack的话, 就可以用环境变量了,
// 那就不会有一点多余的代码, 不过这一点点无所谓了
window.addEventListener('resize', run);

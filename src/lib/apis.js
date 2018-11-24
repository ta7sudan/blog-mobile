import { APIz, config as configAPIz } from 'apiz-ng';
import { config as configAjax } from 'tinyjx';
import { loadAll, report } from '../lib/util';
import apizClient from 'apiz-browser-client';
import Status from './http-status';
import auth from './auth';

configAjax({
	pool: 5
});

// 这里需要关心的几点
// * JWT从哪里来 - 可以从页面cookie来, 可以从授权接口响应的body, header来, 可以从授权通过之后重定向的页面cookie来
// * JWT存哪里 - 可以存cookie, 可以存localstorage, 或者IndexDB或其他持久化存储
// * JWT怎么发回去 - 可以从query string, 不过这个基本不考虑, 可以从header, 可以从cookie
// * JWT过期怎么处理 - 从JWT来源重新获取, 再重新请求. 刷新页面或重定向页面. 直接弹窗. 前端解析JWT在快过期之前用旧JWT换新JWT
configAPIz({
	immutableMeta: true,
	defaultType: 'json',
	client: apizClient({
		retry: 1,
		beforeSend(xhr) {
			// 其实没有什么用户授权的需求, 这里只是个前台应用,
			// 如果是后台的话倒也合理, 不过人总是喜欢给自己加点戏,
			// 那就假设这是一个较大型的应用, 需要授权吧
			// 其实cookie上httponly+secure最安全, 缺点是js无法读取
			// 以及cookie不能在多个域名共享, 虽然我也没有多个域名,
			// 不过也假设这是个较大型的应用...
			const jwt = localStorage.getItem('JWT');
			if (!jwt) {
				// 理论上讲, 如果被禁用了cookie, 会出现循环刷新页面,
				// 但是那就不是我的责任了...
				// 能够随意刷新的前提是这个动作不太影响用户交互,
				// 以及我个人不是很care...以及页面的状态不会丢失,
				// 以及请求是幂等的
				// 准确来说, 这里是意外情况, 比如用户手动清除了持久化的数据, 
				// 则应当从JWT来源重新获取, 这里来源就是页面cookie, 所以只能刷新
				// 如果来源是授权接口或者要重新授权, 那就应当请求授权接口或者重定向授权页面
				location.reload(true);
			}
			xhr.setRequestHeader('AUTH', jwt);
		},
		afterResponse(resData, xhr, url, reqData) {
			// 根据状态码做一些异常处理, 比如JWT过期, 或其他什么的
			// 不要用HTTP状态码, 虽然这样更符合语义, 但是运营商
			// 劫持一下你状态码可能就出错, 还是自己自定义状态码吧
			if (resData.statusCode === Status.TOKEN_EXPIRED) {
				// 如果后端认为你JWT过期了, 那管你是真过期没过期,
				// 都当作过期处理, 那就只能从JWT来源重新获取
				// 所以这里也只能刷新页面, 但理论上这情况不存在
				alert('Token谜之失效, 页面稍后自动刷新');
				location.reload(true);
			}
			if (resData.statusCode !== Status.OK) {
				report(new Error(JSON.stringify({
					message: 'Request error',
					data: reqData,
					url
				})));
				alert('未知错误');
			}
		}
	})
});

// 这东西并不能封装成函数, 使得路径为变量
// 因为这实际上是个编译期的东西, 运行时并不存在
// 所以不得不每个用到的地方都这么写了
const meta = loadAll(require.context('../apis', true, /\.js$/));

const apis = new APIz(meta);

auth(apis);

export default apis;

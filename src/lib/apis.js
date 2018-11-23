import { APIz, config as configAPIz } from 'apiz-ng';
import { config as configAjax } from 'tinyjx';
import { loadAll } from '../lib/util';
import apizClient from 'apiz-browser-client';

configAjax({
	pool: 5
});

configAPIz({
	immutableMeta: true,
	defaultType: 'json',
	client: apizClient({
		retry: 1,
		beforeSend(xhr) {
			// 其实没有什么用户授权的需求, 这里只是个前台应用,
			// 如果是后台的话倒也合理, 不过人总是喜欢给自己加点戏,
			// 那就假设这是一个较大型的应用, 需要授权吧
			// TODO
		},
		afterResponse(data, xhr) {
			// TODO
			// 根据状态码做一些异常处理, 比如JWT过期, 或其他什么的
		}
	})
});

// 这东西并不能封装成函数, 使得路径为变量
// 因为这实际上是个编译期的东西, 运行时并不存在
// 所以不得不每个用到的地方都这么写了
const meta = loadAll(require.context('../apis', true, /\.js$/));

const apis = new APIz(meta);

export default apis;

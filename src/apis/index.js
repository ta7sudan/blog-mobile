import { loadAllObj } from '../lib/util';
export default {
	baseURL: process.env.API_HOST,
	// 这东西并不能封装成函数, 使得路径为变量
	// 因为这实际上是个编译期的东西, 运行时并不存在
	// 所以不得不每个用到的地方都这么写了
	apis: loadAllObj(require.context('../apis', true, /(?<!index)\.js$/))
};
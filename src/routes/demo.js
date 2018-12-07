import Home from '../views/Home.vue';
export default [
	{
		path: '/',
		component: Home,
		children: [{
			name: 'home',
			path: ''
			// 没有router-view, 不需要component, 这里是负责表示一个状态
		}, {
			name: 'home-menu',
			path: 'menu'
		}]
	},
	{
		path: '/about',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		children: [{
			name: 'about',
			path: ''
		}, {
			name: 'about-menu',
			path: 'menu'
		}]
	}
];
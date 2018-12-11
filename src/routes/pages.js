export default [
	{
		path: '/home',
		alias: '/',
		component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
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
		component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
		children: [{
			name: 'about',
			path: ''
		}, {
			name: 'about-menu',
			path: 'menu'
		}]
	},
	{
		path: '/archives',
		component: () => import(/* webpackChunkName: "archives" */ '../views/archives.vue'),
		children: [{
			name: 'archives',
			path: ''
		}, {
			name: 'archives-menu',
			path: 'menu'
		}]
	},
	{
		path: '/tags',
		component: () => import(/* webpackChunkName: "tags" */ '../views/tags.vue'),
		children: [{
			name: 'tags',
			path: ''
		}, {
			name: 'tags-menu',
			path: 'menu'
		}]
	},
	{
		path: '/friends',
		component: () => import(/* webpackChunkName: "friends" */ '../views/friends.vue'),
		children: [{
			name: 'friends',
			path: ''
		}, {
			name: 'friends-menu',
			path: 'menu'
		}]
	}
];
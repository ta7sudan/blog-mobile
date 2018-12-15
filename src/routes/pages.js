import Home from '../views/home.vue';
export default [
	{
		path: '/',
		redirect: {
			name: 'home',
			params: {
				page: 1
			}
		}
	},
	{
		path: '/home/:page',
		props(route) {
			return {
				page: parseInt(route.params.page, 10)
			};
		},
		component: Home,
		children: [{
			name: 'home',
			path: ''
			// 没有router-view, 不需要component, 这里是负责表示一个状态
			// 但是没给component, 又恰好path是空串, 并且上面还用了路径参数
			// vue-router会报一个无关紧要的warning...
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
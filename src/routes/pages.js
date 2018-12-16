import Home from '../views/home.vue';
export default [
	{
		path: '/',
		redirect: '/home/1'
	},
	{
		path: '/home',
		redirect: '/home/1'
	},
	{
		name: 'home',
		path: '/home/:page',
		props(route) {
			return {
				page: parseInt(route.params.page, 10)
			};
		},
		component: Home
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
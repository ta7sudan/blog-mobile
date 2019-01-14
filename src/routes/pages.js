import Home from '../views/home.vue';
import Post from '../views/post.vue';

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
		name: 'posts',
		path: '/posts/:id',
		props(route) {
			return {
				id: parseInt(route.params.id, 10)
			};
		},
		component: Post
	},
	{
		path: '/tags',
		component: () => import(/* webpackChunkName: "tags" */ '../views/tags.vue'),
		children: [{
			name: 'tags',
			path: ''
		}, {
			name: 'tags-detail',
			path: ':tag',
			props: true
		}]
	},
	{
		path: '/archives',
		redirect: '/archives/1'
	},
	{
		name: 'archives',
		path: '/archives/:page',
		props(route) {
			return {
				page: parseInt(route.params.page, 10)
			};
		},
		component: () => import(/* webpackChunkName: "archives" */ '../views/archives.vue')
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
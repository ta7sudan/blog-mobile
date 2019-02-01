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
				id: route.params.id
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
		name: 'about',
		path: '/about',
		component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
	},
	{
		name: 'friends',
		path: '/friends',
		component: () => import(/* webpackChunkName: "friends" */ '../views/friends.vue')
	},
	{
		name: 'search',
		path: '/search',
		props(route) {
			return {
				query: route.query.query
			};
		},
		component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
	}
];
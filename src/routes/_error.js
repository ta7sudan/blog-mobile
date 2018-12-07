import NotFoundPage from '../views/not-found.vue';
import ErrorPage from '../views/error.vue';
export default [{
	path: '/error',
	props: true,
	component: ErrorPage,
	children: [{
		name: 'error',
		path: ''
	}, {
		name: 'error-menu',
		path: 'menu'
	}]
}, {
	path: '/notfound',
	props: true,
	component: NotFoundPage,
	children: [{
		name: 'notFound',
		path: ''
	}, {
		name: 'notFound-menu',
		path: 'menu'
	}]
}, {
	// 这个不需要name, 因为无法通过api跳转
	path: '*',
	component: NotFoundPage
}];
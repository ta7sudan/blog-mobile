import NotFoundPage from '../pages/not-found.vue';
import ErrorPage from '../pages/error.vue';
export default [{
	name: 'error',
	path: '/error',
	props: true,
	component: ErrorPage
}, {
	name: 'notFound',
	path: '/notfound',
	props: true,
	component: NotFoundPage
}, {
	// 这个不需要name, 因为无法通过api跳转
	path: '*',
	component: NotFoundPage
}];
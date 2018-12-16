export default {
	cube: ['家', '苟', '国', '生', '死', '利'],
	desc: 'Hello world todo',
	menu: [{
		icon: 'home3',
		text: 'Home',
		// 用/home而不是name home是为了激活router-link的active-class
		// 意味着router配置中也需要为/home去重定向到/home/1
		route: '/home'
	}, {
		icon: 'books',
		text: 'Archives',
		route: {
			name: 'archives'
		}
	}, {
		icon: 'tags',
		text: 'Tags',
		route: {
			name: 'tags'
		}
	}, {
		icon: 'users',
		text: 'Friends',
		route: {
			name: 'friends'
		}
	}, {
		icon: 'user',
		text: 'About',
		route: {
			name: 'about'
		}
	}],
	sns: [{
		icon: 'github',
		url: 'https://github.com/ta7sudan'
	}, {
		icon: 'twitter',
		url: 'https://www.todo.com'
	}, {
		icon: 'linkedin',
		url: 'https://www.todo.com'
	}, {
		icon: 'stackoverflow',
		url: 'https://www.todo.com'
	}, {
		icon: 'rss',
		url: 'https://www.todo.com'
	}]
};
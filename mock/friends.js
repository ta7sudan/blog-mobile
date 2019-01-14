require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/friends`]: {
		statusCode: 200,
		errorMessage: 'test',
		friends: [{
			avatar: 'https://woody.style/avatar.png',
			name: '测试',
			desc: '测试 test test testTest test test testTest test test test',
			link: 'https://www.zhihu.com'
		}, {
			avatar: 'https://woody.style/avatar.png',
			name: 'Test',
			desc: 'Test test test test',
			link: 'https://www.zhihu.com'
		}, {
			avatar: 'https://woody.style/avatar.png',
			name: 'Test',
			desc: 'Test test test test',
			link: 'https://www.zhihu.com'
		}, {
			avatar: 'https://woody.style/avatar.png',
			name: 'Test',
			desc: 'Test test test test',
			link: 'https://www.zhihu.com'
		}, {
			avatar: 'https://woody.style/avatar.png',
			name: 'Test',
			desc: 'Test test test test',
			link: 'https://www.zhihu.com'
		}, {
			avatar: 'https://woody.style/avatar.png',
			name: 'Test',
			desc: 'Test test test test',
			link: 'https://www.zhihu.com'
		}]
	}
};
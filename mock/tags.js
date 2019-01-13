require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/tags`]: {
		statusCode: 200,
		errorMessage: 'test',
		tags: [{
			tagName: 'Javascript',
			posts: [{
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}]
		}, {
			tagName: 'HTML',
			posts: [{
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}]
		}, {
			tagName: 'CSS',
			posts: [{
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}]
		}, {
			tagName: '工程实践',
			posts: [{
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}]
		}, {
			tagName: 'Rust',
			posts: [{
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}, {
				id: '123',
				title: '测试1'
			}]
		}]
	}
};
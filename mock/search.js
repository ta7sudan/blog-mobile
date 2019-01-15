require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/search`]: {
		statusCode: 200,
		errorMessage: 'test',
		result: [{
			id: 123,
			title: '测试0'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}, {
			id: 321,
			title: 'Test'
		}]
	}
};
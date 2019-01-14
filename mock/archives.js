require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/archives/:page`]: {
		statusCode: 200,
		errorMessage: 'test',
		total: 256,
		archives: [{
			group: '2018-12',
			posts: [{
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}]
		}, {
			group: '2017-12',
			posts: [{
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}]
		}, {
			group: '2016-12',
			posts: [{
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}, {
				year: 2018,
				month: 12,
				date: 23,
				id: 123,
				title: '测试0'
			}]
		}]
	}
};
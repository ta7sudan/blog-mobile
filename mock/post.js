const fs = require('fs').promises;
const path = require('path');
require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/posts/:id`]: async req => {
		const files = await fs.readdir(path.resolve(__dirname, './assets'));
		const file = Math.floor(Math.random() * 10) < 5 ? files[0] : files[1];
		const content = await fs.readFile(path.resolve(__dirname, './assets', file));
		const id = req.params.id;
		const post = {
			id,
			title: file.slice(0, -3),
			author: 'ta7sudan',
			tags: ['Javascript', 'Front-End', 'test', 'aaa', 'bbb'],
			views: 100,
			img: 'https://img.mp.itc.cn/upload/20170212/59a1530dadbd455fbd6e6127556a3b08_th.jpg',
			// img: '',
			parsed: false,
			createdTime: Date.now(),
			modifiedTime: Date.now() + 864e3,
			content: `## ${id}\n\n ${content}`
		};
		return {
			statusCode: 200,
			errorMessage: 'test',
			post
		};
	},
	[`get /api/${process.env.API_VERSION}/prev-next`]: {
		statusCode: 200,
		errorMessage: 'test',
		prev: {
			id: '123',
			title: 'test0'
		},
		next: {
			id: '321',
			title: 'test1'
		}
	}
};
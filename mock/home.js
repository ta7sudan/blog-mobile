const fs = require('fs').promises;
const path = require('path');
require('dotenv-safe').config({
	example: '.env'
});
module.exports = {
	[`get /api/${process.env.API_VERSION}/home/posts/:page`]: async req => {
		const posts = [];
		const files = await fs.readdir(path.resolve(__dirname, './assets'));
		for (const file of files) {
			const post = await fs.readFile(path.resolve(__dirname, './assets', file), {
				encoding: 'utf8'
			});
			posts.push({
				id: Math.floor(Math.random() * 10 - 1),
				title: file.slice(0, -3),
				author: 'ta7sudan',
				tags: ['Javascript', 'Front-End'],
				views: 100,
				page: parseInt(req.params.page, 10),
				parsed: false,
				createdTime: Date.now(),
				modifiedTime: Date.now() + 864e3,
				content: post
			});
		}
		return {
			statusCode: 200,
			errorMessage: 'test',
			total: 256,
			posts
		};
	}
};
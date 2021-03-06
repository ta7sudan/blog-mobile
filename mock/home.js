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
			let n = 5;
			const post = await fs.readFile(path.resolve(__dirname, './assets', file), {
				encoding: 'utf8'
			});
			while (n--) {
				let id = Math.floor(Math.random() * 10000 - 1).toString();
				posts.push({
					id,
					title: file.slice(0, -3),
					author: 'ta7sudan',
					tags: ['Javascript', 'Front-End'],
					views: 100,
					img: 'https://img.mp.itc.cn/upload/20170212/59a1530dadbd455fbd6e6127556a3b08_th.jpg',
					// img: '',
					page: parseInt(req.params.page, 10),
					parsed: false,
					createdTime: Date.now(),
					modifiedTime: Date.now() + 864e3,
					content: `## ${id}\n\n ${post}`
				});
			}
		}
		return {
			statusCode: 200,
			errorMessage: 'test',
			total: 256,
			posts
		};
	}
};
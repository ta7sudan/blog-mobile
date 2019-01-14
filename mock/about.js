const fs = require('fs').promises;
const path = require('path');
require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/about`]: async req => {
		const content = await fs.readFile(path.resolve(__dirname, './assets/about.md'), 'utf8');
		return {
			statusCode: 200,
			errorMessage: 'test',
			content
		};
	}
};
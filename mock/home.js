require('dotenv-safe').config({
	example: '.env'
});
module.exports = {
	[`get /api/${process.env.API_VERSION}/posts`]: {
		statusCode: 200,
		errorMessage: 'test',
		hello: 'world'
	}
};
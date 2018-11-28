require('dotenv-safe').config({
	example: '.env'
});

async function auth(app, options) {
	app.register(require('fastify-jwt'), {
		secret: 'test',
		sign: {
			expiresIn: '1h',
			issuer: 'ta7sudan'
		},
		verify: {
			maxAge: '1h',
			issuer: 'ta7sudan'
		}
	});
	app.get(`/api/${process.env.API_VERSION}/jwt/exchange`, async function (req, res) {
		const jwt = this.jwt.sign({
			content: 'hello world'
		});
		return {
			statusCode: 200,
			jwt
		};
	});
}
// exchange

module.exports = auth;
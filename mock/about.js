const fs = require('fs').promises;
const path = require('path');
require('dotenv-safe').config({
	example: '.env'
});

module.exports = {
	[`get /api/${process.env.API_VERSION}/about`]: async req => {
		const profile = await fs.readFile(path.resolve(__dirname, './assets/about.md'), 'utf8');
		return {
			statusCode: 200,
			errorMessage: 'test',
			name: 'ta7sudan',
			desc: 'test test',
			alipayQrCode: 'http://www.liantu.com/images/2013/liantu.png',
			wechatPayQrCode: 'http://www.liantu.com/images/2013/liantu.png',
			bitcoinAddr: '1NUSDCWti9FBJLiUxaLY1zJnwcSDc5Tfci',
			profile
		};
	}
};
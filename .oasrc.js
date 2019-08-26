'use strict';

module.exports = {
	provider: 'ali',
	dir: './build',
	retry: 3,
	limit: 10,
	timeout: 30000,
	types: ['img', 'js', 'css', 'font'],
	ossOptions: {
		accessKeyId: 'todo',
		accessKeySecret : 'todo',
		bucket: 'blog-mobile',
		region: 'oss-cn-shenzhen',
		endpoint: 'oss-cn-shenzhen.aliyuncs.com',
		secure: true
	}
};
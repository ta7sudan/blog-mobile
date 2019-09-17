export default {
	getPostById: {
		path: `/api/${process.env.API_VERSION}/posts/:id`
	},
	getPrevNextById: {
		path: `/api/${process.env.API_VERSION}/prev-next`
	},
	addPostViewCount: {
		path: `/api/${process.env.API_VERSION}/posts/:id`,
		method: 'patch'
	}
};
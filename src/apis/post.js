/* global API_VERSION */
export default {
	getPostById: {
		path: `/api/${API_VERSION}/posts/:id`
	},
	getPrevNextById: {
		path: `/api/${API_VERSION}/prev-next`
	},
	addPostViewCount: {
		path: `/api/${API_VERSION}/posts/:id`,
		method: 'patch'
	}
};
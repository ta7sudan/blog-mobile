/* global API_VERSION */
export default {
	getPostById: {
		path: `/api/${API_VERSION}/posts/:id`,
		pathParams: true
	}
};
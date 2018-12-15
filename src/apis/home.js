/* global API_VERSION */
export default {
	getHomePosts: {
		path: `/api/${API_VERSION}/home/posts/:page`,
		pathParams: true
	}
};
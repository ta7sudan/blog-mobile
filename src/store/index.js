import Vue from 'vue';
import Vuex from 'vuex';
import { SET_POSTS_TOTAL, ADD_POSTS } from './mutation-types';
import apis from '../lib/apis';
import { apizHelper as h, trimHtml } from '../lib/util';
import marked from '../lib/marked';

Vue.use(Vuex);

// 暂时还不需要分模块
const store = new Vuex.Store({
	strict: DEBUG,
	state: {
		total: 0,
		posts: []
	},
	getters: {
		// O(n^2)插入
		pageMap(state) {
			const map = {};
			for (const post of state.posts) {
				const page = post.page;
				if (!map[page]) {
					map[page] = [];
				}
				if (map[page].some(item => item.id === post.id)) {
					continue;
				}
				map[page].push(post);
			}
			return map;
		}
	},
	mutations: {
		[SET_POSTS_TOTAL](state, n) {
			state.total = n;
		},
		// O(n^2)插入
		[ADD_POSTS](state, posts) {
			for (const post of posts) {
				if (state.posts.some(item => item.id === post.id)) {
					continue;
				}
				state.posts.push(post);
			}
		}
	},
	actions: {
		async getHomePosts({ commit, getters: { pageMap } }, page) {
			if (!pageMap[page]) {
				const { data } = await h(apis.getHomePosts({
					page
				}));
				data.posts.forEach(post => {
					if (!post.parsed) {
						post.content = marked(post.content);
						post.trimedHtml = trimHtml(post.content, {
							limit: 200,
							suffix: '...'
						}).html;
						post.parsed = true;
					}
				});
				commit(SET_POSTS_TOTAL, data.total);
				commit(ADD_POSTS, data.posts);
			}
			return pageMap[page];
		}
	}
});

export * from './mutation-types';

export default store;
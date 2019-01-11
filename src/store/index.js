import Vue from 'vue';
import Vuex from 'vuex';
import { SET_POSTS_TOTAL, ADD_POSTS, ADD_POSTS_MAP } from './mutation-types';
import apis from '../lib/apis';
import { apizHelper as h, trimHtml } from '../lib/util';
import marked from '../lib/marked';

Vue.use(Vuex);

// 暂时还不需要分模块
const store = new Vuex.Store({
	strict: DEBUG,
	state: {
		total: 0,
		posts: [],
		postsIdMap: {}
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
		},
		[ADD_POSTS_MAP](state, post) {
			if (state.postsIdMap[post.id]) {
				return;
			}
			state.postsIdMap[post.id] = post;
		}
	},
	actions: {
		async getHomePosts({ commit, getters: { pageMap } }, page) {
			if (!pageMap[page]) {
				const { data } = await h(apis.getHomePosts({
					page
				}, {
					limit: 10
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
		},
		async getPostById({ commit, state }, id) {
			if (state.postsIdMap[id]) {
				return state.postsIdMap[id];
			}
			for (const post of state.posts) {
				if (post.id === id) {
					commit(ADD_POSTS_MAP, post);
					return post;
				}
			}
			const { data: { post } } = await h(apis.getPostById({
				id
			}));
			commit(ADD_POSTS_MAP, post);
			return post;
		}
	}
});

export * from './mutation-types';

export default store;
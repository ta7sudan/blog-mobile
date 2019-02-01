import Vue from 'vue';
import Vuex from 'vuex';
import {
	SET_POSTS_TOTAL,
	ADD_POSTS,
	ADD_POSTS_MAP,
	ADD_PREVNEXT_MAP,
	SET_TAGS,
	ADD_ARCHIVES_MAP,
	SET_ARCHIVES_TOTAL,
	SET_USERPROFILE,
	SET_FRIENDS } from './mutation-types';
import apis from '../lib/apis';
import { apizHelper as h, trimHtml, addTableWrapper } from '../lib/util';
import marked from '../lib/marked';

Vue.use(Vuex);

// 暂时还不需要分模块
const store = new Vuex.Store({
	strict: DEBUG,
	state: {
		// 命名没起好...不过为了兼容性算了不改了..
		total: 0,
		archivesTotal: 0,
		posts: [],
		postsIdMap: {},
		prevNextMap: {},
		tags: [],
		archivesPageMap: {},
		userProfile: null,
		friends: []
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
		},
		[ADD_PREVNEXT_MAP](state, { id, data }) {
			state.prevNextMap[id] = data;
		},
		[SET_TAGS](state, tags = []) {
			state.tags = tags;
		},
		[ADD_ARCHIVES_MAP](state, { page, archives }) {
			state.archivesPageMap[page] = archives;
		},
		[SET_ARCHIVES_TOTAL](state, total) {
			state.archivesTotal = total;
		},
		[SET_USERPROFILE](state, data) {
			state.userProfile = data;
		},
		[SET_FRIENDS](state, friends = []) {
			state.friends = friends;
		}
	},
	// 基本上所有接口数据都会做缓存, 但是目前因为是session范围的缓存,
	// 所以暂时不考虑缓存失效的策略, 另一方面数据对实时性要求不高, 即便
	// 后台更新了, 在一次session中前端内容没有更新也没太大关系
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
						post.content = addTableWrapper(marked(post.content), 'table-wrapper');
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
			if (!post.parsed) {
				post.content = addTableWrapper(marked(post.content), 'table-wrapper');
				post.trimedHtml = trimHtml(post.content, {
					limit: 200,
					suffix: '...'
				});
				post.parsed = true;
			}
			commit(ADD_POSTS_MAP, post);
			return post;
		},
		async getPrevNextById({ commit, state }, id) {
			if (state.prevNextMap[id]) {
				return state.prevNextMap[id];
			}
			const { data: { prev, next }} = await h(apis.getPrevNextById({
				id
			}));
			commit(ADD_PREVNEXT_MAP, {
				id,
				data: {
					prev,
					next
				}
			});
			return {
				prev,
				next
			};
		},
		async getAllTags({ commit, state }) {
			if (state.tags.length) {
				return state.tags;
			}
			const { data: { tags }} = await h(apis.getAllTags());
			commit(SET_TAGS, tags);
			return tags;
		},
		async getArchivesByPage({ commit, state }, { page, limit }) {
			if (state.archivesPageMap[page]) {
				return state.archivesPageMap[page];
			}
			const { data: { archives, total }} = await h(apis.getArchives({
				page
			}, {
				limit,
				groupBy: 'month'
			}));
			commit(ADD_ARCHIVES_MAP, { page, archives });
			commit(SET_ARCHIVES_TOTAL, total);
			return archives;
		},
		async getProfile({ commit, state }) {
			if (state.userProfile) {
				return state.userProfile;
			}
			const { data: { name, desc, profile }} = await h(apis.getProfile());
			const userProfile = {
				name,
				desc,
				profile: addTableWrapper(marked(profile), 'table-wrapper')
			};
			commit(SET_USERPROFILE, userProfile);
			return userProfile;
		},
		async getFriends({ commit, state }) {
			if (state.friends.length) {
				return state.friends;
			}
			const { data: { friends }} = await h(apis.getFriends());
			commit(SET_FRIENDS, friends);
			return friends;
		}
	}
});

export * from './mutation-types';

export default store;
<template>
	<page-layout>
		<div class="home-page">
			<preview-post v-for="(post, i) in posts" :key="i" v-bind="post" />
			<pagination class="pagination-pos" :total="total" :limit="posts.length" route-name="home" />
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import PreviewPost from '../components/preview-post.vue';
import Pagination from '../components/pagination.vue';
import { mapGetters, mapState } from 'vuex';
import store from '../store';
import { GET_HOME_POSTS } from '../store/action-types';
import { routerLock } from '../lib/util';

export default {
	/* global NProgress */
	pageTitle: `Home | ${process.env.TITLE}`,
	props: {
		page: {
			type: Number,
			default: 1
		}
	},
	computed: {
		posts() {
			return this.pageMap[this.page] || [];
		},
		...mapState(['total']),
		...mapGetters(['pageMap'])
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		const page = to.params.page;
		NProgress.start();
		return store.dispatch(GET_HOME_POSTS, page)
			.then(() => 
				next(vm => NProgress.done())
			);
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		// enter中一开始没有this实在太JB了...
		// 让人都不想map出action来
		const page = to.params.page;
		NProgress.start();
		return store.dispatch(GET_HOME_POSTS, page)
			.then(() => {
				next();
				NProgress.done();
			});
	}),
	components: {
		PageLayout,
		PreviewPost,
		Pagination
	}
};
</script>

<style lang="postcss" scoped>
.home-page {
	padding-top: 30px;
	padding-bottom: 180px;
}

.pagination-pos {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 220px;
}
</style>

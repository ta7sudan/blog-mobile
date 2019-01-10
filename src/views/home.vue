<template>
	<div class="home-page">
		<preview-post v-for="(post, i) in posts" :key="i" v-bind="post" />
		<pagination class="pagination-pos" :total="total" :limit="posts.length" route-name="home" />
	</div>
</template>

<script>
import PreviewPost from '../components/preview-post.vue';
import Pagination from '../components/pagination.vue';
import { mapGetters, mapState } from 'vuex';
import store from '../store';
import { routerLock } from '../lib/util';

export default {
	/* global TITLE */
	data() {
		return {
			pageTitle: `Home | ${TITLE}`,
			currentPage: 1
		};
	},
	props: {
		page: {
			type: Number,
			default: 1
		}
	},
	computed: {
		posts() {
			return this.pageMap[this.currentPage] || [];
		},
		...mapState(['total']),
		...mapGetters(['pageMap'])
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		const page = to.params.page;
		/* global NProgress */
		NProgress.start();
		return store.dispatch('getHomePosts', page)
			.then(() => 
				next(vm => {
					document.title = vm.pageTitle;
					vm.currentPage = page;
					NProgress.done();
				})
			);
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		// enter中一开始没有this实在太JB了...
		// 让人都不想map出action来
		const page = to.params.page;
		NProgress.start();
		return store.dispatch('getHomePosts', page)
			.then(() => {
				this.currentPage = page;
				next();
				NProgress.done();
			});
	}),
	components: {
		PreviewPost,
		Pagination
	}
};
</script>

<style lang="postcss" scoped>
.home-page {
	padding-top: 30px;
}

.pagination-pos {
	margin: 80px auto 20px;
}
</style>

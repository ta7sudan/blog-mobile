<template>
	<page-layout>
		<div class="search-page">
			<div class="main">
				<h1 class="title">Search: {{query}}</h1>
				<ul class="result" v-if="result && result.length">
					<router-link class="item" tag="li" :to="{name: 'posts', params: {id: post.id}}" v-for="(post, i) in result" :key="i">{{post.title}}</router-link>
				</ul>
				<p class="nothing" v-else>Not found.</p>
			</div>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import apis from '../lib/apis';
import { routerLock } from '../lib/util';

/* global TITLE, NProgress */

export default {
	pageTitle: `Search | ${TITLE}`,
	data() {
		return {
			result: []
		};
	},
	props: {
		query: {
			type: String,
			default: ''
		}
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		NProgress.start();
		return apis.getSearchResult({
			query: to.query.query
		}).then(({ data: { result = [] }}) => next(vm => (vm.result = result, NProgress.done())));
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		NProgress.start();
		return apis.getSearchResult({
			query: to.query.query
		}).then(({ data: { result = [] }}) => (this.result = result, next(), NProgress.done()));
	}),
	components: {
		PageLayout
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.main {
	width: 680px;
	margin: auto;
}

.title {
	color: $searchTitleColor;
	margin-top: 80px;
	@include font(24);
}

.result {
	margin-top: 50px;
}

.item {
	color: $searchItemColor;
	line-height: 1.6em;
	margin-left: 20px;
	margin-bottom: 30px;
	padding: 20px 40px 20px 45px;
	border-bottom: 3px dotted $searchItemBorderColor;
	transition: color 0.3s ease;
	position: relative;
	@include font(16);
	&::before {
		content: "";
		display: block;
		background: $searchItemDotColor;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		transform: scale(0.3);
		position: absolute;
		top: 0.7em;
		left: 0;
	}
	&:active {
		color: $searchItemActiveColor;
	}
}

.nothing {
	color: $searchNotFoundColor;
	margin-top: 60px;
	text-align: center;
	@include font(18);
}
</style>

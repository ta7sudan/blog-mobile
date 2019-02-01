<template>
	<page-layout>
		<div class="about-page">
			<div class="title-map"><h1 class="page-title">About</h1></div>
			<div class="main">
				<div class="about-content" v-if="userProfile" v-html="userProfile.profile"></div>
			</div>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import { routerLock } from '../lib/util';
import { mapState } from 'vuex';
import store from '../store';
import '../styles/post-content.css';

/* global TITLE, NProgress */

export default {
	pageTitle: `About | ${TITLE}`,
	computed: {
		...mapState(['userProfile'])
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		NProgress.start();
		return store.dispatch('getProfile')
		 .then(() => next(() => NProgress.done()));
	}),
	components: {
		PageLayout
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.title-map {
	height: 280px;
	background: url('./images/about-title-nosprites.jpg') center/cover;
	overflow: auto;
}

.page-title {
	color: $aboutPageTitleColor;
	text-align: center;
	margin-top: 100px;
	@include font(34);
}

.main {
	width: 680px;
	margin: auto;
}

</style>



<template>
	<page-layout>
		<div class="archives-page">
			<div class="group" v-for="(group, i) in archives" :key="i">
				<h1 class="group-title"><i class="icon icon-calendar"></i><span class="title">{{group.group}}</span></h1>
				<ul class="posts">
					<router-link class="post" :to="{name: 'posts', params: {id: post.id}}" tag="li" v-for="(post, idx) in group.posts" :key="idx"><p>{{post.title}}</p><span class="date">{{post | format}}</span></router-link>
				</ul>
			</div>
			<pagination class="pagination-pos" :total="archivesTotal" :limit="limit" route-name="archives" />
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import Pagination from '../components/pagination.vue';
import { routerLock } from '../lib/util';
import { mapState } from 'vuex';
import store from '../store';
import { GET_ARCHIVES_BY_PAGE } from '../store/action-types';
import '../styles/iconfont.css';

/* global NProgress */
const PAGE_LIMIT = 4;

export default {
	pageTitle: `Archives | ${process.env.TITLE}`,
	data() {
		return {
			limit: PAGE_LIMIT
		};
	},
	props: {
		page: {
			type: Number,
			required: true
		}
	},
	computed: {
		archives() {
			return this.archivesPageMap[this.page] || [];
		},
		...mapState(['archivesPageMap', 'archivesTotal'])
	},
	filters: {
		format(post) {
			return `${post.month} - ${post.date}`;
		}
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		NProgress.start();
		const page = to.params.page;
		return store.dispatch(GET_ARCHIVES_BY_PAGE, {
			page,
			limit: PAGE_LIMIT
		}).then(() => next(() => NProgress.done()));
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		NProgress.start();
		const page = to.params.page;
		return store.dispatch(GET_ARCHIVES_BY_PAGE, {
			page,
			limit: PAGE_LIMIT
		}).then(() => (next(), NProgress.done()));
	}),
	components: {
		PageLayout,
		Pagination
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.archives-page {
	padding-top: 30px;
	padding-bottom: 180px;
}

.pagination-pos {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 220px;
}

.group {
	width: 680px;
	margin: 50px auto 90px;
}

.group-title {
	color: $archivesPageGroupTitleColor;
	margin-bottom: 30px;
	display: flex;
	align-items: center;
	align-content: center;
	.icon {
		padding-bottom: 4px;
		@include font(20);
	}
}

.title {
	margin-left: 20px;
	line-height: 1.6em;
	@include font(24);
}

$lineWidth: 8px;
$lineLeft: 20px;
.posts {
	padding-left: $lineWidth + $lineLeft;
	position: relative;
	&::before {
		content: "";
		display: block;
		height: 105%;
		background: $tagPageUlLineColor;
		position: absolute;
		left: $lineLeft;
		width: $lineWidth;
	}
}

.post {
	color: $tagPageLiColor;
	line-height: 1.8em;
	padding: 20px 30px 50px 40px;
	border-bottom: 1px dashed $tagPageLiBorderColor;
	transition: color 0.3s ease;
	position: relative;
	@include font(14);
	&::before {
		content: "";
		display: block;
		transition: color 0.3s ease;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: $tagPageLiDotColor;
		transform: scale(0.4);
		position: absolute;
		top: 0.9em;
		left: -24px;
	}
	&:active {
		color: $tagPageLiActiveColor;
		&::before {
			background: $tagPageLiActiveColor;
		}
	}
}

.date {
	color: $archivesPageDateColor;
	line-height: 1em;
	position: absolute;
	right: 30px;
	bottom: 15px;
	@include font(12);
}
</style>


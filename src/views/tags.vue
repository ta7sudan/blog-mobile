<template>
	<page-layout>
		<div class="tags-page">
			<div class="title-map">
				<h1 class="page-title">Tags</h1>
				<p class="desc">目前共计 {{total}} 个标签</p>
			</div>
			<div class="main">
				<div class="tag-list">
					<tag class="tag-item" v-for="(tag, i) in tags" :key="i" :route="{name: 'tags-detail', params: {tag: tag.tagName}}">{{tag.tagName}}</tag>
				</div>
				<div class="tag-group">
					<transition-group name="tag-move" tag="div" :appear="false">
						<div class="tag-box" v-for="tag in currentTags" :key="tag.tagName">
							<h1 class="tag-title"><i class="icon icon-price-tag"></i><span class="tag-name">{{tag.tagName}}</span></h1>
							<ul class="posts" v-if="tag.posts && tag.posts.length">
								<router-link
									class="post"
									tag="li"
									v-for="(post, idx) in tag.posts"
									:key="idx"
									:to="{name: 'posts', params: {id: post.id}}">{{post.title}}</router-link>
							</ul>
						</div>
					</transition-group>
				</div>
			</div>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import Tag from '../components/tag.vue';
import { routerLock } from '../lib/util';
import { mapState } from 'vuex';
import store from '../store';
import '../styles/iconfont.css';

/* global TITLE, NProgress */

export default {
	pageTitle: `Tags | ${TITLE}`,
	data() {
		return {
			currentTag: ''
		};
	},
	computed: {
		currentTags() {
			if (!this.currentTag) {
				return this.tags;
			} else {
				return this.tags.filter(v => v.tagName === this.currentTag);
			}
		},
		total() {
			return this.tags.length;
		},
		...mapState(['tags'])
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		NProgress.start();
		if (to.name === 'tags-detail') {
			var tagName = to.params.tag;
		}
		store.dispatch('getAllTags')
			.then(() => next(vm => {
				vm.currentTag = tagName;
				NProgress.done();
			}));
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		NProgress.start();
		if (to.name === 'tags-detail') {
			var tagName = to.params.tag;
		}
		store.dispatch('getAllTags')
			.then(() => {
				this.currentTag = tagName;
				next();
				NProgress.done();
			});
	}),
	components: {
		PageLayout,
		Tag
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.title-map {
	height: 320px;
	background: url('./images/tags-title-nosprites.jpg') center/cover;
	overflow: auto;
}

.page-title {
	color: $tagPageTitleColor;
	text-align: center;
	margin-top: 80px;
	@include font(30);
}

.desc {
	color: $tagPageDescColor;
	text-align: center;
	margin-top: 40px;
	@include font(16);
}

.main {
	width: 700px;
	margin: 0 auto 40px;
}

.tag-list {
	margin-top: 40px;
	display: flex;
	flex-wrap: wrap;
}

.tag-item {
	margin: 10px;
}

.tag-group {
	margin-top: 50px;
}

.tag-move-enter-active, .tag-move-leave-active {
	transition: all 0.8s ease;
}

.tag-move-enter, .tag-move-leave-to {
	opacity: 0;
	transform: translate3d(-200px, 0, 0);
}

.tag-move-leave-to {
	opacity: 0;
	transform: translate3d(200px, 0, 0);
}

.tag-title {
	color: $tagPageTagTitleColor;
	margin: 80px auto 40px;
	display: flex;
	align-items: center;
	align-content: center;
	.icon {
		@include font(18);
	}
	.tag-name {
		margin-left: 15px;
		@include font(20);
	}
}

$lineWidth: 8px;
$lineLeft: 20px;
.posts {
	padding-left: $lineWidth + $lineLeft;
	position: relative;
	&::before {
		content: "";
		display: block;
		position: absolute;
		left: $lineLeft;
		width: $lineWidth;
		height: 100%;
		background: $tagPageUlLineColor;
	}
}

.post {
	color: $tagPageLiColor;
	line-height: 1.8em;
	padding: 20px 30px 20px 40px;
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
</style>

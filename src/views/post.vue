<template>
	<page-layout>
		<div class="post-page">
			<img class="title-map" :src="post.img" alt="title-map" v-if="post.img">
			<h1 class="title">{{post.title}}</h1>
			<div class="info">
				<div class="item">
					<i class="icon icon-calendar-o"></i>
					<span class="date">{{createdDate}}</span>
				</div>
				<div class="item">
					<i class="icon icon-eye"></i>
					<span class="views">{{post.views}} views</span>
				</div>
				<div class="item">
					<i class="icon icon-user"></i>
					<span class="author">{{post.author}}</span>
				</div>
			</div>
			<div class="post-content" v-html="post.content"></div>
			<p class="last-modified" v-if="lastModifiedDate">Last modified on {{lastModifiedDate}}.</p>
			<div class="tag-box">
				<div class="label">Tags:</div>
				<tag class="tag-pos" v-for="(tag, i) in post.tags" :route="{name: 'tags-detail', params: {tag}}" :key="i">{{tag}}</tag>
			</div>
			<div class="donate-bar" v-if="hasQrCode">
				<donate :alipay-qrcode="alipayQrCode" :wechat-pay-qrcode="wechatPayQrCode" :bitcoin-addr="bitcoinAddr" />
			</div>
			<div class="prev-next" v-if="hasPrevNext">
				<router-link class="prev" :to="{name: 'posts', params: {id: prev.id}}" v-if="prev">
					<i class="icon icon-keyboard_arrow_left"></i><span>previous</span>
				</router-link>
				<router-link class="next" :to="{name: 'posts', params: {id: next.id}}" v-if="next">
					<span>next</span><i class="icon icon-keyboard_arrow_right"></i>
				</router-link>
			</div>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import Donate from '../components/donate.vue';
import Tag from '../components/tag.vue';
import { routerLock, getDate } from '../lib/util';
import { mapState } from 'vuex';
import store from '../store';
import '../styles/post-content.css';
import '../styles/iconfont.css';

/* global TITLE, NProgress */

export default {
	data() {
		return {
			prev: null,
			next: null,
			alipayQrCode: null,
			wechatPayQrCode: null,
			bitcoinAddr: null
		};
	},
	props: {
		id: {
			required: true
		}
	},
	computed: {
		post() {
			return this.postsIdMap[this.id] || {};
		},
		createdDate() {
			return getDate(this.post.createdTime || Date.now());
		},
		lastModifiedDate() {
			if (this.post.modifiedTime) {
				return getDate(this.post.modifiedTime);
			} else {
				return null;
			}
		},
		hasQrCode() {
			return this.alipayQrCode || this.wechatPayQrCode || this.bitcoinAddr;
		},
		hasPrevNext() {
			return this.prev || this.next;
		},
		...mapState(['postsIdMap'])
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		const id = to.params.id;
		NProgress.start();
		// const p = store.dispatch('getPrevNextById', id);
		// const d = store.dispatch('getProfile');
		return store.dispatch('getPostById', id)
			.then(post => 
				next(vm => {
					document.title = `${post.title} | ${TITLE}`;
					// 本来下面两个请求应该可以是并行的, 不过考虑到这里已经有三个请求了,
					// 如果算上跨域协商, 最多可能有六个, 而且如果是刷新页面, 页面本身还有
					// 一个请求, 那就是七个, 超出了浏览器的单域名并发限制, 而如果这两个
					// 请求放上面, 大概率阻塞获取文章内容的请求, 所以还是先请求文章内容
					// 比较保险
					store.dispatch('getPrevNextById', id).then(({ prev, next }) => (vm.prev = prev, vm.next = next));
					store.dispatch('getProfile').then(({ alipayQrCode, wechatPayQrCode, bitcoinAddr }) => 
						(vm.alipayQrCode = alipayQrCode, vm.wechatPayQrCode = wechatPayQrCode, vm.bitcoinAddr = bitcoinAddr)
					);
					// Promise.all([
					// 	// webpackMode: "lazy-once" 好像Vue CLI里面的Webpack还不支持
					// 	import(
					// 		/* webpackChunkName: "vssue"*/
					// 		'vssue'
					// 	),
					// 	import(
					// 		/* webpackChunkName: "vssue"*/
					// 		'@vssue/api-github-v3'
					// 	),
					// 	import(
					// 		/* webpackChunkName: "vssue"*/
					// 		'vssue/dist/vssue.css'
					// 	)
					// ]).then(([Vssue, GithubV3]) => {
					// 	console.log(Vssue);
					// });
					NProgress.done();
				})
			);
	}),
	beforeRouteUpdate: routerLock(function (to, from, next) {
		this.prev = this.next = null;

		const id = to.params.id;
		NProgress.start();
		// const p = store.dispatch('getPrevNextById', id);
		return store.dispatch('getPostById', id)
			.then(post => {
				document.title = `${post.title} | ${TITLE}`;
				store.dispatch('getPrevNextById', id).then(({ prev, next }) => (this.prev = prev, this.next = next));
				store.dispatch('getProfile').then(({ alipayQrCode, wechatPayQrCode, bitcoinAddr }) => 
					(this.alipayQrCode = alipayQrCode, this.wechatPayQrCode = wechatPayQrCode, this.bitcoinAddr = bitcoinAddr)
				);
				next();
				NProgress.done();
			});
	}),
	components: {
		PageLayout,
		Donate,
		Tag
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.title-map {
	width: 100%;
	display: block;
}

.title {
	color: $postTitleColor;
	font-weight: normal;
	word-break: break-all;
	text-align: center;
	line-height: 1.4em;
	width: 580px;
	margin: 100px auto 0;
	@include font(22);
}

.info {
	margin: 40px auto 120px;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
}

.item {
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	&:nth-child(2) {
		margin: 0 15px;
	}
}

.icon {
	color: $postInfoIconColor;
	width: 1.5em;
	text-align: center;
	@include font(12);
}

.date, .views, .author {
	color: $postInfoColor;
	margin-left: 5px;
	@include font(12);
}

$contentWidth: 650px;
.post-content {
	width: $contentWidth;
	margin:  0 auto 100px;
}

.last-modified {
	color: $postLastModifiedColor;
	width: $contentWidth;
	margin: 30px auto;
	@include font(16);
}

.tag-box {
	display: flex;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
	width: $contentWidth;
	margin: 30px auto;
	@include font(16);
}

.label {
	color: $postTagColor;
	margin-right: 10px;
}

.tag-pos {
	margin: 10px;
}

.prev-next {
	width: $contentWidth + 40px;
	margin: 30px auto 40px;
	overflow: hidden;
}

.prev, .next {
	color: #7394a4;
	display: flex;
	align-items: center;
	align-content: center;
	padding: 20px 0;
	user-select: none;
	transition: color 0.3s ease;
	@include font(16);
	.icon {
		color: #7394a4;
		transition: color 0.3s ease;
		@include font(20);
	}
	&:active {
		color: #a2b4bc;
		.icon {
			color: #a2b4bc;
		}
	}
}

.prev {
	float: left;
}

.next {
	float: right;
}

.donate-bar {
	margin-top: 100px;
	text-align: center;
}
</style>



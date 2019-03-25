<template>
	<page-layout>
		<div class="friends-page">
			<div class="title-map"></div>
			<ul class="friends-links" v-if="friends.length">
				<li class="link" v-for="(friend, i) in friends" :key="i" @touchstart="go(friend.link)">
					<div class="avatar" :style="{'background-image': `url(${friend.avatar})`}"></div>
					<div class="info">
						<p class="name">{{friend.name}}</p>
						<p class="desc" v-if="friend.desc">{{friend.desc}}</p>
					</div>
				</li>
			</ul>
			<p class="none" v-else>欢迎各路大佬添加友链~</p>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';
import { routerLock } from '../lib/util';
import { mapState } from 'vuex';
import store from '../store';

/* global TITLE, NProgress */

export default {
	pageTitle: `Friends | ${TITLE}`,
	computed: {
		...mapState(['friends'])
	},
	methods: {
		go(link) {
			window.location.href = link;
		}
	},
	beforeRouteEnter: routerLock(function (to, from, next) {
		NProgress.start();
		return store.dispatch('getFriends')
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
	height: 500px;
	background: url('./images/friends-title-nosprites.jpg') center/cover;
	overflow: auto;
}

.friends-links {
	width: 680px;
	margin: 80px auto;
}

.link {
	border-radius: 15px;
	background: $friendsLinkBgColor;
	border: 3px solid $friendsLinkBorderColor;
	padding: 20px 30px;
	margin: 40px 0;
	box-shadow: 0 5px 20px $friendsLinkShadowColor;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	align-content: center;
	&:active {
		box-shadow: 0 5px 30px $friendsLinkActiveShadowColor;
	}
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 5px solid $friendsAvatarBorderColor;
	background-position: center;
	background-size: cover;
}

.info {
	margin-left: 20px;
	max-width: 460px;
	line-height: 1.6em;
}

.name {
	color: $friendsNameColor;
	@include font(20);
}

.desc {
	color: $friendsDescColor;
	margin-top: 15px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	@include font(14);
}

.none {
	color: $friendsNoneColor;
	margin-top: 200px;
	text-align: center;
	@include font(16);
}
</style>

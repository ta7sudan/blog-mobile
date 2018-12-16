<template>
	<div id="app">
		<transition name="page-fade" type="transition" :appear="false" @after-enter="showFooter=true">
			<keep-alive>
				<router-view />
			</keep-alive>
		</transition>
		<scroll-button class="scroll-btn-pos"></scroll-button>
		<tool-bar class="toolbar-z-level" @on-search="search" @on-menu="showMenu=true" @on-logo="goHome" />
		<menu-bar class="menubar-z-level"
			v-bind="config"
			:show.sync="showMenu"
			:toggle="toggleAvatar" />
		<footer-bar :show="showFooter" />
	</div>
</template>

<script>
/* global mainLoading */
import './styles/iconfont.css';
import './styles/logo-font.css';
import './styles/main.css';
import ToolBar from './components/tool-bar.vue';
import MenuBar from './components/menu-bar.vue';
// footer也可以放在页面中, 其实带来的麻烦会小一些
import FooterBar from './components/footer-bar.vue';
import ScrollButton from './components/scroll-button.vue';
import config from './config';

export default {
	data() {
		return {
			config,
			showMenu: false,
			showFooter: false,
			toggleAvatar: false
		};
	},
	methods: {
		search(content) {
			alert('todo');
		},
		goHome() {
			this.$router.push('/');
		}
	},
	components: {
		ToolBar,
		MenuBar,
		FooterBar,
		ScrollButton
	}
};
</script>


<style lang="postcss" scoped>
.page-fade-enter {
	opacity: 0.3;
	transform: translate3d(-100%, 0, 0);
}
.page-fade-leave-to {
	opacity: 0.3;
	transform: translate3d(100%, 0, 0);
}
.page-fade-enter-active, .page-fade-leave-active {
	/* absolute避免跳动, 否则的话就需要out-in */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	transition: all 0.4s linear;
}

.toolbar-z-level {
	z-index: 100;
}

.menubar-z-level {
	z-index: 200;
}

.scroll-btn-pos {
	position: fixed;
	bottom: 70px;
	right: 50px;
	z-index: 100;
}
</style>

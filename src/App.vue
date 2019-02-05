<template>
	<div id="app">
		<transition name="page-fade" type="transition" :appear="false">
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
	</div>
</template>

<script>
/* global mainLoading */
import './styles/iconfont.css';
import './styles/logo-font.css';
import './styles/main.css';
import ToolBar from './components/tool-bar.vue';
import MenuBar from './components/menu-bar.vue';
import ScrollButton from './components/scroll-button.vue';
import config from './config';

export default {
	data() {
		return {
			config,
			showMenu: false,
			toggleAvatar: false
		};
	},
	watch: {
		'$route'(to, from) {
			this.toggleAvatar = to.name === 'about';
		}
	},
	methods: {
		search(content) {
			this.$router.push({
				name: 'search',
				query: {
					query: content
				}
			});
		},
		goHome() {
			this.$router.push('/');
		}
	},
	components: {
		ToolBar,
		MenuBar,
		ScrollButton
	}
};
</script>


<style lang="postcss" scoped>
@import './styles/size.css';

.page-fade-enter {
	/* opacity: 0.3; */
	transform: translate3d(-100%, 0, 0);
}
.page-fade-leave-to {
	/* opacity: 0.3; */
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
	bottom: 100px;
	right: 80px;
	z-index: 100;
}
</style>

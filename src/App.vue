<template>
	<div id="app">
		<router-view />
		<tool-bar class="toolbar-z-level" @on-search="search" @on-menu="menu" @on-logo="goHome" />
		<side-bar class="sidebar-z-level" :show.sync="showSideBar" />
	</div>
</template>

<script>
/* global mainLoading */
import './styles/iconfont.css';
import './styles/main.css';
import loadSentry from './lib/load-sentry';
import ToolBar from './components/tool-bar.vue';
import SideBar from './components/side-bar.vue';

export default {
	data() {
		return {
			showSideBar: false
		};
	},
	mounted() {
		// 确保子组件渲染完
		this.$nextTick(() => {
			mainLoading.stop();
			loadSentry();
		});
	},
	methods: {
		search(content) {
			alert('todo');
		},
		menu() {
			this.showSideBar = true;
		},
		goHome() {
			this.$router.push({
				name: 'home'
			});
		}
	},
	components: {
		ToolBar,
		SideBar
	}
};
</script>


<style lang="postcss" scoped>
@import './styles/font-size.css';

.toolbar-z-level {
	z-index: 100;
}

.sidebar-z-level {
	z-index: 200;
}
</style>

<template>
	<div id="app">
		<transition name="page-fade" type="transition" :appear="false" @after-enter="afterEnter">
			<keep-alive>
				<router-view />
			</keep-alive>
		</transition>
		<scroll-button class="scroll-btn-pos"></scroll-button>
		<tool-bar class="toolbar-z-level" @on-search="search" @on-menu="showMenu" @on-logo="goHome" />
		<menu-bar class="menubar-z-level"
			v-bind="config"
			:show="menuShow"
			:toggle="toggleAvatar"
			@on-hide="hideMenu" />
		<footer-bar />
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
import { p } from './lib/util';

function createMap(routes, map) {
	routes.forEach(route => {
		if (Array.isArray(route.children)) {
			createMap(route.children, map);
		} else {
			map[route.name] = true;
		}
	});
	return map;
}

export default {
	data() {
		return {
			config,
			menuShow: false,
			nameMap: null,
			toggleAvatar: false,
			// showFooter: true,
			firstIn: true
		};
	},
	methods: {
		afterEnter() {
			// 确保URL幂等
			if (p(this.$route).name('').includes('-menu')) {
				// 讲道理应该不会有人手这么快去点工具栏再点关闭菜单栏的...
				// 就不用考虑这种情况取消timer了
				// this.showFooter = false;
				setTimeout(() => this.menuShow = true, 400);
			}
		},
		hasRoute(name) {
			if (!this.nameMap) {
				this.nameMap = {};
				// 私有API, 不过没办法, 谁让不能获取到vue router本身的nameMap呢,
				// 而router.match()和router.resolve()则不管路由是否存在都会返回对象,
				// 也不能用来判断指定name的路由是否存在, 只能自己来搞了
				this.nameMap = createMap(this.$router.options.routes, {});
			}
			return this.nameMap[name];
		},
		search(content) {
			alert('todo');
		},
		showMenu() {
			const routeName = `${this.$route.name}-menu`;
			if (this.hasRoute(routeName)) {
				this.$router.push({name: routeName});
			}
		},
		hideMenu() {
			if (p(this.$route).name('').includes('-menu')) {
				this.$router.go(-1);
			}
		},
		goHome() {
			this.$router.push({
				name: 'home'
			});
		}
	},
	watch: {
		// 将菜单栏的显示状态修改集中在路由变更,
		// 以便和路由同步, 这也是为什么不用.sync,
		// 菜单栏和路由同步的好处是返回键可以用来关闭菜单,
		// 带来的缺点是路由配置最多要增加一倍,
		// 还有个缺点是走到一个不认识的路由就会导致点击工具栏
		// 无法打开菜单栏
		// 为什么这里不用named route而要用nested route?
		// 尽管URL是表示状态的, 子路由和父路由在表示状态这一层面上
		// 是同级的关系, 但是在交互上来说考虑前进后退, 还是有父子关系
		// 的. 用named route的话, 如果又存在子路由, 会导致配置对象
		// 急剧膨胀, 而另一方面过渡动画又需要套在router-view上, 因为
		// 组件的切换从原本由组件自身控制变成了由router-view控制,
		// 这样的话又要改组件, 我个人是倾向于组件的显示切换由组件自身管理
		$route(to, from) {
			// 如果是第一次加载页面, 就等页面动画结束之后再触发
			// menu的动画, 免得卡顿
			if (this.firstIn) {
				this.firstIn = false;
				return;
			}
			this.menuShow = !!p(to).name('').includes('-menu');
			// 为了防止菜单栏出现导致body包含块提升显示footer,
			// 只能在这里在menu出来之前把footer隐藏掉, 但是还
			// 有一种情况是footer本来就在视口中
			// this.showFooter = !this.menuShow;
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
	transition: all 0.4s ease;
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

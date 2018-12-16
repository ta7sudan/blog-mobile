<template>
	<transition name="menubar-fade" type="transition" @enter="enter">
		<div class="menu-bar-container" v-show="show" @click.self="hide">
			<!-- 不用.self在这里用@click.stop也可以, 而且有时候必须用.stop, 不过这里.self更简单 -->
			<div class="menu-bar">
				<div class="frame">
					<transition name="frame" mode="out-in" type="animation">
						<keep-alive>
							<component class="frame-container" :is="frame" :content="cube" />
						</keep-alive>
					</transition>
				</div>
				<p ref="desc" class="desc">{{desc}}</p>
				<menu-list class="menu-list-pos" :menu="menu" />
				<sns-bar :sns="sns" class="sns-pos" />
			</div>
		</div>
	</transition>
</template>

<script>
import { once } from '../lib/util';
import Avatar from './avatar.vue';
import Cube from './cube.vue';
import SnsBar from './sns-bar.vue';
import MenuList from './menu-list.vue';

export default {
	data() {
		return {
			handler: e => e.preventDefault(),
			lastPos: 0
		};
	},
	props: {
		cube: Array,
		sns: Array,
		show: {
			type: Boolean,
			default: false
		},
		toggle: {
			type: Boolean,
			default: true
		},
		menu: {
			type: Array,
			required: true
		},
		desc: {
			type: String,
			required: true
		}
	},
	computed: {
		frame() {
			return this.toggle ? 'Cube' : 'Avatar';
		}
	},
	methods: {
		hide() {
			this.$emit('update:show', false);
		},
		enter: once(function (el, done) {
			// 这里根据CSS中desc字体大小12px, line-height为1.4em, 结合dpr算了下有几行
			const lines = Math.round(this.$refs.desc.clientHeight / (12 * 1.5 * devicePixelRatio));
			if (lines > 1) {
				// 反正之前要拿ref来计算, 这里就自己手动加下class好了
				this.$refs.desc.classList.add('multi-line');
			}
			done();
		})
	},
	created() {
		// 如果点击链接跳转了, 就让它直接消失, 不要过渡
		// 省得和页面过渡一起触发导致动画卡顿
		this.$router.afterEach(() => {
			if (this.show) {
				this.$el.style.display = 'none';
				this.hide();
			}
		});
	},
	updated() {
		document.body.style.overflow = this.show ? 'hidden' : 'visible';
		// const body = document.body;
		// if (this.show) {
		// 	this.lastPos = scrollY();
		// 	body.style.top = `${-this.lastPos}px`;
		// 	body.classList.add('hold-body');
		// } else {
		// 	body.classList.remove('hold-body');
		// 	body.style.top = '';
		// 	// 这个方案总的来说比较完美, 但是有两个小问题,
		// 	// 一个是body fixed带来的副作用, 将body提升了包含块,
		// 	// 并且这个包含块是可见视口, 导致menu出现的时候底栏也
		// 	// 跟着出现, 另一个问题是这里有个谜之bug, 在滚动结束
		// 	/// 以后, 不知道会被谁又滚动到最底部, 确认不是vue router,
		// 	// 然而hook了document.documentElement.scrollTop和
		// 	// window.scrollTo, 也没发现c除了vue router和我自己之外
		// 	// 有谁改过这两个, 然而还是会滚动到最底部, 只能用这样比
		// 	// 较恶心的方式处理下, 好在不会出现肉眼可见的页面闪烁
		// 	setTimeout(() => scrollY(this.lastPos));
		// }
	},
	components: {
		Avatar,
		Cube,
		SnsBar,
		MenuList
	}
};
</script>

<style>
.hold-body {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 0;
}
</style>


<style lang="postcss" scoped>
@import '../styles/theme-light.css';
@import '../styles/font-size.css';

.menu-bar-container {
	background: $menuBarModalColor;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transition: all 0.4s ease;
	& > .menu-bar {
		width: 450px;
		background: $menuBarBgColor;
		box-shadow: 0 0 15px $menuBarShadowColor;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		transition: all 0.4s ease;
	}
}

.menubar-fade-enter, .menubar-fade-leave-active {
	background: $menuBarModalEnterColor;
	& > .menu-bar {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
}

.frame {
	width: 250px;
	height: 250px;
	margin: 50px auto 0;
}

.frame-enter-active {
	animation: pop 0.4s ease both;
}

.frame-leave-active {
	animation: pop 0.4s ease reverse both;
}

@keyframes pop {
	0% {
		transform: scale(0);
	}
	75% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

.desc {
	color: $menuDescColor;
	text-align: center;
	line-height: 1.5em;
	width: 70%;
	margin: 20px auto 0;
	@include font(12);
}

.multi-line {
	text-align: justify;
}

.sns-pos {
	position: absolute;
	bottom: 10px;
}

.menu-list-pos {
	margin: 50px 60px 0;
}
</style>



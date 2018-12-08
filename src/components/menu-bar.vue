<template>
	<transition name="menubar-fade" type="transition" @enter="enter">
		<div class="menu-bar-container" v-show="show" @click.self="hide">
			<!-- 不用.self在这里用@click.stop也可以, 而且有时候必须用.stop, 不过这里.self更简单 -->
			<div class="menu-bar">
				<div class="frame">
					<transition name="frame" mode="out-in" type="animation">
						<keep-alive>
							<component class="frame-container" :is="frame" :content="content" />
						</keep-alive>
					</transition>
				</div>
				<p ref="desc" class="desc">{{desc}}</p>
			</div>
		</div>
	</transition>
</template>

<script>
import { scrollY, once } from '../lib/util';
import Avatar from './avatar.vue';
import Cube from './cube.vue';

export default {
	data() {
		return {
			handler: e => e.preventDefault(),
			lastPos: 0
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		toggle: {
			type: Boolean,
			default: true
		},
		content: {
			type: Array
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
			this.$emit('on-hide');
		},
		enter: once(function (el, done) {
			// 这里根据CSS中desc字体大小12px, line-height为1.4em, 结合dpr算了下有几行
			const lines = Math.round(this.$refs.desc.clientHeight / (12 * 1.5 * devicePixelRatio));
			if (lines > 1) {
				this.$refs.desc.classList.add('multi-line');
			}
			done();
		})
	},
	updated() {
		const body = document.body;
		if (this.show) {
			this.lastPos = scrollY();
			body.style.top = `${-this.lastPos}px`;
			body.classList.add('hold-body');
		} else {
			body.classList.remove('hold-body');
			body.style.top = '';
			scrollY(this.lastPos);
		}
	},
	components: {
		Avatar,
		Cube
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
	background: rgba(#000, 0.2);
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transition: all 0.4s ease;
	& > .menu-bar {
		width: 450px;
		background: $menuBarBgColor;
		box-shadow: 0 0 15px rgba(#000, 0.4);
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		transition: all 0.4s ease;
	}
}

.menubar-fade-enter, .menubar-fade-leave-active {
	background: rgba(#000, 0);
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
	color: #34495e;
	text-align: center;
	line-height: 1.5em;
	width: 70%;
	margin: 20px auto 0;
	@include font(12);
}

.multi-line {
	text-align: justify;
}
</style>



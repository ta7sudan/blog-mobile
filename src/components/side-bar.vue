<template>
	<transition name="sidebar-fade" type="transition">
		<div class="side-bar-container" v-show="show" @click.self="$emit('update:show', false)">
			<!-- 不用.self在这里用@click.stop也可以, 而且有时候必须用.stop, 不过这里.self更简单 -->
			<div class="side-bar">
				<div class="frame">
					<transition name="frame" mode="out-in" type="transition">
						<keep-alive>
							<component class="frame-container" :is="frame" />
						</keep-alive>
					</transition>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { scrollY } from '../lib/util';
import Avatar from './avatar.vue';
import Cube from './cube.vue';

export default {
	data() {
		return {
			handler: e => e.preventDefault(),
			lastPos: 0,
			frame: 'Avatar'
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
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

.side-bar-container {
	background: rgba(#000, 0.2);
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transition: all 0.4s ease;
	& > .side-bar {
		width: 450px;
		background: $sideBarBgColor;
		box-shadow: 0 0 15px rgba(#000, 0.4);
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		transition: all 0.4s ease;
	}
}

.sidebar-fade-enter, .sidebar-fade-leave-active {
	background: rgba(#000, 0);
	& > .side-bar {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
}

.frame {
	width: 250px;
	height: 250px;
	margin: 50px auto 0;
}

.frame-container {
	transition: transform 0.4s ease;
}

.frame-enter, .frame-leave-active {
	transform: scale3d(0, 0, 0);
}
</style>



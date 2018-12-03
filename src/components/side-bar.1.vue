<template>
	<!-- <transition name="sidebar-fade" type="transition"> -->
		<div class="sidebar-fade-enter"
			@click="$emit('update:show', false)"
			@transitionend="hide">
			<div class="side-bar" @click.stop>aaa</div>
		</div>
	<!-- </transition> -->
</template>

<script>
import { scrollY, rAF } from '../lib/util';

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
		}
	},
	methods: {
		hide() {
			if (!this.show) {
				this.$el.style.display = 'none';
			}
		}
	},
	watch: {
		show(newVal, oldVal) {
			const body = document.body;
			if (newVal) {
				this.lastPos = scrollY();
				body.style.top = `${-this.lastPos}px`;
				body.classList.add('hold-body');
				this.$el.style.display = 'block';
				rAF(() => this.$el.classList.add('side-bar-container'));
			} else {
				this.$el.classList.remove('side-bar-container');
				body.classList.remove('hold-body');
				body.style.top = '';
				scrollY(this.lastPos);
			}
		}
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
.sidebar-fade-enter, .sidebar-fade-leave-active {
	display: none;
	background: rgba(#000, 0);
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transition: all 0.4s ease;
	& > .side-bar {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
		width: 450px;
		background: #f9f9f9;
		box-shadow: 0 0 15px rgba(#000, 0.3);
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		transition: all 0.4s ease;
	}
}

.side-bar-container {
	background: rgba(#000, 0.2);
	& > .side-bar {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}
</style>



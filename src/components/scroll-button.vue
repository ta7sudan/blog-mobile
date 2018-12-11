<template>
	<div
		class="scroll-button"
		:class="{'scroll-button-show': show}"
		@transitionend="hide"
		@click="scrollToTop">
		<i class="icon-vertical_align_top"></i>
	</div>
</template>

<script>
import { animate, scrollY, throttle, rAF } from '../lib/util';
export default {
	data() {
		return {
			show: false
		};
	},
	props: {
		offset: {
			type: Number,
			default: 800
		}
	},
	methods: {
		hide() {
			if (!this.show) {
				this.$el.style.display = 'none';
			}
		},
		scrollToTop() {
			try {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			} catch (e) {
				animate({
					startPos: scrollY(),
					endPos: 0,
					duration: 800,
					setValue: scrollY,
					easing: 'easeIn'
				});
			}
		}
	},
	beforeMount() {
		const scrollListener = throttle(function () {
			const curPos = scrollY();
			if (curPos > this.offset && !this.show) {
				this.$el.style.display = 'flex';
				// 讲道理vue内部更新队列已经是异步了,
				// 这里没必要两层rAF确保一帧, 还是说
				// 对于class是同步更新的?
				rAF(() => rAF(() => this.show = true));
			} else if (curPos <= this.offset && this.show) {
				this.show = false;
			}
		}, 100, this);
		window.addEventListener('scroll', scrollListener, {
			passive: true
		});
		this.$once('hook:destroyed', () => window.removeEventListener('scroll', scrollListener, { passive: true }));
	}
};
</script>


<style lang="postcss" scoped>
.scroll-button {
	width: 90px;
	height: 90px;
	box-sizing: border-box;
	border: 4px solid #785471;
	border-radius: 50%;
	background: #f9f9f9;
	box-shadow: 0 5px 20px rgba(#785471, 0.3);
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	transform: scale(0);
	transition: all 0.3s ease;
	i {
		color: #785471;
		font-size: 6vw;
		transition: all 0.3s ease;
	}
	&:active {
		background: #785471;
		box-shadow: 0 5px 30px rgba(#785471, 0.6);
		i {
			color: #fff;
		}
	}
}

.scroll-button-show {
	transform: scale(1);
}

</style>

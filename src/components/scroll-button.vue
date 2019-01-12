<template>
	<div
		class="scroll-button"
		:class="{'scroll-button-show': show}"
		@transitionend="hide"
		@click="scrollToTop">
		<i class="icon-keyboard_arrow_up"></i>
	</div>
</template>

<script>
import { animate, scrollY, throttle, rAF } from '../lib/util';
import '../styles/iconfont.css';

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
@import '../styles/theme-light.css';
.scroll-button {
	width: 90px;
	height: 90px;
	box-sizing: border-box;
	border: 4px solid $scrollTopBtnColor;
	border-radius: 50%;
	background: $scrollTopBtnBgColor;
	box-shadow: 0 5px 20px $scrollTopBtnShadowColor;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	transform: scale(0);
	transition: all 0.3s ease;
	i {
		color: $scrollTopBtnColor;
		font-size: 8vw;
		transition: all 0.3s ease;
	}
	&:active {
		background: $scrollTopBtnColor;
		box-shadow: 0 5px 30px $scrollTopBtnShadowActiveColor;
		i {
			color: $scrollTopBtnIconActiveColor;
		}
	}
}

.scroll-button-show {
	transform: scale(1);
}

</style>

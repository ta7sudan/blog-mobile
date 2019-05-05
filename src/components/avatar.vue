<template>
	<div class="avatar-container">
		<div class="avatar-main" @touchstart="rotate=true">
			<img class="avatar" :class="{rotate}" src="./images/avatar.png" alt="avatar" @transitionend="revert">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			rotate: false
		};
	},
	methods: {
		revert() {
			if (this.rotate) {
				setTimeout(() => this.rotate = false, 1200);
			}
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/theme-light.css';
.avatar-container {
	width: 100%;
	padding-bottom: 100%;
	position: relative;
}

.avatar-main {
	width: 90%;
	height: 90%;
	margin: auto;
	border-radius: 50%;
	overflow: hidden;
	/* 以下两个都可以解决transform的子元素溢出overflow: hidden的父元素的问题, 但是opacity更好一点, 前者会导致box-shadow失效 */
	/* -webkit-mask-image: -webkit-radial-gradient(white, black); */
	opacity: 0.99;
	box-shadow: 0 5px 20px 5px $avatarShadowColor;
	border-width: 8px;
	border-style: solid;
	border-color: $avatarBorderColor;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.rotate {
	/* 谁能想到傻屌iOS的rotate3d必须配合pespective使用 */
	/* transform: rotate3d(0, 0, 1, 400deg); */
	transform: rotate(400deg);
	will-change: transform;
}

.avatar {
	width: 100%;
	transition: transform 0.8s ease;
}

</style>



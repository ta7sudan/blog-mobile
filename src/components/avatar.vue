<template>
	<div class="avatar-container">
		<div class="avatar-main" @click="rotate=true">
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
	transform: rotate3d(0, 0, 1, 400deg);
}

.avatar {
	width: 100%;
	transition: transform 0.8s ease;
}

</style>



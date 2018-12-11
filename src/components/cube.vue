<template>
	<div class="cube-container">
		<div class="cube" :class="{colorized}" @click="hideColor">
			<div class="face" :class="`face-${i}`" v-for="i in 5" :key="i">{{content[i]}}</div>
		</div>
		<div class="cube-shadow"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			colorized: true,
			timer: null
		};
	},
	props: {
		content: {
			type: Array,
			default() {
				return Array.from({length: 6}, () => '');
			}
		}
	},
	methods: {
		hideColor() {
			this.colorized = false;
			if (!this.timer) {
				this.timer = setTimeout(() => (this.colorized = true, this.timer = null), 4000);
			}
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

$eyeDistance: 300px;
$cubeSize: 100px;
$cubeBorderWidth: 5px;

.cube-container {
	width: 100%;
	padding-bottom: 100%;
	position: relative;
}

.cube-shadow {
	width: 120px;
	height: 10px;
	margin: auto;
	border-radius: 50%;
	background: transparent;
	box-shadow: 0 -30px 10px $cubeShadowColor0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: -20px;
	animation: shadow-beat 2s ease infinite alternate;
}

@keyframes shadow-beat {
	0% {
		box-shadow: 0 -30px 30px $cubeShadowColor0;
	}
	100% {
		box-shadow: 0 -30px 30px $cubeShadowColor1;
		transform: scale3d(1.1, 1.1, 0);
	}
}

.cube {
	width: $cubeSize;
	height: $cubeSize;
	margin: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	animation: cube-spin 6s linear infinite;
	transform: perspective($eyeDistance) rotate3d(1, 1, 1, 0deg);
	transform-style: preserve-3d;
}

@keyframes cube-spin {
	0% {
		transform: perspective($eyeDistance) rotate3d(1, 1, 1, 0deg);
	}
	33% {
		transform: perspective($eyeDistance) rotate3d(1, 1, 1, 220deg);
	}
	66% {
		transform: perspective($eyeDistance) rotate3d(1, -1, -1, 540deg);
	}
	100% {
		transform: perspective($eyeDistance) rotate3d(1, 1, 1, 720deg);
	}
}

.face {
	color: $cubeFontColor;
	line-height: $cubeSize - 2 * $cubeBorderWidth;
	text-align: center;
	box-sizing: border-box;
	border: $cubeBorderWidth solid $cubeBorderColor;
	transition: all 2s ease;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	@include font(20);
}

.face-0 {
	transform: translate3d(0, 0, -$cubeSize/2);
}

.face-1 {
	transform: translate3d(0, 0, $cubeSize/2);
}

.face-2 {
	transform: rotate3d(0, 1, 0, 90deg) translate3d(0, 0, -$cubeSize/2);
}

.face-3 {
	transform: rotate3d(0, 1, 0, 90deg) translate3d(0, 0, $cubeSize/2);
}

.face-4 {
	transform: rotate3d(1, 0, 0, 90deg) translate3d(0, 0, $cubeSize/2);
}

.face-5 {
	transform: rotate3d(1, 0, 0, 90deg) translate3d(0, 0, -$cubeSize/2);
}

.colorized {
	@each $color $i in $cubeColorMap {
		.face-$i {
			background: rgba($color, 0.5);
		}
	}
}

</style>

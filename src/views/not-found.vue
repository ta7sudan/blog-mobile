<template>
	<page-layout>
		<div class="notfound-page">
			<img src="./images/notfound-nosprites.jpg" alt="notfound" class="title-map">
			<p class="error-msg">Info: {{errorMessage}}</p>
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';

export default {
	props: {
		errorMessage: {
			type: String,
			default: '请求的资源未找到~'
		}
	},
	components: {
		PageLayout
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.title-map {
	width: 100%;
	margin-top: 80px;
	display: block;
}

.error-msg {
	color: $errorMsgColor;
	margin-top: 30px;
	text-align: center;
	@include font(16);
}
</style>


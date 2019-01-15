<template>
	<page-layout>
		<div class="error-page">
			<img src="./images/error-nosprites.png" alt="error" class="title-map">
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
			default: '未知错误~'
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
	display: block;
	width: 400px;
	margin: 200px auto 0;
}

.error-msg {
	color: $errorMsgColor;
	margin-top: 50px;
	text-align: center;
	@include font(16);
}
</style>

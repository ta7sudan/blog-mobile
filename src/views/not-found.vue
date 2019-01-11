<template>
	<page-layout>
		<div class="notfound-page">
			{{errorMessage}}
		</div>
	</page-layout>
</template>

<script>
import PageLayout from '../components/page-layout.vue';

export default {
	props: {
		errorMessage: {
			type: String,
			default: '请求的资源未找到'
		}
	},
	components: {
		PageLayout
	}
};
</script>


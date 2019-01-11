<template>
	<page-layout>
		<div class="error-page">
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
			default: '未知错误'
		}
	},
	components: {
		PageLayout
	}
};
</script>


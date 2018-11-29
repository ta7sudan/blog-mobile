<template>
	<div>{{errorMessage}}</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			type: String,
			default: '未知错误'
		}
	}
};
</script>


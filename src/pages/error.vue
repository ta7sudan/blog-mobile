<template>
	<div>{{errorMessage}}</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			default: '未知错误'
		}
	}
};
</script>


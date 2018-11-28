<template>
	<div>{{errorMessage}}</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			default: '请求的资源未找到'
		}
	}
};
</script>


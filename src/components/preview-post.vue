<template>
	<article class="preview-post">
		<h1 class="title">几种展开动画</h1>
		<div class="info">
			<div class="item">
				<i class="icon icon-calendar-o"></i>
				<span class="date">2018/12/03</span>
			</div>
			<div class="item">
				<i class="icon icon-eye"></i>
				<span class="views">65535 views</span>
			</div>
			<div class="item">
				<i class="icon icon-user"></i>
				<span class="author">ta7sudan</span>
			</div>
		</div>
		<div class="title-map"></div>
		<div class="post-content">测试测试</div>
	</article>
</template>

<script>
export default {
	props: {
		post: Object
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
.preview-post {
	margin: 0 40px 60px;
	padding-top: 40px;
	background: #fff;
}
.title {
	color: #000;
	text-align: center;
	line-height: 1.4em;
	width: 580px;
	margin: auto;
	@include font(20);
	&:active {
		color: #555;
	}
}

.info {
	margin: 20px auto 50px;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
}

.item {
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	&:nth-child(2) {
		margin: 0 15px;
	}
}

.icon {
	color: #555;
	width: 1.5em;
	text-align: center;
	@include font(12);
}

.date, .views, .author {
	color: #999;
	margin-left: 5px;
	@include font(12);
}

.title-map {
	height: 400px;
	background: red;
	border-radius: 8px;
	margin-bottom: 30px;
}

.post-content {
	color: #212721;
	@include font(14);
}

</style>



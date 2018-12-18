<template>
	<article class="preview-post">
		<h1 class="title">{{title}}</h1>
		<div class="info">
			<div class="item">
				<i class="icon icon-calendar-o"></i>
				<span class="date">{{date}}</span>
			</div>
			<div class="item">
				<i class="icon icon-eye"></i>
				<span class="views">{{views}} views</span>
			</div>
			<div class="item">
				<i class="icon icon-user"></i>
				<span class="author">{{author}}</span>
			</div>
		</div>
		<div class="title-map"></div>
		<div class="post-content" v-html="trimedHtml"></div>
		<!-- <div class="content-wrap">
			<div class="post-content">
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
				test test test test test test test test test test test testc
			</div>
		</div> -->
	</article>
</template>

<script>
import '../styles/post-content.css';

export default {
	props: {
		img: String,
		title: {
			type: String,
			required: true
		},
		views: {
			type: Number,
			required: true
		},
		createdTime: {
			type: Number,
			required: true
		},
		trimedHtml: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		route: {
			default: '/'
		}
	},
	computed: {
		date() {
			const date = new Date(this.createdTime),
				year = date.getFullYear(),
				month = date.getUTCMonth() + 1,
				day = date.getUTCDate();
			return `${year}/${month}/${day}`;
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
.preview-post {
	margin: 0 40px;
	padding: 70px 0 140px 0;
	background: #fff;
	position: relative;
	&::after {
		content: "";
		display: block;
		width: 80px;
		height: 3px;
		border-radius: 50%;
		background: #a2b4bc;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	&:last-child::after {
		display: none;
	}
}
.title {
	color: #000;
	word-break: break-all;
	text-align: center;
	line-height: 1.4em;
	width: 580px;
	margin: auto;
	@include font(20);
	transition: color 0.3s ease;
	&:active {
		color: #555;
	}
}

.info {
	margin: 30px auto 60px;
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
</style>



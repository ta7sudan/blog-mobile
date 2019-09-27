<script>
import { getDate } from '../lib/util';
import '../styles/post-content.css';
import '../styles/iconfont.css';

export default ({ props: {
	id,
	img,
	title,
	views,
	createdTime,
	trimedHtml,
	author
} }) => (
	<article class="preview-post">
		<RouterLink class="title" tag="h1" to={{name: 'posts', params: { id }}}>{title}</RouterLink>
		<div class="info">
			<div class="item">
				<i class="icon icon-calendar-o"></i>
				<span class="date">{getDate(createdTime)}</span>
			</div>
			<div class="item">
				<i class="icon icon-eye"></i>
				<span class="views">{views} views</span>
			</div>
			<div class="item">
				<i class="icon icon-user"></i>
				<span class="author">{author}</span>
			</div>
		</div>
		{
			img ?
				<div class="title-map" style={{background: `url(${img}) center/cover`}}></div> :
				null
		}
		<div class="post-content" domPropsInnerHTML={trimedHtml}></div>
		<RouterLink class="read-more" tag="div" to={{name: 'posts', params: { id }}}>Read more »</RouterLink>
	</article>
);
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.preview-post {
	margin: 0 40px;
	padding: 70px 0 140px 0;
	background: $previewBgColor;
	position: relative;
	&::after {
		content: "";
		display: block;
		width: 80px;
		height: 3px;
		border-radius: 3px;
		background: $previewEndLineColor;
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
	color: $previewTitleColor;
	word-break: break-all;
	text-align: center;
	line-height: 1.4em;
	width: 580px;
	margin: auto;
	@include font(20);
	transition: color 0.3s ease;
	&:active {
		color: $previewTitleActiveColor;
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
	color: $previewIconColor;
	width: 1.5em;
	text-align: center;
	@include font(12);
}

.date, .views, .author {
	color: $previewInfoColor;
	margin-left: 5px;
	@include font(12);
}

.title-map {
	height: 400px;
	border-radius: 8px;
	margin-bottom: 30px;
}

.read-more {
	color: $previewReadMoreColor;
	width: 6em;
	margin-top: 50px;
	padding: 20px 0;
	line-height: 1.5em;
	user-select: none;
	position: relative;
	@include font(12);
	&:active {
		color: $previewReadMoreActiveColor;
		&::after {
			background: $previewReadMoreActiveColor;
		}
	}
	&::after {
		content: "";
		display: block;
		height: 3px;
		position: absolute;
		left: 0;
		right: 0;
		background: $previewReadMoreColor;
	}
}
</style>



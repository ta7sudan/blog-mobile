<script>
import '../styles/iconfont.css';

export default {
	functional: true,
	props: {
		sns: {
			type: Array,
			required: true
		}
	},
	render(h, context) {
		return (
			<ul class={['sns-bar', context.data.staticClass]}>
				{context.props.sns.map(({icon, url}) =>
					<li><a href={url}><i class={`icon-${icon}`}></i></a></li>
				)}
			</ul>
		);
	}
};
</script>

<style lang="postcss">
@import '../styles/theme-light.css';
.sns-bar {
	width: 100%;
	text-align: center;
	& > li {
		display: inline-block;
		padding: 15px;
		&:active {
			i {
				color: $snsIconActiveColor;
			}
		}
	}
	i {
		color: $snsIconColor;
		font-size: 5vw;
	}
}
</style>



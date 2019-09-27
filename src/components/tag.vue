<script>
export default ({ props, data: { staticClass }, children }) => (
	<RouterLink class={['tag', staticClass]} active-class="active-tag" tag="div" to={props.route} exact>
		{children}
	</RouterLink>
);
</script>


<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.tag {
	display: inline-block;
	color: $tagColor;
	padding: 15px 25px;
	background: $tagBgColor;
	border-radius: 30px;
	border: 3px solid $tagBorderColor;
	user-select: none;
	transition: all 0.3s ease;
	@include font(14);
	&:active {
		background: $tagBgHoverColor;
		border-color: $tagBorderHoverColor;
		transform: rotate3d(0, 0, 1, 15deg);
	}
}

.active-tag {
	color: #fff;
	background: $tagBorderColor;
	&:active {
		color: $tagColor;
	}
}
</style>


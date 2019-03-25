<script>
import FooterBar from './footer-bar.vue';

export default {
	functional: true,
	props: {
		hasFooterbar: {
			type: Boolean,
			default: true
		}
	},
	render(h, context) {
		return (
			<div class="page-layout">
				{context.children}
				<FooterBar show={context.props.hasFooterbar} />
			</div>
		);
	}
};
</script>


<style lang="postcss" scoped>
@import '../styles/size.css';

.page-layout {
	min-height: 100vh;
	padding-bottom: 200px;
	padding-top: $toolBarHeight;
	box-sizing: border-box;
	/* 为了页面切换动画更流畅 */
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
}

</style>

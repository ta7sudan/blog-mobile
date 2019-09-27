<script>
export default ({ props: { show = false }, data: { attrs } }) => (
	<footer class='footer-bar' v-show={show} {...attrs}>
		<p class='copyright'>Copyright © 2019 <span>ta7sudan</span>. All rights reserved.</p>
		<p class='poweredby'>Powered by Vuejs.</p>
		<p class='license'><a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></p>
	</footer>
);
</script>


<style lang="postcss">
@import '../styles/theme-light.css';
@import '../styles/font-size.css';

.footer-bar {
	color: $footerFontColor;
	text-align: center;
	line-height: 1.5em;
	background: $footerBgColor;
	border-top: 1px solid $footerBorderColor;
	padding: 20px 0;
	@include font(14);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
}

.copyright {
	span {
		color: $footerLinkColor;
	}
}

.license {
	color: $footerLinkColor;
	& > a {
		color: $footerLinkColor;
		&:active {
			color: $footerLinkActiveColor;
		}
	}
}
</style>




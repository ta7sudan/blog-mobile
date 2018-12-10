<script>
export default {
	functional: true,
	props: {
		show: {
			type: Boolean,
			default: true
		}
	},
	render(h, context) {
		return (
			<footer class='footer-bar' v-show={context.props.show}>
				<p class='copyright'>Copyright © 2018 <span>ta7sudan</span>. All rights reserved.</p>
				<p class='poweredby'>Powered by Vuejs.</p>
				<p class='license'><a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></p>
			</footer>
		);
	}
};
</script>


<style lang="postcss" scoped>
@import '../styles/font-size.css';

.footer-bar {
	color: #555;
	text-align: center;
	line-height: 1.5em;
	background: #fff;
	border-top: 1px solid rgba(#555, 0.3);
	padding: 20px 0;
	@include font(14);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>

<style lang="postcss">
@import '../styles/theme-light.css';
body {
	min-height: 100vh;
	padding-bottom: 200px;
	box-sizing: border-box;
	position: relative;
}

.copyright {
	span {
		color: $linkColor;
	}
}

.license {
	color: $linkColor;
	& > a {
		color: $linkColor;
		&:active {
			color: $linkActiveColor;
		}
	}
}
</style>




<script>
export default {
	functional: true,
	props: {
		menu: {
			type: Array,
			required: true
		}
	},
	render(h, context) {
		return (
			<ul class={['menu-list', context.data.staticClass]}>
				{context.props.menu.map((item, i) => (
					<router-link
						class='menu-list-item'
						active-class='active-menu-item'
						tag='li'
						key={i}
						to={item.route}
						exact={item.exact || false}
						replace>
						<i class={`icon-${item.icon}`}></i><a>{item.text}</a>
					</router-link>
				))}
			</ul>
		);
	}
};
</script>

<style lang="postcss">
@import '../styles/font-size.css';

.menu-list-item {
	width: 100%;
	height: 2.2em;
	display: flex;
	align-items: center;
	align-content: center;
	@include font(20);
	i {
		color: #333;
		width: 1.5em;
		text-align: center;
		@include font(18);
	}
	a {
		color: #34495e;
		margin-left: 20px;
		@include font(16);
		display: inline-block;
		position: relative;
		&::before {
			content: "";
			display: block;
			height: 5px;
			border-radius: 5px;
			transform: scale3d(0, 1, 1);
			position: absolute;
			left: 0;
			right: 0;
			bottom: -15px;
			background: #5699d2;
		}
	}
	&:active {
		i, a {
			color: #5699d2;
		}
		a::before {
			transition: transform 0.3s ease;
			transform: scale3d(1, 1, 1);
		}
	}
}

.active-menu-item {
	a {
		color: #000;
		&::before {
			transform: scale3d(1, 1, 1);
		}
	}
}
</style>
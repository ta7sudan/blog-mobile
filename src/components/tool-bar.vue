<template>
	<div class="tool-bar" :class="{'toolbar-show': show}">
		<h1 class="logo" @click="$emit('on-logo')">Ta7sudan</h1>
		<form 
			class="search-form"
			@submit.prevent="submit">
			<input
				type="text"
				id="search"
				class="search-input"
				:class="{'search-show': showSearch}"
				placeholder="Search"
				autocomplete="off"
				v-model.trim="searchContent"
				@transitionend="afterTransition"
				@focus="showSearch=true"
				@blur="showSearch=false">
			<label for="search">
				<i class="icon-search" @click="submit"></i>
			</label>
			<i class="icon-list2" @click="$emit('on-menu')"></i>
		</form>
	</div>
</template>

<script>
import '../styles/logo-font.css';
import { scrollY, rAF } from '../lib/util';

export default {
	data() {
		return {
			show: true,
			isSearchBarScale: false,
			showSearch: false,
			lastPos: 0,
			ticking: false,
			searchContent: '',
			searchBar: null,
			// scrollListener: Object.freeze(throttle(() => {
			// 	const currentPos = scrollY();
			// 	this.show = currentPos - this.lastPos < 0;
			// 	this.lastPos = currentPos;
			// }), 50)
			scrollListener: () => {
				if (!this.ticking) {
					rAF(() => {
						this.doScroll();
						this.ticking = false;
					});
					this.ticking = true;
				}
			}
		};
	},
	methods: {
		afterTransition() {
			this.isSearchBarScale = this.showSearch;
		},
		submit() {
			if (this.searchContent && this.isSearchBarScale) {
				this.$emit('on-search', this.searchContent);
			}
		},
		doScroll() {
			const currentPos = scrollY();
			this.show = currentPos - this.lastPos < 0;
			this.lastPos = currentPos;
		}
	},
	beforeMount() {
		window.addEventListener('scroll', this.scrollListener);
	},
	mounted() {
		this.searchBar = this.$el.getElementsByClassName('search-input')[0];
	},
	destroyed() {
		window.removeEventListener('scroll', this.scrollListener);
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.tool-bar {
	height: 120px;
	background: rgba(#fff, 0.9);
	box-shadow: 0 0 15px rgba(#000, 0.2);
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	/* 这里简单的操作就不要transition了, 渲染性能会更好些 */
	transition: all 0.4s ease;
	opacity: 0;
	transform: translate3d(0, -100%, 0);
}

.toolbar-show {
	opacity: 1;
	transform: translate3d(0, 0, 0);
}

.logo {
	color: $logoColor;
	font-family: "Covered By Your Grace", cursive, "Helvetica Neue", Helvetica, Tahoma, Arial;
	@include font(28);
	position: absolute;
	left: 22px;
	top: 50%;
	transform: translateY(-50%);
}

$inputFtSize: 14;
.search-form {
	padding-right: 20px;
	display: flex;
	align-items: center;
	align-content: center;
	flex-basis: 0;
	flex-grow: 1;
	justify-content: flex-end;
	margin-left: 8em;
	@include font($inputFtSize);
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	transform: translate(0, -50%);
}

.search-input {
	color: $fontColor;
	opacity: 0;
	width: 0;
	flex-basis: 0;
	height: 2em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	border-radius: 10px;
	border: 3px solid $borderColor;
	box-shadow: 0 0 10px rgba($boxShadowColor, 0.5);
	background: transparent;
	box-sizing: border-box;
	transition: all 0.4s ease;
	@include font($inputFtSize);
	&::-webkit-input-placeholder {
		color: $placeHolderColor;
	}
	&::-moz-placeholder {
		color: $placeHolderColor;
	}
	&::placeholder {
		color: $placeHolderColor;
	}
}

.search-show {
	flex-grow: 1;
	opacity: 1;
}

.icon-search, .icon-list2 {
	display: inline-block;
	color: $iconColor;
	padding: 20px;
	@include font(20);
	&:active {
		color: $iconActiveColor;
	}
}
</style>

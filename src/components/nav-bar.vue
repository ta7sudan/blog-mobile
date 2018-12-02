<template>
	<div class="nav-bar" :class="{'nav-show': show}">
		<h1 class="logo">Ta7sudan</h1>
		<transition name="search-fade" type="transition" @after-enter="afterEnter" @after-leave="afterLeave">
			<form 
				v-show="showSearch"
				class="search-form"
				@submit.prevent="submit">
				<input
					type="text"
					class="search-input"
					placeholder="Search"
					autocomplete="off"
					v-model.trim="searchContent"
					@blur="showSearch=false">
			</form>
		</transition>
		<i class="icon-search" @click="displaySearch"></i>
		<i class="icon-list2" @click="menu"></i>
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
		afterEnter() {
			this.searchBar.focus();
			this.isSearchBarScale = true;
		},
		afterLeave() {
			this.isSearchBarScale = false;
		},
		displaySearch() {
			this.showSearch = true;
			if (this.isSearchBarScale) {
				this.submit();
			}
		},
		submit() {
			if (this.searchContent) {
				this.$emit('on-search', this.searchContent);
			}
		},
		menu() {
			this.$emit('on-menu');
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

.nav-bar {
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: flex-end;
	height: 120px;
	padding-right: 20px;
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

.nav-show {
	opacity: 1;
	transform: translate3d(0, 0, 0);
}

.logo {
	color: #000;
	font-family: "Covered By Your Grace", cursive, "Helvetica Neue", Helvetica, Tahoma, Arial;
	@include font(28);
	position: absolute;
	left: 22px;
	top: 50%;
	transform: translateY(-50%);
}

$inputFtSize: 14;
.search-form {
	width: 0;
	flex-basis: 0;
	flex-grow: 1;
	margin-left: 8em;
	transition: all 0.3s ease;
	@include font($inputFtSize);
}

.search-fade-enter, .search-fade-leave-active {
	flex-grow: 0;
	opacity: 0;
}

.search-input {
	color: $fontColor;
	width: 100%;
	height: 2em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	border-radius: 10px;
	border: 3px solid $fontColor;
	box-shadow: 0 0 8px rgba(#000, 0.5);
	background: transparent;
	box-sizing: border-box;
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

.icon-search, .icon-list2 {
	display: inline-block;
	color: $fontColor;
	padding: 20px;
	@include font(20);
}
</style>



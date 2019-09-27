import Vue from 'vue';

Vue.mixin({
	activated() {
		if (this.$options.pageTitle) {
			document.title = this.$options.pageTitle;
		}
	}
});
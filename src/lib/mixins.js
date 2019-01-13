import Vue from 'vue';

Vue.mixin({
	created() {
		if (this.$options.pageTitle) {
			document.title = this.$options.pageTitle;
		}
	}
});
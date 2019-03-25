<template>
	<div class="pagination-wrapper">
		<ul class="pagination">
			<li class="item" @touchstart="goPrev">«</li>
			<router-link
				class="item"
				active-class="cur-page"
				tag="li"
				v-for="page in window"
				:key="page"
				:to="{name: routeName, params: {page}}"
				exact>{{page}}</router-link>
			<li class="item" @touchstart="goNext">»</li>
		</ul>
	</div>
</template>

<script>
import { range } from '../lib/util';

export default {
	data() {
		return {
			currentPage: 1
		};
	},
	props: {
		routeName: {
			type: String,
			required: true
		},
		// 最多列出多少页
		size: {
			type: Number,
			default: 8
		},
		// 每页item个数
		limit: {
			type: Number,
			default: 10
		},
		// 总item个数
		total: {
			type: Number,
			required: true
		}
	},
	computed: {
		totalPage() {
			return Math.ceil(this.total / this.limit);
		},
		window() {
			let start = 0;
			if (this.totalPage) {
				start = this.currentPage % this.size ? Math.floor(this.currentPage / this.size) * this.size + 1 : this.currentPage - this.size + 1;
				if (start + this.size > this.totalPage) {
					return range(start, this.totalPage - start + 1);
				} else if (start + this.size === this.totalPage) {
					return range(start, this.totalPage - start);
				} else {
					return range(start, this.size);
				}
			} else {
				return [];
			}
		}
	},
	watch: {
		['$route'](to, from) {
			if (to.name !== this.routeName) {
				return;
			}
			this.currentPage = parseInt(to.params.page, 10);
		}
	},
	methods: {
		goPrev() {
			if (this.currentPage <= 1) {
				return;
			}
			this.$router.push({
				name: this.routeName,
				params: {
					page: this.currentPage - 1
				}
			});
		},
		goNext() {
			if (this.currentPage >= this.totalPage) {
				return;
			}
			this.$router.push({
				name: this.routeName,
				params: {
					page: this.currentPage + 1
				}
			});
		}
	},
	beforeMount() {
		this.currentPage = parseInt(this.$route.params.page, 10);
	}
};
</script>



<style lang="postcss" scoped>
@import '../styles/font-size.css';
@import '../styles/theme-light.css';

.pagination-wrapper {
	text-align: center;
}

.pagination {
	border: 3px solid $paginationFontColor;
	border-radius: 6px;
	display: inline-block;
	overflow: hidden;
}

.item {
	$itemHeight: 60px;
	color: $paginationFontColor;
	text-align: center;
	width: 50px;
	height: $itemHeight;
	line-height: $itemHeight;
	float: left;
	user-select: none;
	transition: all 0.3s ease;
	@include font(14);
	&:active {
		background: $paginationItemActiveBgColor;
	}
}

.item + .item {
	border-left: 3px solid $paginationFontColor;
}

.cur-page {
	color: $paginationCurFontColor;
	background: $paginationFontColor;
	&:active {
		background: $paginationFontColor;
	}
}
</style>

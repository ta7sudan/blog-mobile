<template>
	<div class="donate">
		<button class="donate-btn" @touchstart="showMask=true">Donate</button>
		<transition name="donate-mask" type="transition">
			<div class="donate-mask" v-show="showMask" @touchstart="showMask=false">
				<div class="qrcode-container">
					<div class="qrcode-wrapper alipay" v-if="alipayQrcode" @touchstart.stop>
						<h3 class="qrcode-title">Alipay</h3>
						<img class="qrcode" :src="alipayQrcode" alt="alipay">
					</div>
					<div class="qrcode-wrapper wechat-pay" v-if="wechatPayQrcode" @touchstart.stop>
						<h3 class="qrcode-title">Wechat Pay</h3>
						<img class="qrcode" :src="wechatPayQrcode" alt="alipay">
					</div>
					<div class="qrcode-wrapper bitcoin" v-if="bitcoinAddr" @touchstart.stop>
						<h3 class="qrcode-title">Bitcoin</h3>
						<p class="bitcoin-addr" v-cloak>{{bitcoinAddr}}</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMask: false
		};
	},
	props: {
		alipayQrcode: {
			type: String
		},
		wechatPayQrcode: {
			type: String
		},
		bitcoinAddr: {
			type: String
		}
	},
	updated() {
		document.body.style.overflow = this.showMask ? 'hidden' : 'visible';
	}
};
</script>

<style lang="postcss" scoped>
@import '../styles/theme-light.css';
@import '../styles/font-size.css';

.donate {
	display: inline-block;
}

.donate-btn {
	width: 180px;
	height: 60px;
	-webkit-appearance: none;
	outline: none;
	border: none;
	color: #fff;
	background: $donateBtnBgColor;
	border-radius: 10px;
	user-select: none;
	@include font(14);
	transition: all 0.3s ease;
	&:active {
		background: #e52409;
	}
}

.donate-mask {
	background: rgba(#333, 0.5);
	overflow: hidden;
	z-index: 110;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.donate-mask-enter, .donate-mask-leave-to {
	opacity: 0;
}

.donate-mask-enter-active, .donate-mask-leave-active {
	transition: opacity 0.3s ease;
}

.qrcode-container {
	width: 40%;
	margin: auto;
	position: absolute;
	top: 50%;
	transform: translate3d(0, -50%, 0);
	left: 0;
	right: 0;
}

.qrcode-wrapper {
	width: 100%;
	padding: 15px;
	box-sizing: border-box;
	border-radius: 10px;
	background: #fff;
	display: inline-block;
	margin-bottom: 30px;
}

.qrcode {
	width: 100%;
}

.qrcode-title {
	color: $qrcodeTitleColor;
	user-select: none;
	font-family: "Microsoft Yahei";
	font-weight: bold;
	line-height: 1.6em;
	margin-bottom: 10px;
	@include font(16);
}

.bitcoin-addr {
	color: $bitcoinAddrColor;
	padding: 5px;
	line-height: 1.5em;
	border-radius: 5px;
	background: #ececec;
	text-align: center;
	@include font(14);
}


</style>


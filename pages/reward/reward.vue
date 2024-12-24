<template>
	<view class="reward-container">
		<view class="pay-mode" v-for="item,index in paymentMode" :key="index">
			<h2>{{item.name}}：</h2>
			<image @tap="previewPayQRCodeImage(index)" class="img" :src="item.imgUrl" mode="widthFix"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue';

	const paymentMode = reactive([{
			name: "微信支付",
			imgUrl: "../../static/images/wxpay.jpg"
		},
		{
			name: "支付宝支付",
			imgUrl: "../../static/images/alipay.jpg"
		}
	])
	const imgUrlList = computed(() => paymentMode.map(item => item.imgUrl))
	const previewPayQRCodeImage = (index) => {
		uni.previewImage({
			current: index,
			urls: imgUrlList.value,
			loop: true
		})
	}
</script>

<style lang="scss" scoped>
	.reward-container {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			transform: scale(0.8);
		}
	}
</style>
<template>
	<view class="empty-container">
		<l-empty :description="desc">
			<view class="nodata-btn" @tap="onNoDataBtn">去书城逛逛</view>
		</l-empty>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from 'vue'
	const emits = defineEmits(["onNoDataBtn"])
	defineProps({
		desc: {
			default: '',
			type: String
		}
	})
	const onNoDataBtn = () => {
		uni.switchTab({
			url: "/pages/home/index"
		})
		emits("onNoDataBtn")
	}
</script>

<style lang="scss">
	.empty-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.nodata-btn {
			padding: 16rpx 40rpx;
			background-color: #F76A32;
			color: #fff;
			font-size: 28rpx;
			border-radius: 50rpx;
		}
	}
</style>
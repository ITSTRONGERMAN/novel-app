<template>
	<view class="empty-container">
		<refactorEmpty :desc="desc" :color="color">
		</refactorEmpty>
		<view class="nodata-btn" @tap="onNoDataBtn">去书城逛逛</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from 'vue'
	import refactorEmpty from "@/components/empty/empty.vue"
	const emits = defineEmits(["onNoDataBtn"])
	const props = defineProps({
		desc: {
			default: '',
			type: String
		},
		color: {
			default: "#000",
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
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.nodata-btn {
			padding: 16rpx 40rpx;
			transform: translateY(-80rpx);
			margin-top: 60rpx;
			background-color: #F76A32;
			color: #fff;
			font-size: 28rpx;
			border-radius: 50rpx;
		}
	}
</style>
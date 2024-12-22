<template>
	<view class="right-bottom" :style="{zIndex}">
		<view>
			{{chapterImageInfo.curentImgNum}}/{{chapterImageInfo.totalImage}}
		</view>
		<view class="time">
			{{currentTime}}
			<uv-icon v-if="batteryInfo.level<=10" name="battery-empty" custom-prefix="custom-icon" size="14"
				:color="'#fff'"></uv-icon>
			<uv-icon v-if="batteryInfo.level<=10" name="battery-empty" custom-prefix="custom-icon" size="14"
				:color="batteryInfo.isCharging?'#77CA44':'#fff'"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>10&&batteryInfo.level<30" name="battery-low"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':'#fff'"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>=30&&batteryInfo.level<50" name="battery-mid"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':'#fff'"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>=50&&batteryInfo.level<90" name="battery-most"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':'#fff'"></uv-icon>
			<uv-icon v-else name="battery-full" custom-prefix="custom-icon" size="14"
				:color="batteryInfo.isCharging?'#77CA44':'#fff'"></uv-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	import getBottomInfo from "../../../utiles/getBottomInfo.js"
	const {
		currentTime,
		batteryInfo
	} = getBottomInfo()
	defineProps({
		zIndex: {
			default: 0,
			type: Number
		},
		chapterImageInfo: {
			type: Object,
			default: () => ({
				curentImgNum: 1,
				totalImage: 1
			})
		}
	})
</script>

<style lang="scss" scoped>
	.right-bottom {
		display: flex;
		gap: 10rpx;
		font-size: 24rpx;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 30rpx;
		color: #fff;
		padding: 10rpx 20rpx;
		position: fixed;
		right: 20rpx;
		bottom: 10rpx;

		.time {
			z-index: 0;
			display: flex;
			gap: 10rpx;
		}
	}
</style>
<template>
	<view class="read-bottom" :style="{color:theme.color}">
		<view class="time">{{currentTime}}
		</view>
		<view class="battery" v-if="batteryInfo">
			<uv-icon v-if="batteryInfo.level<=10" name="battery-empty" custom-prefix="custom-icon" size="14"
				:color="batteryInfo.isCharging?'#77CA44':theme.color"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>10&&batteryInfo.level<30" name="battery-low"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':theme.color"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>=30&&batteryInfo.level<50" name="battery-mid"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':theme.color"></uv-icon>
			<uv-icon v-else-if="batteryInfo.level>=50&&batteryInfo.level<90" name="battery-most"
				custom-prefix="custom-icon" size="14" :color="batteryInfo.isCharging?'#77CA44':theme.color"></uv-icon>
			<uv-icon v-else name="battery-full" custom-prefix="custom-icon" size="14"
				:color="batteryInfo.isCharging?'#77CA44':theme.color"></uv-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	defineProps({
		theme: {
			type: Object,
			default: () => ({
				backgroundColor: '#F6F6F6',
				color: '#929292',
			})
		},
		currentPage: {
			type: Number,
			default: 1
		},
		totalPage: {
			type: Number,
			default: 1
		},
		currentTime: {
			type: String,
			default: '00:00'
		},
		batteryInfo: {
			type: Object,
			default: null
		}
	})
</script>

<style lang="scss" scoped>
	.read-bottom {
		display: flex;
		justify-content: center;
		padding: 10rpx 0;
		font-size: 28rpx;
		justify-content: space-between;

		.read-bottom-r {
			display: flex;
			gap: 20rpx;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
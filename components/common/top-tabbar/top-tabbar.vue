<template>
	<view class="top-tapbar">
		<view class="l">
			<view :class="['item',value==index?'active':'']" v-for="item,index in tabBarList" :key="index"
				@tap="handelChangeTabbarItem({name:item.name,index})">{{item.name}}</view>

		</view>
		<view class="line-bar" :style="`transform: translate(${54+value*150}rpx, -50%)`"></view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineEmits
	} from 'vue'
	const props = defineProps({
		value: {
			type: Number,
			default: 0,
		}
	})
	const emits = defineEmits(['change'])
	// 顶部tabbar内容
	const tabBarList = [{
			name: "小说",
		},
		{
			name: '漫画'

		}, {
			name: '壁纸'
		}
	]

	// 点击tabbar项
	const handelChangeTabbarItem = (e) => {
		emits('change', e)
	}
</script>

<style lang="scss" scoped>
	.top-tapbar {
		height: 88rpx;
		display: flex;
		align-items: center;
		position: relative;

		.line-bar {
			position: absolute;
			width: 40rpx;
			transform: translate(54rpx, -50%); // 调整为 -50%
			bottom: 10%;
			transition-duration: 0.3s;
			background-color: $main-color;
			height: 6rpx;
			border-radius: 6rpx;
		}

		.l {
			display: flex;
			align-items: center;
			width: 100%;

			.item {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 34rpx;
				transition-duration: 0.5s;
				padding: 0 40rpx;
				text-align: center;

			}

			.active {
				color: $main-color;
				font-weight: bold;
			}
		}
	}
</style>
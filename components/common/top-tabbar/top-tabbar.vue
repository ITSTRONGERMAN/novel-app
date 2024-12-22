<template>
	<view :id="id" class="top-tapbar ">
		<view class="l">
			<view :class="['item',value==index?'active':'',]" v-for="item,index in tabBarList" :key="index"
				@tap="handelChangeTabbarItem({name:item,index})">{{item}}</view>
		</view>
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
		},
		id: {
			type: String,
			default: ''
		},
		tabBarList: {
			type: Array,
			default: () => []
		}
	})
	const emits = defineEmits(['change'])
	// 点击tabbar项
	const handelChangeTabbarItem = (e) => {
		emits('change', e)
	}
</script>

<style lang="scss">
	.top-tapbar {
		height: 88rpx;
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 40rpx;

		.l {
			display: flex;
			align-items: center;
			width: 100%;
			gap: 40rpx;

			.item {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				transition-duration: 0.5s;
				text-align: center;
				color: $gray-color
			}

			.active {
				transform: scale(1.1);
				color: #000;
				font-weight: 500;
			}
		}
	}
</style>
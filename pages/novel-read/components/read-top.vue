<template>
	<view class="status-bar"></view>
	<view class="read-top">
		<uv-icon name="arrow-left" @tap="goBack" :color="theme.color"></uv-icon>
		<text class="chapter_name" :style="{color:theme.color}">{{chapterName}}</text>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	defineProps({
		theme: {
			type: Object,
			default: () => ({
				backgroundColor: '#F6F6F6',
				color: '#929292',
			})
		},
		chapterName: {
			type: String,
			default: ''
		}
	})
	// 返回上一页
	const goBack = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.read-top {
		display: flex;
		gap: 10rpx;
		transition: all 0.3s;
		padding-bottom: 20rpx;

		.chapter_name {
			font-size: 28rpx;
			display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
</style>
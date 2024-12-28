<template>
	<view class="guess-like-container" :style="{backgroundColor:currentTheme.componentBcg}">
		<view class="title" :style="{color:currentTheme.mainFontColor}">猜你喜欢</view>
		<novelListVue :novelList="novelList" />
	</view>
</template>

<script setup>
	import novelListVue from '@/components/novellist/novel-list.vue';
	import useTheme from '../../../hooks/useTheme';
	import {
		defineProps
	} from 'vue';
	const {
		currentTheme
	} = useTheme()
	defineProps({
		novelList: {
			default: () => [],
			type: Array
		}
	})
</script>

<style lang="scss" scoped>
	.guess-like-container {
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 20;
		border-radius: 20rpx;

		.title {
			font-size: 40rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
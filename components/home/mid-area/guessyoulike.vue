<template>
	<view class="guess-like-container">
		<view class="title">猜你喜欢</view>
		<novelListVue :novelList="novelList" />
	</view>
</template>

<script setup>
	import novelListVue from '../../common/novel-list.vue';
	import {
		defineProps
	} from 'vue';
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
		background-color: #fff;
		border-radius: 20rpx;

		.title {
			font-size: 40rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
<template>
	<view class="item">
		<scroll-view scroll-y class="scroll-box" refresher-default-style="black" :style="{ height: `${height}px` }"
			@scrolltolower="handelMoreData">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script setup>
	const props = defineProps({
		height: {
			type: Number,
			required: true
		},
	});
	const handelMoreData = () => {
		console.log('到底了');
	}
</script>
<style lang="scss">
	.item {
		flex: 1;
		height: 100%;

		.scroll-box {
			padding: 20rpx;
		}

	}
</style>
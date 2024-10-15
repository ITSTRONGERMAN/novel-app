<template>
	<view class="item">
		<scroll-view scroll-y class="scroll-box" refresher-default-style="black" :style="{ height: `${height}px` }">
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
</script>
<style lang="scss">
	.item {
		flex: 1;

		.scroll-box {
			padding: 20rpx;
		}

		height: 100%;
	}
</style>
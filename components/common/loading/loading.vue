<template>
	<view class="loading-container">
		<image src="../../../static/images/loading.gif" mode="aspectFit" class="_img"></image>
	</view>
</template>

<script>
	export default {
		name: 'Loading',
	};
</script>
<style lang="scss" scoped>
	.loading-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		._img {
			transform: scale(0.25);
		}
	}
</style>
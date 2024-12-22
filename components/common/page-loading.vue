<template>
	<view class="page-loading">
		<loadingVue></loadingVue>
		<!-- <image src="../../static/images/error.png" mode=""></image> -->
	</view>
</template>

<script setup>
	import loadingVue from './loading/loading.vue';
</script>

<style lang="scss" scoped>
	.page-loading {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99999;
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
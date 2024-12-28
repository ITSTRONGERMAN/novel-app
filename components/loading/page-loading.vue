<template>
	<view @tap="reload" class="page-loading" :style="{backgroundColor}">
		<loadingVue v-if="status==='loading'"></loadingVue>
		<view v-else-if="status==='error'" class="empty">
			<l-empty image="network" />
			<view class="txt" :style="{color:fontColor}">网络连接异常,请点击重试</view>
		</view>
	</view>
</template>

<script setup>
	import loadingVue from '@/components/loading/loading.vue'
	import {
		defineProps,
		defineEmits
	} from 'vue'
	defineProps({
		backgroundColor: {
			type: String,
			default: "#fff"
		},
		status: {
			type: String,
			default: "loading"
		},
		fontColor: {
			type: String,
			default: "#000"
		}
	})
	const emits = defineEmits(["reload"])
	const reload = () => {
		emits("reload")
	}
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

		.empty {
			display: flex;
			flex-direction: column;

			.txt {
				font-size: 28rpx;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>
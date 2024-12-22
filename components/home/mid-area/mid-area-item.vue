<template>
	<view class="item">
		<z-paging ref="page" :refresher-enabled="refresh" :fixed="false" width="100%" height="100%" refresher-only
			@onRefresh="onRefresh" @scrolltolower="onScrollToLower">
			<template #refresher>
				<view class="loading">
					<loadingVue type="pulldown"></loadingVue>
				</view>
			</template>
			<template #loadingMoreDefault>
				<uv-load-more status="loading" loading-text="努力加载中..." />
			</template>
			<view class="scroll-box" :style="customStyle">
				<view class="container">
					<slot></slot>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
	import {
		defineEmits,
		ref,
		defineProps,
		defineExpose
	} from 'vue';
	import loadingVue from '../../common/loading/loading.vue';
	const emits = defineEmits(['onRefresh', 'onScrollToLower'])
	const page = ref(null)
	const props = defineProps({
		pageName: {
			type: String,
			default: ''
		},
		refresh: {
			type: Boolean,
			default: true
		},
		customStyle: {
			type: Object,
			default: () => {}
		}
	})
	// 下拉刷新
	const onRefresh = () => {
		emits('onRefresh')
	}
	// 结束下拉刷新
	const endRefresh = () => {
		page.value.endRefresh()
	}
	// 到列表到底部时
	const onScrollToLower = () => {
		emits('onScrollToLower')
	}
	defineExpose({
		endRefresh
	})
</script>
<style lang="scss" scoped>
	.item {
		flex: 1;
		height: 100%;
		position: relative;

		.loading {
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.scroll-box {
			height: 100%;
			padding: 0 20rpx;
			padding-top: 20rpx;

			.container {
				width: 100%;
				height: 100%;

			}
		}

	}
</style>
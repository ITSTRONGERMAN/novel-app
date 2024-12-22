<template>
	<view class="list-container">
		<view class="list">
			<view class="item" v-for="novel in novelList" :key="novel.id" @tap="goToNovelDetail(novel)">
				<view class="l">
					<uv-image :src="novel.cover" lazy-load observeLazyLoad fade radius="5" width="90"
						height="120"></uv-image>
				</view>
				<view class="r">
					<view class="name" v-html="novel.name"></view>
					<view class="info">
						{{novel.intro}}
					</view>
					<view class="b"><text class="status">{{novel.status}}</text> {{novel.words_count}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'

	import {
		defineProps,
		getCurrentInstance,
		watch,
		nextTick,
		defineEmits
	} from 'vue'
	import getSelectorInfo from '../../utiles/getSelectorInfo'
	const store = useStore()
	const instance = getCurrentInstance()
	const emits = defineEmits(["onLayout"])
	const props = defineProps({
		novelList: {
			type: Array,
			default: () => []
		}
	})
	// 列表第一次布局触发
	const firtLayoutWatcher = watch(() => props.novelList, () => {
		nextTick(async () => {
			const listInfo = await getSelectorInfo(instance, ".list")
			emits("onLayout", listInfo)
		})
		firtLayoutWatcher()
	})
	// 前往小说详情页
	const goToNovelDetail = (detail) => {
		const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, '')
		store.commit('setCurrentNovelDetail', {
			...detail,
			name: removeHtmlTags(detail.name),
		})
		uni.navigateTo({
			url: '/pages/nove-detail/index',
			animationType: "slide-in-right"
		})
	}
</script>

<style lang="scss" scoped>
	.list-container {
		.list {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 30rpx;

			.item {
				display: flex;
				gap: 30rpx;

				.r {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 10rpx;

					.info {
						color: $gray-color;
						font-size: 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
					}

					.b {
						color: $gray-color;
						font-size: 24rpx;

						.status {
							color: $gold-color;
						}
					}
				}
			}
		}
	}
</style>
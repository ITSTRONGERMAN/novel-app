<template>
	<view class="chapters_container">
		<view class="header">
			<view class="status-bar"></view>
			<view class="inner-box">
				<uv-icon @tap="back" name="arrow-left" size="48rpx"></uv-icon>
				<view class="name">{{novel.novel_name}}</view>
				<view class="placeholder"></view>
			</view>
			<view class="order">
				<view class="l">
					更新至{{latestChapter}}
				</view>
				<view class="r" @tap="chapters_reverse">
					<view class="icon">
						<uv-icon name="arrow-up-fill" size="20rpx"></uv-icon>
						<uv-icon name="arrow-down-fill" size="20rpx"></uv-icon>
					</view>
					{{isReverse?'逆序':'正序'}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height:scrollViewHeight+'px'}">
			<view class="chapter-list">
				<view class="chapter-list-item" v-for="item in novel.chapters" :key="item.id">
					{{item.chapter_name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		computed,
		ref,
		getCurrentInstance
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import getSystemInfo from '../../utiles/getSystemInfo'
	import getSelectorInfo from '../../utiles/getSelectorInfo'
	const store = useStore()
	// 小说信息
	const novel = computed(() => store.state.currentNovelChapters)
	console.log(novel.value);
	// 最新章节
	const latestChapter = ref(novel.value.chapters[novel.value.chapters.length - 1].chapter_name)
	const instance = getCurrentInstance()
	// 是否逆序
	const isReverse = ref(false)
	const scrollViewHeight = ref(0)
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		const headerInfo = await getSelectorInfo(instance, '.header')
		console.log(headerInfo);
		scrollViewHeight.value = sysInfo.windowHeight - headerInfo.height
	})
	// 章节内容顺序逆转
	const chapters_reverse = () => {
		novel.value.chapters = novel.value.chapters.reverse()
		isReverse.value = !isReverse.value
	}
	const back = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.chapters_container {

		.header {
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #eee;
			background-color: #fff;

			.inner-box {
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					font-size: 32rpx;
				}
			}

			.order {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 10rpx 20rpx;
				background-color: #fff;
				gap: 20rpx;

				.l {
					flex: 1;
					font-size: 28rpx;
					color: rgb(143, 143, 143);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.r {
					font-size: 24rpx;
					display: flex;
					align-items: center;
					gap: 10rpx;
				}
			}
		}

		.chapter-list {
			display: flex;
			flex-direction: column;
			gap: 30rpx;
			padding: 20rpx;

			.chapter-list-item {
				font-size: 28rpx;
			}
		}
	}
</style>
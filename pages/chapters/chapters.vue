<template>
	<view class="chapters_container">
		<view class="order">
			<view class="l">
				更新至{{latestChapter}}
			</view>
			<view class="r" @tap="chapters_reverse">
				<view class="icon">
					<uv-icon name="arrow-up-fill" size="12"></uv-icon>
					<uv-icon name="arrow-down-fill" size="12"></uv-icon>
				</view>
				{{isReverse?'逆序':'正序'}}
			</view>
		</view>
		<view class="chapter-list">
			<view class="item" v-for="item in novel.chapters" :key="item.id">
				{{item.chapter_name}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		computed,
		ref
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	// 小说信息
	const novel = computed(() => store.state.currentNovelChapters)
	// 最新章节
	const latestChapter = ref(null)
	// 是否逆序
	const isReverse = ref(false)
	onMounted(() => {
		uni.setNavigationBarTitle({
			title: novel.value.novel_name,
		})
		uni.setNavigationBarColor({
			backgroundColor: '#fff',
			frontColor: "#000"
		})
		latestChapter.value = novel.value.chapters[novel.value.chapters.length - 1].chapter_name
	})
	// 章节内容顺序逆转
	const chapters_reverse = () => {
		novel.value.chapters = novel.value.chapters.reverse()
		isReverse.value = !isReverse.value
	}
</script>

<style lang="scss" scoped>
	.chapters_container {
		position: relative;

		.order {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			position: fixed;
			padding: 20rpx;
			background-color: #fff;

			.l {
				font-size: 28rpx;
				color: rgb(143, 143, 143);
			}

			.r {
				font-size: 24rpx;
				display: flex;
				align-items: center;
				gap: 10rpx;
			}
		}

		.chapter-list {
			padding-top: 78.4rpx;
			display: flex;
			flex-direction: column;
			gap: 30rpx;

			.item {
				padding-left: 28rpx;
			}
		}
	}
</style>
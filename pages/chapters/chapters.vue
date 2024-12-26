<template>
	<view class="chapters_container">
		<pageLoadingVue @reload="reload" :status="loadError?'error':'loading'" v-if="loading"></pageLoadingVue>
		<view class="header">
			<view class="status-bar"></view>
			<view class="inner-box">
				<uv-icon @tap="back" name="arrow-left" size="46rpx"></uv-icon>
				<view class="name">
					{{currentBookName}}
				</view>
				<view class="placeholder"></view>
			</view>
			<view class="order">
				<view class="l">
					更新至 {{fromPage == 'detail' ? novel.chapters[novel.chapters?.length - 1].chapter_name :
			chapters[chapters?.length - 1]?.chapter_name}}
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
				<view @tap="goToRead(item)" class="chapter-list-item" v-for="item in chapterList" :key="item.id">
					{{item.chapter_name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
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
	import pageLoadingVue from '../../components/common/page-loading.vue'
	import {
		getComicChapters,
		getNovelChapters
	} from '../../api'
	onLoad(async (param) => {
		loading.value = param.from === 'bookshell'
		fromPage.value = param.from
		if (loading.value) {
			await getChapterList(param.novel_id, param.type)
			novel_name.value = param.novel_name
		}
	})
	const fromPage = ref("")
	const store = useStore()
	const loading = ref(false)
	const loadError = ref(false)
	const chapters = ref([])
	const novel_name = ref('')
	// 小说信息
	const novel = computed(() => store.state.currentNovelChapters)
	const novelInfo = computed(() => store.state.currentNovelDetail)
	// 章节列表
	const chapterList = computed(() => {
		return fromPage.value == 'detail' ? novel.value.chapters : chapters.value
	})
	const currentBookName = computed(() => {
		return fromPage.value == 'detail' ? novel.value.name : novel_name.value
	})
	// 组件实例
	const instance = getCurrentInstance()
	// 是否逆序
	const isReverse = ref(false)
	const scrollViewHeight = ref(0)
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		const headerInfo = await getSelectorInfo(instance, '.header')
		scrollViewHeight.value = sysInfo.windowHeight - headerInfo.height
	})
	// 章节内容顺序逆转
	const chapters_reverse = () => {
		if (fromPage.value == 'detail') novel.value.chapters = novel.value.chapters.reverse()
		else chapters.value = chapters.value.reverse()
		isReverse.value = !isReverse.value
	}
	const back = () => {
		uni.navigateBack()
	}
	// 获取章节列表
	const getChapterList = async (id, type) => {
		try {
			if (type == "novel") {
				const novelChapterRes = await getNovelChapters(id)
				chapters.value = novelChapterRes.data
			} else if (type == "comic") {
				const comicChapterRes = await getComicChapters(id)
				chapters.value = comicChapterRes.data.data
			}
			loading.value = false
		} catch (error) {
			loadError.value = true
		}
	}
	const goToRead = (chapterInfo) => {
		const type = novelInfo.value.type
		const id = novelInfo.value.id
		uni.redirectTo({
			url: `/pages/${type}-read/${type}-read?${type}_id=${id}&chapter_n=${chapterInfo.chapter_n}&appoint=true`
		})
	}
	const reload = async () => {
		loadError.value = false
		await getChapterList(novelInfo.value.id, novelInfo.value.type)
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
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				align-items: center;

				view {
					text-align: center;
				}

				.name {
					font-size: 32rpx;
				}
			}

			.order {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 20rpx;
				padding-bottom: 10rpx;
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
			padding: 20rpx;

			.chapter-list-item {
				padding: 20rpx 0;
				font-size: 30rpx;
			}
		}
	}
</style>
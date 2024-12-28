<template>
	<pageLoadingVue :backgroundColor="currentTheme.mainBcg" @reload="reload" :status="loadError?'error':'loading'"
		v-if="loading"></pageLoadingVue>
	<pageWithHeaderVue :theme="theme" :header-bcg="currentTheme?.secondaryBcg" :body-bcg="currentTheme?.mainBcg"
		:titleColor="currentTheme?.mainFontColor" :title="currentBookName">
		<template #header-bottom>
			<view class="order">
				<view class="l">
					更新至 {{latestChapterName}}
				</view>
				<view class="r" @tap="chapters_reverse" :style="{color:currentTheme.mainFontColor}">
					<view class="icon">
						<uv-icon name="arrow-up-fill" size="20rpx"></uv-icon>
						<uv-icon name="arrow-down-fill" size="20rpx"></uv-icon>
					</view>
					{{isReverse?'逆序':'正序'}}
				</view>
			</view>
		</template>
		<template #body>
			<view class="chapter-list" :style="{color:currentTheme.mainFontColor}">
				<view @tap="goToRead(item)" class="chapter-list-item" v-for="item in chapterList" :key="item.id">
					{{item.chapter_name}}
				</view>
			</view>
		</template>
	</pageWithHeaderVue>
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
	import getSystemInfo from '@/utiles/getSystemInfo'
	import getSelectorInfo from '@/utiles/getSelectorInfo'
	import pageLoadingVue from '@/components/loading/page-loading.vue'
	import pageWithHeaderVue from '@/components/pageWithHeader/pageWithHeader.vue'
	import {
		getChapterList as getCacheChapterList
	} from "@/hooks/useCache.js"
	import {
		getComicChapters,
		getNovelChapters
	} from '@/api'
	import useTheme from '@/hooks/useTheme'
	const {
		theme,
		currentTheme
	} = useTheme()
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
	const latestChapterName = ref(
		fromPage.value == 'detail' ?
		novel.value.chapters[novel.value.chapters?.length - 1].chapter_name :
		chapters.value[chapters.value.length - 1]?.chapter_name
	)
	// 章节列表
	const chapterList = computed(() => {
		return fromPage.value == 'detail' ? novel.value.chapters : chapters.value
	})
	const currentBookName = computed(() => {
		return fromPage.value == 'detail' ? novel.value.name : novel_name.value
	})
	// 是否逆序
	const isReverse = ref(false)
	// 章节内容顺序逆转
	const chapters_reverse = () => {
		if (fromPage.value == 'detail') novel.value.chapters = novel.value.chapters.reverse()
		else chapters.value = chapters.value.reverse()
		isReverse.value = !isReverse.value
	}
	// 获取章节列表
	const getChapterList = async (id, type) => {
		try {
			if (type == "novel") {
				const novelChapterRes = await getCacheChapterList(id)
				chapters.value = novelChapterRes
			} else if (type == "comic") {
				const comicChapterRes = await getComicChapters(id)
				chapters.value = comicChapterRes.data.data
			}
			loading.value = false
		} catch (error) {
			loadError.value = true
		}
	}
	// 前往阅读页
	const goToRead = (chapterInfo) => {
		const type = novelInfo.value.type
		const id = novelInfo.value.id
		uni.redirectTo({
			url: `/pages/${type}-read/${type}-read?${type}_id=${id}&chapter_n=${chapterInfo.chapter_n}&appoint=true`
		})
	}
	// 重新加载
	const reload = async () => {
		loadError.value = false
		await getChapterList(novelInfo.value.id, novelInfo.value.type)
	}
</script>

<style lang="scss" scoped>
	.order {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 20rpx;
		padding-bottom: 10rpx;
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

	.chapter-list {
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.chapter-list-item {
			padding: 20rpx 0;
			font-size: 30rpx;

			&:first-child {
				padding-top: 0;
			}

			&:last-child {
				padding-bottom: 0;
			}
		}
	}
</style>
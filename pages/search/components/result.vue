<template>
	<view class="search-result-page">
		<view id="top">
			<topTabbar :theme="theme" :tabBarList="tabBarList" :value="currentActiveTabbar" @change="handelTopChange"
				id="top_bar" />
		</view>
		<midArea :background="currentTheme.componentBcg" :height="scrollViewHeight" :length="tabBarList.length"
			:current="currentActiveTabbar" @pageChange="pageChange">
			<!-- 小说 -->
			<midAreaItem v-for="page,index in pageList" :key="index" :refresh="false" @onScrollToLower="getNovelList">
				<l-empty @tap="reload" v-if="searchResultList[page.name].loadError" image="network"
					description="网络连接异常,请点击重试" />
				<loadingVue v-if="!searchResultList[page.name].loaded"></loadingVue>
				<template v-if="searchResultList[page.name].loaded&&!searchResultList[page.name].loadError">
					<view class="result-container">
						<l-empty v-if="searchResultList[page.name].list.length==0" description="没有找到相关内容" />
						<template v-else>
							<novelList :novelList="searchResultList[page.name].list" @onLayout="onNovelListLayout" />
							<uv-load-more v-if="searchResultList[page.name]?.listHeight>scrollViewHeight"
								:status="searchResultList[page.name].loadingStatus" loading-text="努力加载中"
								loadmore-text="轻轻上拉" nomore-text="实在没有了" />
						</template>
					</view>
				</template>
			</midAreaItem>
		</midArea>
	</view>
</template>

<script setup>
	import {
		defineProps,
		getCurrentInstance,
		onMounted,
		ref,
		reactive,
		watch
	} from 'vue'
	import topTabbar from "@/components/top-tabbar/top-tabbar.vue"
	import novelList from '@/components/novellist/novel-list.vue';
	import getSelectorInfo from '@/utiles/getSelectorInfo';
	import midArea from '@/components/mid-area/mid-area.vue';
	import midAreaItem from '@/components/mid-area/mid-area-item.vue';
	import useSlide from '@/hooks/useSlide.js'
	import loadingVue from '@/components/loading/loading.vue';
	import useTheme from '@/hooks/useTheme';
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		currentActiveTabbar,
		pageChange,
		handelTopChange,
		tabBarList,
		pageList,
		currentPage
	} = useSlide()
	import {
		searchComic,
		searchNovel
	} from '../../../api';
	import {
		parseSearchResult
	} from '../utils';
	// 搜索结果
	const searchResultList = reactive({
		novel: {
			size: 10,
			offset: 0,
			list: [],
			listHeight: 0,
			loaded: false,
			loadingStatus: 'loading',
			loadError: false
		},
		comic: {
			size: 10,
			offset: 0,
			list: [],
			listHeight: 0,
			loaded: false,
			loadingStatus: 'loading',
			loadError: false
		}
	})
	// 显示列表高度
	const scrollViewHeight = ref(0)
	// 监听页面变化
	watch(currentPage, async (newVal) => {
		if (!newVal.hasShown) {
			if (newVal.name == 'comic') {
				await getNovelList(props.keyword, 0, 10);
			}
			pageList.value[currentActiveTabbar.value] = {
				...newVal,
				hasShown: true,
			}
		}
	})
	const props = defineProps({
		keyword: {
			type: String,
			default: ''
		},
		scrollHeight: {
			type: Number,
			default: 0
		}
	})
	const init = async () => {
		const instance = getCurrentInstance()
		const topbarInfo = await getSelectorInfo(instance, "#top_bar")
		scrollViewHeight.value = props.scrollHeight - topbarInfo.height + 10
	}
	onMounted(async () => {
		await init()
		await getNovelList()
	})
	// 获取搜索结果
	const getNovelList = async () => {
		const currentPageName = currentPage.value.name
		try {
			if (searchResultList[currentPageName].loadingStatus == 'nomore') return
			let searchRes = null;
			const offset = searchResultList[currentPageName].offset
			const size = searchResultList[currentPageName].size
			if (currentPageName == "novel") {
				searchRes = await searchNovel(props.keyword, props.keyword, offset, size)
			} else if (currentPageName == "comic") {
				searchRes = await searchComic(props.keyword, offset, size)
			}
			const list = searchRes.data.data.map(item => ({
				...item,
				name: parseSearchResult(item.name, props.keyword),
				type: currentPageName
			}))
			if (list.length == 0) {
				searchResultList[currentPageName].loadingStatus = 'nomore'
			}
			searchResultList[currentPageName].loaded = true
			searchResultList[currentPageName].list = [...searchResultList[currentPageName].list, ...list]
		} catch (error) {
			searchResultList[currentPageName].loaded = true
			searchResultList[currentPageName].loadError = true
		}
	}
	// 搜索列表触底事件
	const onReachBottom = async () => {
		searchResultList[currentPage.value.name].offset += searchResultList[currentPage.value.name].size
		await getNovelList()
	}
	// 小说列表布局
	const onNovelListLayout = (e) => {
		searchResultList[currentPage.value].listHeight = e.height;
	}
	// 重新加载
	const reload = async () => {
		const currentPageName = currentPage.value.name
		searchResultList[currentPageName].loadError = false
		searchResultList[currentPageName].loaded = false
		await getNovelList()
		searchResultList[currentPageName].loaded = true
	}
</script>

<style lang="scss" scoped>
	.search-result-page {
		.search-box {
			padding: 0 20rpx;
		}

		// .result-container {
		// 	padding: 20rpx;
		// 	padding-top: 10rpx;
		// 	background-color: #fff;
		// 	border-radius: 20rpx;
		// }
	}
</style>
<template>
	<view class="search-result-page">
		<view id="top">
			<topTabbar :tabBarList="tabBarList" :value="currentActiveTabbar" @change="handelTopChange" id="top_bar" />
		</view>
		<midArea background="#fff" :height="scrollViewHeight" :length="2" :current="currentActiveTabbar"
			@pageChange="pageChange">
			<!-- 小说 -->
			<midAreaItem :refresh="false" @onScrollToLower="getNovelList">
				<view class="result-container">
					<l-empty v-if="searchResultList.novel.list.length==0" description="没有找到相关内容" />
					<template v-else>
						<novelList :novelList="searchResultList.novel.list" @onLayout="onNovelListLayout" />
						<uv-load-more v-if="searchResultList.novel.listHeight>scrollViewHeight"
							:status="searchResultList.novel.loadingParam.status"
							:loading-text="searchResultList.novel.loadingParam.loadingText"
							:loadmore-text="searchResultList.novel.loadingParam.loadmoreText"
							:nomore-text="searchResultList.novel.loadingParam.nomoreText" />
					</template>
				</view>
			</midAreaItem>
			<!-- 漫画区 -->
			<midAreaItem :refresh="false">
				<l-empty v-if="searchResultList.comic.list.length==0" description="没有找到相关内容" />
				<template v-else>
					<novelList :novelList="searchResultList.comic.list" @onLayout="onComicListLayout" />
					<uv-load-more v-if="searchResultList.comic.listHeight>scrollViewHeight"
						:status="searchResultList.comic.loadingParam.status"
						:loading-text="searchResultList.comic.loadingParam.loadingText"
						:loadmore-text="searchResultList.comic.loadingParam.loadmoreText"
						:nomore-text="searchResultList.comic.loadingParam.nomoreText" />
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
	import topTabbar from "../../../components/common/top-tabbar/top-tabbar.vue"
	import novelList from '../../../components/common/novel-list.vue';
	import getSelectorInfo from '../../../utiles/getSelectorInfo';
	import midArea from '../../../components/home/mid-area/mid-area.vue';
	import midAreaItem from '../../../components/home/mid-area/mid-area-item.vue';
	import useSlide from '../../../hooks/useSlide.js'
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
			loadingParam: {
				status: 'loading',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了'
			}
		},
		comic: {
			size: 10,
			offset: 0,
			list: [],
			listHeight: 0,
			loadingParam: {
				status: 'loading',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了'
			}
		}
	})
	// 显示列表高度
	const scrollViewHeight = ref(0)
	// 监听页面变化
	watch(currentPage, async (newVal) => {
		if (!newVal.hasShown) {
			if (newVal.name == 'comic') {
				const searchComicRes = await searchComic(props.keyword, 0, 10);
				searchResultList[newVal.name].list = searchComicRes.data.data.map(item => ({
					...item,
					name: parseSearchResult(item.name, props.keyword),
					type: "comic"
				}))
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
		if (searchResultList[currentPageName].loadingParam.status == 'nomore') return
		let searchRes = null;
		if (currentPageName == "novel") {
			searchRes = await searchNovel(props.keyword, props.keyword, searchResultList[currentPageName].offset,
				searchResultList[currentPageName].size)
		} else if (currentPageName == "novel") {
			searchRes = await searchComic()
		}
		const list = searchRes.data.data.map(item => ({
			...item,
			name: parseSearchResult(item.name, props.keyword),
			type: currentPageName
		}))
		if (list.length == 0) {
			searchResultList[currentPageName].loadingParam.status = 'nomore'
		}
		searchResultList[currentPageName].list = [...searchResultList[currentPageName].list, ...list]
	}
	// 搜索列表触底事件
	const onReachBottom = async () => {
		searchResultList[currentPage.value.name].offset += searchResultList[currentPage.value.name].size
		await getNovelList()
	}
	// 小说列表布局
	const onNovelListLayout = (e) => {
		searchResultList.novel.listHeight = e.height;
	}
	// 漫画列表布局
	const onComicListLayout = (e) => {
		searchResultList.comic.listHeight = e.height;
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
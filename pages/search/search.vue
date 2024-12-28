<template>
	<view class="search-page" :style="{backgroundColor:currentTheme.mainBcg}">
		<view class="search-box">
			<view class="status-bar"></view>
			<uv-search :actionStyle="{color:theme=='light' ?'#000':'#fff'}" :bgColor="currentTheme.componentBcg"
				@change="handelChange" height="38" clearabled @custom="handelSearch" @search="handelSearch" focus
				:placeholder="placeholder" v-model="searchVal">
			</uv-search>
		</view>
		<!-- 搜索提示内容区 -->
		<scroll-view :scroll-y="true" class="search-result" :style="{height:searchResultHeight+'px'}"
			v-if="searchResult.length>0&&!issearchValEmpty&&!showResult">
			<view @tap="goToDetail(item)" class="search-item" v-for="item in searchResult" :key="item.id">
				<uv-icon size="22" name="search" color="#ccc"></uv-icon>
				<view class="name" v-html="item.name" :style="{color:currentTheme.mainFontColor}"></view>
				<view class="type">{{chineseName[item.type]}}</view>
			</view>
		</scroll-view>
		<!-- 默认显示 -->
		<defaultVue v-if="(!showResult&&searchResult.length==0)||(issearchValEmpty&&!showResult)"
			@handelSearch="handelSearch" @clearHistory="clearHistory" :hotSearchList="hotSearchList"
			:historyList="searchHistoryList" />
		<!-- 搜索结果 -->
		<resultVue v-if="showResult" :keyword="issearchValEmpty?placeholder:searchVal"
			:scrollHeight="searchResultHeight" />
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
		getCurrentInstance,
		watch
	} from 'vue'
	import {
		onLoad,
		onBackPress
	} from '@dcloudio/uni-app'
	import {
		getHotComicList,
		getHotNovelList,
		searchBook,
		searchNovel
	} from '@/api';
	import defaultVue from './components/default.vue';
	import getSystemInfo from '@/utiles/getSystemInfo';
	import getSelectorInfo from '@/utiles/getSelectorInfo';
	import useSearchHistory from './hooks/useSearchHistory';
	import resultVue from './components/result.vue';
	import commonHook from '@/hooks/common';
	import useTheme from '@/hooks/useTheme';
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		goToDetail
	} = commonHook()
	import {
		parseSearchResult
	} from './utils';
	const {
		searchHistoryList,
		addSearchHistory,
		clearHistory,
	} = useSearchHistory()
	const chineseName = {
		novel: "小说",
		comic: "漫画"
	}
	// 当前推荐小说
	const placeholder = ref('')
	// 搜索框的值
	const searchVal = ref('')
	// 搜索结果区高度
	const searchResultHeight = ref(0)
	// 是否展示搜索结果页面
	const showResult = ref(false)
	onLoad(async ({
		novel_name = '',
	}) => {
		placeholder.value = novel_name
		const novelHotRes = await getHotNovelList()
		const comicHotRes = await getHotComicList()
		hotSearchList.value = [...novelHotRes.data.data, ...comicHotRes.data.data]
	})
	onMounted(async () => {
		const instance = getCurrentInstance()
		const systemInfo = await getSystemInfo()
		const headerInfo = await getSelectorInfo(instance, '.search-box')
		searchResultHeight.value = systemInfo.windowHeight - headerInfo.height - 10
	})
	// 监听返回事件
	onBackPress((e) => {
		if (showResult.value) {
			showResult.value = false
			searchVal.value = ''
			searchResult.value = []
			return true
		}
	})
	// 热门搜索
	const hotSearchList = ref([])
	// 搜索框是否为空
	const issearchValEmpty = computed(() => {
		return searchVal.value.length == 0 && searchVal.value.trim() == ''
	})
	// 搜索小说
	const handelSearch = (keyword) => {
		if (keyword.length == 0 && keyword.trim() == '') {
			if (placeholder.value.length == 0 && placeholder.value.trim() == '') return
			searchVal.value = keyword
			addSearchHistory(placeholder.value)
		} else {
			const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, '')
			const newKeyword = removeHtmlTags(keyword)
			searchVal.value = newKeyword
			addSearchHistory(newKeyword)
		}
		showResult.value = true
		searchResult.value = []
	}
	// 搜索结果
	const searchResult = ref([])
	// 搜索框输入事件
	const handelChange = async () => {
		showResult.value = false
		const searchRes = await searchBook(searchVal.value, searchVal.value, 0, 20)
		searchResult.value = searchRes.data.data.map(item => {
			return {
				...item,
				name: parseSearchResult(item.name, searchVal.value)
			}
		})
	}
</script>

<style lang="scss" scoped>
	.search-page {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;

		.search-box {
			padding: 0 20rpx;
		}

		.search-result {

			.search-item {
				padding: 20rpx 30rpx;
				display: flex;
				align-items: center;
				gap: 10rpx;
				font-size: 28rpx;

				.type {
					font-size: 20rpx;
					padding: 4rpx 6rpx;
					border-radius: 4rpx;
					background-color: #F8B157;
					color: #fff;
				}
			}
		}
	}
</style>
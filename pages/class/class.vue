<template>
	<view class="class-page" :style="{backgroundColor:currentTheme.mainBcg}">
		<view :class="['header',`${theme}-bcg`]">
			<view class="status-bar"></view>
			<view class="action-container">
				<view class="class-list">
					<view @tap="currentActiveTabbar=index"
						:class="['item', currentActiveTabbar==index?theme+'-active':'']"
						v-for="item,index in tabBarList" :key="index">{{item}}</view>
				</view>
				<view class="btn">
					<uv-icon @tap="goToSearch" size="60rpx" name="search"></uv-icon>
				</view>
			</view>
		</view>
		<midAreaVue :background="currentTheme.mainBcg" :height="classContainerHeight" :length="tabBarList.length"
			:pageName="currentPage.name" :current="currentActiveTabbar" @pageChange="pageChange">
			<midAreaItemVue v-for="page,index in pageList" :key="index" :refresh="false" :customStyle="{padding:0}">
				<classbodyVue @scrolltolower="getMoreClassList" @changeType="changeType"
					:classContainerHeight="classContainerHeight"
					:classItemList="novelClassList[page.name].classItemList" :active="novelClassList[page.name].active"
					:bookList="page.name=='novel'?novelList:comicList" :loadingStatus="loadingStatus">
				</classbodyVue>
			</midAreaItemVue>
		</midAreaVue>
	</view>
</template>

<script setup>
	import useSlider from "@/hooks/useSlide.js"
	import midAreaVue from "@/components/mid-area/mid-area.vue"
	import midAreaItemVue from "@/components/mid-area/mid-area-item.vue"
	import {
		getCurrentInstance,
		onMounted,
		ref,
		reactive,
		computed,
		watch
	} from "vue"
	import getSystemInfo from "../../utiles/getSystemInfo"
	import getSelectorInfo from "../../utiles/getSelectorInfo"
	import classbodyVue from "./components/classbody.vue"
	import {
		getComicAllClass,
		getComicByGenre,
		getNovelAllClass,
		getNovelByGenre
	} from "../../api"
	import useTheme from "@/hooks/useTheme"
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		tabBarList,
		currentPage,
		currentActiveTabbar,
		pageChange,
		handelTopChange,
		pageList
	} = useSlider()
	const instance = getCurrentInstance()
	const classContainerHeight = ref(0)
	const novelClassList = reactive({
		novel: {
			classItemList: [],
			active: 0,
			bookList: []
		},
		comic: {
			classItemList: [],
			active: 0,
			bookList: []
		}
	})
	// 监听页面变化
	watch(currentPage, async (newVal) => {
		if (!newVal.hasShown) {
			if (newVal.name !== pageList.value[0].name) {
				await pageFirstShow()
			}
			pageList.value[currentActiveTabbar.value] = {
				...newVal,
				hasShown: true,
			}
		}
	})
	// 当前小说列表
	const novelList = computed(() => novelClassList.novel.bookList[novelClassList.novel.active]
		?.list)
	// 当前漫画列表
	const comicList = computed(() => novelClassList.comic.bookList[novelClassList.comic.active]
		?.list)
	// 漫画列表加载状态
	const loadingStatus = computed(() => {
		const pageName = currentPage.value.name
		const activeIndex = novelClassList[pageName].active
		return novelClassList[pageName].bookList[activeIndex]?.loadingStadus
	})
	onMounted(async () => {
		const sysInfo = await getSystemInfo();
		const headerInfo = await getSelectorInfo(instance, ".header")
		classContainerHeight.value = sysInfo.windowHeight - headerInfo.height;
		await pageFirstShow()
	})
	// 页面第一次加载
	const pageFirstShow = async () => {
		let novelClassRes
		let novelListRes
		const currentPageName = currentPage.value.name
		if (currentPageName == 'novel') {
			novelClassRes = await getNovelAllClass()
			novelListRes = await getNovelByGenre(novelClassRes.data.data[0], 10, 0)
		} else if (currentPageName == 'comic') {
			novelClassRes = await getComicAllClass()
			novelListRes = await getComicByGenre(novelClassRes.data.data[0], 10, 0)
		}
		novelClassList[currentPageName].classItemList = novelClassRes.data.data;
		novelClassList[currentPageName].bookList[novelClassList[currentPageName].active] = {
			size: 10,
			offset: 0,
			loadingStadus: "loading",
			list: novelListRes.data.data.map(item => ({
				...item,
				type: currentPageName,
			}))
		}
	}
	// 切换类别
	const changeType = async ({
		index,
		className
	}) => {
		const pageName = currentPage.value.name
		novelClassList[pageName].active = index
		// 如果没有加载分类内容，请求分类内容
		if (novelClassList[pageName].bookList[index]) return
		let novelListRes
		if (pageName == "novel") {
			novelListRes = await getNovelByGenre(className, 10, 0)
		} else if (pageName == "comic") {
			novelListRes = await getComicByGenre(className, 10, 0)
		}
		novelClassList[pageName].bookList[index] = {
			size: 10,
			offset: 0,
			loadingStadus: "loading",
			list: novelListRes.data.data.map(item => ({
				...item,
				type: pageName,
			}))
		}
	}
	// 页面触底加载更多
	const getMoreClassList = async () => {
		if (loadingStatus.value == "nomore") return
		const pageName = currentPage.value.name
		const activeIndex = novelClassList[pageName].active
		const className = novelClassList[pageName].classItemList[activeIndex]
		novelClassList[pageName].bookList[activeIndex].offset += novelClassList[pageName].bookList[activeIndex]
			.size
		let novelListRes
		if (pageName == "novel") {
			novelListRes = await getNovelByGenre(className, 10, novelClassList[pageName].bookList[activeIndex]
				.offset)
		} else if (pageName == "comic") {
			novelListRes = await getComicByGenre(className, 10, novelClassList[pageName].bookList[activeIndex]
				.offset)
		}
		if (novelListRes.data.data.length === 0) {
			novelClassList[pageName].bookList[activeIndex].loadingStadus = "nomore"
			return
		}
		novelClassList[pageName].bookList[activeIndex].list = [
			...novelClassList[pageName].bookList[activeIndex].list,
			...novelListRes.data.data
		]
	}
	const goToSearch = () => {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}
</script>

<style lang="scss" scoped>
	.class-page {
		width: 100vw;
		height: 100vh;

		.light-bcg {
			background-image: $linear-color;
			background-color: none;
		}

		.dark-bcg {
			background-color: #1A1A1A;
		}

		.header {
			.action-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;

				.class-list {
					height: 120rpx;
					display: flex;
					align-items: center;
					gap: 60rpx;

					.light-active {
						transform: scale(1.2);
						color: #000 !important;
					}

					.dark-active {
						transform: scale(1.2);
						color: #fff !important;
					}

					.item {
						transition: all 0.3s;
						font-size: 32rpx;
						color: $gray-color;
					}
				}

				.btn {
					display: flex;
					gap: 30rpx;
				}
			}

		}
	}
</style>
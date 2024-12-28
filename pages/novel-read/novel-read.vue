<template>
	<view class="read-page" :style="{backgroundColor:theme.backgroundColor}">
		<!-- 遮罩 -->
		<view class="mask" v-if="maskShow" @tap="closeMenu"></view>
		<!-- 加载页 -->
		<pageLoadingVue :status="loadError?'error':'loading'" @reload="reload" v-if="isLoading"
			:fontColor="theme.contentColor" :backgroundColor="theme.backgroundColor">
		</pageLoadingVue>
		<readTop :chapterName="currentChapter?.chapter_name" />
		<!-- 内容区 -->
		<scroll-view @scroll="handelScroll" v-if="chapterInfo.chapterList.length>0" :scroll-top="offsetY"
			class="content-contanier" :style="{height:contentHeight+'px'}" scroll-y="true">
			<view class="content" :style="{lineHeight:config.lineHeight}">
				<view @tap="handelShowMenu" class="read-content"
					:style="{color:theme.contentColor ,fontSize:config.fontSize+'px'}" v-html="currentChapter?.content">
				</view>
				<view class="btn-group">
					<button :style="{backgroundColor:theme.configBtnBcg,color:theme.contentColor}" @tap="prevChapter"
						:disabled="currentChapter?.chapter_n==1">上一章</button>
					<button :style="{backgroundColor:theme.configBtnBcg,color:theme.contentColor}"
						@tap="btnOpenChapterContalog">
						目录
					</button>
					<button :style="{backgroundColor:theme.configBtnBcg,color:theme.contentColor}" @tap="nextChapter"
						:disabled="currentChapter?.chapter_n>=chapterInfo.chapterList[chapterInfo.chapterList.length-1]?.chapter_n">下一章</button>
				</view>
			</view>
		</scroll-view>
		<!-- 目录弹出层 -->
		<catalogpopup :chapterNameScrollHeight="chapterNameScrollHeight" :chapterNameList="chapterInfo.chapterNameList"
			:catalogShow="catalogShow" :theme="theme" :currentChapter_n="currentChapter?.chapter_n"
			@changeChapter="changeChapter" />
		<!-- 底部弹出层 -->
		<bottomPopup :novel_id="Number(config.novel_id)" :currentChapter_n="currentChapter?.chapter_n"
			@openConfig="openConfigMenu" @openChapterContalog="openChapterContalog" @nextChapter="nextChapter"
			@prevChapter="prevChapter" @changeDarkOrBright="changeTheme" @handelSliderChange="handelSliderChange"
			:menuShow="menuShow" :themeStyle="theme" :isDarkTheme="config.currentTheme=='dark'"
			:chapterNameList="chapterInfo.chapterNameList" :currentChapterName="currentChapter?.chapter_name" />
		<!-- 设置弹出层 -->
		<configPopup :fontSize="config.fontSize" :show="configShow" :themeStyle="theme" @changeFontSize="changeFontSize"
			:themeList="themeNames" @changeTheme="changeTheme" @setLineHeight="setLineHeight"
			:currentLineHeight="config.lineHeight" />
		<readBottom :theme="theme" :currentTime="currentTime" :batteryInfo="batteryInfo" />
	</view>
</template>
<script setup>
	import readTop from './components/read-top.vue';
	import readBottom from './components/read-bottom.vue';
	import catalogpopup from './components/catalog-popup.vue';
	import bottomPopup from './components/bottom-popup.vue';
	import configPopup from './components/config-popup.vue';
	import usePopup from './hook/usePopup';
	import pageLoadingVue from '@/components/loading/page-loading.vue';
	import {
		onLoad,
		onUnload,
		onHide
	} from '@dcloudio/uni-app'
	import {
		getChapterContent,
		getNovelChapters,
		insertChapter,
		insertHistory,
		isExistHistory,
		updateHistory,
	} from '@/api';
	import getSelectorInfo from "@/utiles/getSelectorInfo.js"
	import getSystemInfo from '@/utiles/getSystemInfo.js'
	import {
		ref,
		onMounted,
		getCurrentInstance,
		reactive,
		nextTick,
		computed,
		watch
	} from 'vue'
	import getBottomInfo from "@/utiles/getBottomInfo.js"
	import useConfig from './hook/useConfig';
	import {
		useStore
	} from 'vuex'
	import {
		getChapterList
	} from '@/hooks/useCache';
	// 菜单弹出hook
	const {
		catalogShow,
		menuShow,
		maskShow,
		configShow,
		handelShowMenu,
		closeMenu,
		openConfigMenu
	} = usePopup()
	// 底部信息hook
	const {
		currentTime,
		batteryInfo
	} = getBottomInfo()
	// 阅读设置hook
	const {
		theme,
		config,
		changeFontSize,
		themeNames,
		setLineHeight,
		changeTheme
	} = useConfig()
	const store = useStore()
	const novel = computed(() => store.state.currentNovelDetail)
	// 是否加载结束
	const isLoading = ref(true)
	const loadError = ref(false)
	const loadErrorOption = {
		fun: null,
		param: null
	}
	// 阅读区宽度
	const contentWidth = ref(0)
	// 页面实例
	const instance = ref(null)
	// content偏移
	const offsetY = ref(0)
	// 章节信息
	const chapterInfo = reactive({
		chapterList: [],
		currentIndex: 0,
		chapterNameList: []
	})
	// 当前章节内容
	const currentChapter = computed(() => {
		return chapterInfo.chapterList[chapterInfo.currentIndex]
	})
	// 章节目录高度
	const chapterNameScrollHeight = ref(0)
	onLoad(async ({
		novel_id,
		appoint = false,
		chapter_n
	}) => {
		let currentChapter_n = chapter_n
		if (!JSON.parse(appoint)) {
			// #ifdef APP-PLUS
			const result = await isExistHistory(novel_id, 'novel')
			if (result.length != 0) {
				currentChapter_n = result[0].chapter_n
				offsetY.value = result[0].offsetY
			}
			// #endif
		}
		config.novel_id = novel_id
		await init(currentChapter_n)
	})
	// 内容区高度
	const contentHeight = ref(0)
	onMounted(async () => {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(true)
		// #endif
		instance.value = getCurrentInstance()
		const sysInfo = await getSystemInfo()
		chapterNameScrollHeight.value = sysInfo.screenHeight - sysInfo.statusBarHeight
	})
	// 初始化
	const init = async (currentChapter_n) => {
		try {
			const chapterContentRes = await getChapterContent(config.novel_id, currentChapter_n)
			chapterInfo.chapterList = chapterContentRes.data.data
			await new Promise((resolve, reject) => {
				setTimeout(async () => {
					try {
						chapterInfo.chapterNameList = await getChapterList(config.novel_id);
						await calculateContentHeight();
						resolve();
					} catch (error) {
						reject(error);
					}
				}, 300);
			});
			isLoading.value = false
		} catch (error) {
			loadErrorOption.fun = init
			loadErrorOption.param = currentChapter_n
			loadError.value = true
		}
	}
	onUnload(() => {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(false)
		saveHistory()
		// #endif
	})
	// 保存历史记录
	const saveHistory = async () => {
		const result = await isExistHistory(config.novel_id, 'novel')
		if (result.length != 0) {
			await updateHistory(
				config.novel_id,
				currentChapter.value.chapter_n,
				currentChapter.value.chapter_name, offsetY.value
			)
		} else {
			const param = {
				novel_id: config.novel_id,
				offsetY: offsetY.value,
				type: "novel",
				...currentChapter.value,
				...novel.value
			}
			await insertHistory(param)
		}
	}
	onHide(async () => {
		// #ifdef APP-PLUS
		saveHistory()
		// #endif
	})
	// 计算内容区高度
	const calculateContentHeight = async () => {
		const info = await getSelectorInfo(instance.value, ".read-bottom")
		const info2 = await getSelectorInfo(instance.value, '.read-top')
		const sysInfo = await getSystemInfo()
		contentHeight.value = sysInfo.screenHeight - info.height - info2.height - sysInfo.statusBarHeight
	}
	// 上一章
	const prevChapter = async () => {
		try {
			if (chapterInfo.currentIndex == 0 && currentChapter.value.chapter_n != 1) {
				isLoading.value = true
				// 章节起始
				const startChapter_n = currentChapter.value.chapter_n - 10 < 0 ? 1 :
					currentChapter.value.chapter_n - 10
				// 切换的目标章节
				const targetChapter_n = currentChapter.value.chapter_n - 1
				const res = await getChapterContent(config.novel_id, startChapter_n)
				chapterInfo.chapterList = res.data.data
				// 目标索引
				const targetIndex = chapterInfo.chapterList.findIndex(item => item.chapter_n == targetChapter_n)
				chapterInfo.currentIndex = targetIndex
				isLoading.value = false
			} else {
				if (currentChapter.value.chapter_n != 1) {
					chapterInfo.currentIndex -= 1
				}
			}
			nextTick(() => {
				offsetY.value = 0
			})
		} catch (error) {
			loadErrorOption.fun = prevChapter
			loadErrorOption.param = null
			loadError.value = true
		}
	}
	// 下一章
	const nextChapter = async () => {
		try {
			const lastChapter_n = chapterInfo.chapterNameList[chapterInfo.chapterNameList.length - 1].chapter_n
			const targetChapter_n = currentChapter.value.chapter_n + 1
			if (targetChapter_n > lastChapter_n) {
				uni.showToast({
					icon: "none",
					title: '已经是最后一章了'
				})
				return
			}
			if (chapterInfo.currentIndex == 9) {
				isLoading.value = true
				let startChapter_n = targetChapter_n
				if (currentChapter.value.chapter_n + 10 >= lastChapter_n) {
					startChapter_n = lastChapter_n - 10
				}
				const res = await getChapterContent(config.novel_id, startChapter_n)
				chapterInfo.chapterList = res.data.data
				const targetIndex = chapterInfo.chapterList.findIndex(item => item.chapter_n == targetChapter_n)
				chapterInfo.currentIndex = targetIndex
				isLoading.value = false
			} else {
				chapterInfo.currentIndex += 1
			}
			nextTick(() => {
				offsetY.value = 0
			})
		} catch (error) {
			loadErrorOption.fun = nextChapter
			loadErrorOption.param = null
			loadError.value = true
		}
	}
	// 打开章节弹出层
	const openChapterContalog = () => {
		menuShow.value = false
		setTimeout(() => {
			catalogShow.value = true
		}, 300)
	}
	// 用目录按钮打开章节列表
	const btnOpenChapterContalog = () => {
		catalogShow.value = true
		maskShow.value = true
	}
	// 切换章节
	const changeChapter = async (chapter_n) => {
		try {
			isLoading.value = true
			const res = await getChapterContent(config.novel_id, chapter_n)
			chapterInfo.chapterList = res.data.data
			chapterInfo.currentIndex = 0
			closeMenu()
			setTimeout(() => {
				isLoading.value = false
				offsetY.value = 0
			}, 300)
		} catch (error) {
			loadErrorOption.fun = changeChapter
			loadErrorOption.param = chapter_n
			loadError.value = true
		}
	}
	// 章节slidebar
	const handelSliderChange = async (chapter_n) => {
		try {
			isLoading.value = true
			const res = await getChapterContent(config.novel_id, chapter_n + 1)
			chapterInfo.chapterList = res.data.data
			chapterInfo.currentIndex = 0
			offsetY.value = 0
			isLoading.value = false
		} catch (error) {
			loadErrorOption.fun = handelSliderChange
			loadErrorOption.param = chapter_n
			loadError.value = true
		}
	}
	// 处理内容区滚动事件
	const scrollTimer = ref(null)
	const handelScroll = (e) => {
		if (scrollTimer.value) {
			clearTimeout(scrollTimer.value)
		}
		scrollTimer.value = setTimeout(() => {
			offsetY.value = e.detail.scrollTop;
		}, 300)
	}
	const reload = async () => {
		loadError.value = false
		await loadErrorOption.fun(loadErrorOption.param)
	}
</script>
<style lang="scss">
	.read-content {
		h1 {
			text-align: center;
			font-size: 1.3em;
			margin-bottom: 20rpx;
		}

		p {
			text-indent: 2em;
			margin-bottom: 20rpx;
		}
	}

	.read-page {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		padding: 0 30rpx;

		.mask {
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 10;
		}

		.content-contanier {

			.content {
				width: 100%;

				.read-content {
					padding: 30rpx 0;
				}

				.btn-group {
					padding: 20rpx 0;
					display: flex;
					justify-content: space-between;
					gap: 20rpx;

					button {
						flex: 1;
					}
				}
			}
		}

		.show {
			transform: translate(0, 0) !important;
		}

		.bottom-menu {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 11;
			transform: translateY(100%);
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			padding: 20rpx 40rpx;
			transition: transform 0.3s;

			.chapter_tip {
				position: absolute;
				bottom: 110%;
				left: 50%;
				transform: translateX(-50%);
				padding: 20rpx 30rpx;
				background-color: #3D3D3D;
				border-radius: 100rpx;
				color: #707070;
				text-align: center;
				width: 70vw;

				.chapter_name {
					text-align: center;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			.slide {
				display: flex;
				// gap: 10rpx;
				align-items: center;

				.slide-box {
					flex: 1;
				}
			}

			.icon-btn {
				display: flex;
				justify-content: space-around;

				.icon-item {
					font-size: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 10rpx;
				}
			}
		}


	}
</style>
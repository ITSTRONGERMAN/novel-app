<template>
	<view class="browse-history-contanier" :style="{backgroundColor:currentTheme.mainBcg}">
		<!-- header -->
		<view class="header" :style="{backgroundColor:currentTheme.secondaryBcg,border:theme=='light'?'':'none'}">
			<view class="status-bar"></view>
			<view class="action-list" :style="{color:currentTheme.mainFontColor}">
				<view class="btn">
					<view v-if="isEditMode" @tap="isEditMode=false">取消</view>
					<uv-icon v-else name="arrow-left" size="48rpx" @tap="back"></uv-icon>
				</view>
				<view class="title">浏览历史</view>
				<view class="btn" style="text-align: right;">
					<view v-if="isEditMode" @tap="handelSelectAll">
						{{checkedCount==historyList[currentPage.name].list.length?"取消":""}}全选
					</view>
				</view>
			</view>
			<view class="class-list" v-if="!isEditMode" :style="{color:currentTheme.mainFontColor}">
				<view class="l">
					<view @tap="currentActiveTabbar=index"
						:class="['class-item',currentActiveTabbar==index?theme+'-active':'']"
						v-for="className,index in tabBarList" :key="index">
						{{className}}
					</view>
				</view>
				<view class="r"
					:style="{color:historyList[currentPage.name].list.length==0?currentTheme.secondaryFontColor:currentTheme.mainFontColor}"
					@tap="enterEditMode">编辑</view>
			</view>
		</view>
		<midAreaVue :enableSlide="!isEditMode" :background="theme=='light'?'#fff':currentTheme.mainBcg"
			:height="listHeight" :length="tabBarList.length" :current="currentActiveTabbar" @pageChange="pageChange">
			<midAreaItemVue :refresh="false" v-for="page,index in pageList" :key="index">
				<historyListVue @addToBookShell="addToBookShell" @selectBook="selectBook"
					@handelLongPress="handelLongPress" :isEditMode="isEditMode"
					:historyList="historyList[page.name].list"></historyListVue>
			</midAreaItemVue>
		</midAreaVue>
		<!-- 底部操纵栏 -->
		<view :style="{backgroundColor:currentTheme.secondaryBcg,border:theme=='light'?'':'none'}"
			class="operation-contaniner" v-if="!isMounted||isEditMode">
			<view class="l" @tap="addToBookShell(null,1)" :style="{color:currentTheme.mainFontColor}">
				<uv-icon name="jiarushujia" custom-prefix="custom-icon" size="48rpx"></uv-icon>
				<view class="txt">
					加入书架
				</view>
				<view class="count">({{checkedCount}})</view>
			</view>
			<view class="r" @tap="modal.open()">
				<uv-icon name="trash" size="52rpx" color="#F66B32"></uv-icon>
				<view class="txt" style="color: #F66B32;">
					删除
				</view>
				<view style="color: #F66B32;" class="count">({{checkedCount}})</view>
			</view>
		</view>
	</view>
	<modalVue btnReverse ref="modal" title='确认删除浏览历史吗<br/>删除浏览历史将丢失你的阅读记录' @confirm="deleteHistoryList"
		confirmText="确认">
	</modalVue>
</template>

<script setup>
	import {
		getCurrentInstance,
		onMounted,
		reactive,
		ref,
		computed,
		watch
	} from 'vue'
	import {
		onBackPress
	} from '@dcloudio/uni-app'
	import {
		deleteHistoryListById,
		getHistoryList,
		insterBookShell,
		isInBookShell
	} from '@/api';
	import useSlider from "@/hooks/useSlide.js"
	import getSystemInfo from '@/utiles/getSystemInfo';
	import getSelectorInfo from '@/utiles/getSelectorInfo';
	import midAreaVue from "@/components/mid-area/mid-area.vue"
	import midAreaItemVue from '@/components/mid-area/mid-area-item.vue';
	import historyListVue from './components/history-list.vue';
	import modalVue from '@/components/modal/modal.vue';
	import useTheme from "@/hooks/useTheme.js"
	// import pageLoadingVue from '@/components/loading/page-loading.vue';
	import {
		refactorHistoryList
	} from './utils';
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
	const modal = ref(null)
	pageList.value = [{
		name: "all",
		alias: "全部",
		hasShown: true
	}, {
		name: "novel",
		alias: "小说",
		hasShown: false
	}, {
		name: "comic",
		alias: "漫画",
		hasShown: false
	}]
	const listHeight = ref(0)
	const operationContanierHeight = ref(0)
	const instance = getCurrentInstance()
	// 所有的历史列表
	const historyList = reactive({
		all: {
			size: 10,
			offset: 0,
			list: []
		},
		novel: {
			size: 10,
			offset: 0,
			list: []
		},
		comic: {
			size: 10,
			offset: 0,
			list: []
		}
	})
	// 已经选择的数量
	const checkedCount = computed(() => historyList[currentPage.value.name].list.filter(item => item.checked).length)
	// 观察页面切换
	watch(currentPage, async (newVal) => {
		if (!newVal.hasShown) {
			if (newVal.name !== pageList.value[0].name) {
				await getHistories()
			}
			pageList.value[currentActiveTabbar.value] = {
				...newVal,
				hasShown: true,
			}
		}
	})
	// 是否编辑模式
	const isEditMode = ref(false)
	// 观察模式切换
	watch(isEditMode, (newVal) => {
		if (!newVal) {
			historyList[currentPage.value.name].list =
				historyList[currentPage.value.name]
				.list.
			map(item => ({
				...item,
				checked: false
			}))
		}
	})
	const isMounted = ref(false)
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		const headerInfo = await getSelectorInfo(instance, ".header")
		const operationInfo = await getSelectorInfo(instance, ".operation-contaniner")
		operationContanierHeight.value = operationInfo.height
		listHeight.value = sysInfo.windowHeight - headerInfo.height
		isMounted.value = true
		await getHistories()
	})
	// 获取浏览历史
	const getHistories = async () => {
		const pageName = currentPage.value.name
		const {
			size,
			offset
		} = historyList[pageName]
		const list = await getHistoryList(pageName, size, offset)
		const newList = await Promise.all(list.map(async item => {
			const isIn = await isInBookShell(item.novel_id, item.type)
			return {
				...item,
				checked: false,
				isInBookShell: isIn
			}
		}))
		historyList[pageName].list = [...historyList[pageName].list, ...newList]
	}
	// 监听退出页面
	onBackPress(() => {
		if (isEditMode.value) {
			isEditMode.value = false
			return true
		}
	})
	// 长按进入编辑模式
	const handelLongPress = (index) => {
		if (!isEditMode.value) {
			historyList[currentPage.value.name].list[index].checked = true
			isEditMode.value = true
			uni.vibrateShort()
		}

	}
	// 全选或取消全选
	const handelSelectAll = () => {
		const pageName = currentPage.value.name
		const checked = checkedCount.value == historyList[pageName].list.length
		historyList[pageName].list = historyList[pageName].list.map(item => ({
			...item,
			checked: !checked
		}))
	}
	// 选择书本
	const selectBook = (index) => {
		if (isEditMode.value) {
			historyList[currentPage.value.name].list[index].checked = !historyList[currentPage.value.name]
				.list[index]
				.checked
		}
	}
	// 删除历史
	const deleteHistoryList = async () => {
		const pageName = currentPage.value.name
		const selectedBookId = historyList[pageName].list.filter(item => item.checked).map(item => item.id)
		for await (const id of selectedBookId) {
			await deleteHistoryListById(id)
		}
		for (const className of Object.keys(historyList)) {
			historyList[className].list = historyList[className].list.filter(item => !selectedBookId
				.includes(item.id))
		}
		isEditMode.value = false
		uni.showToast({
			icon: 'none',
			title: "删除成功"
		})
	}
	// 添加到书架
	const addToBookShell = async (book = null, action = 0) => {
		let finished = false
		const pageName = currentPage.value.name
		if (action === 0) {
			await insterBookShell({
				...book
			})
			const pages = pageList.value.map(item => item.name)
			for (const pageName of pages) {
				historyList[pageName].list = await refactorHistoryList(
					historyList[pageName].list,
					[book.id]
				)
			}
			finished = true
		} else if (action === 1) {
			const selectedBook = historyList[pageName].list.filter(item => item.checked)
			const isAllInBookShell = selectedBook.every(item => item.isInBookShell)
			const selectedBookId = selectedBook.map(item => item.id)
			if (!isAllInBookShell) {
				const pages = pageList.value.map(item => item.name)
				for (const pageName of pages) {
					historyList[pageName].list = await refactorHistoryList(
						historyList[pageName].list,
						selectedBookId
					)
				}
				for await (const book of selectedBook) {
					if (!book.isInBookShell) {
						await insterBookShell({
							...book
						})
					}
				}
			}
			finished = !isAllInBookShell
			isEditMode.value = false
		}
		if (finished) {
			uni.showToast({
				icon: 'none',
				title: '加入书架成功'
			})
		} else {
			uni.showToast({
				icon: 'none',
				title: '当前已在书架'
			})
		}
	}
	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}
	// 进入编辑模式
	const enterEditMode = () => {
		if (historyList[currentPage.value.name].list.length == 0) return
		isEditMode.value = true
	}
</script>

<style lang="scss" scoped>
	.browse-history-contanier {
		height: 100vh;
		width: 100vw;

		.header {
			border-bottom: 2rpx solid #eee;
			padding-bottom: 20rpx;

			.action-list {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx;
				align-items: center;
				font-size: 32rpx;


				.btn {
					width: 144rpx;
				}
			}

			.class-list {
				display: flex;
				padding: 10rpx 30rpx;
				font-size: 30rpx;

				.light-active {
					color: #000 !important;
				}

				.dark-active {
					color: #fff !important;
				}

				.l {
					display: flex;
					gap: 30rpx;
					font-weight: 500;

					.class-item {
						color: $font-gray-color;
					}
				}

				.r {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					font-weight: 500;
				}
			}
		}

		.operation-contaniner {
			border-top: 2rpx solid #eee;
			width: 100vw;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #FAFAFA;
			display: flex;
			padding: 30rpx 0;

			.txt {
				font-size: 32rpx;
			}

			.l,
			.r {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 10rpx;
			}

			.count {
				width: 50rpx;
			}
		}
	}
</style>
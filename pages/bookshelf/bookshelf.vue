<template>
	<view class="bookshell-page">
		<view class="header">
			<view class="status-bar"></view>
			<view class="action-container">
				<view class="class-list">
					<view @tap="currentActiveTabbar=index" :class="['item', currentActiveTabbar==index?'active':'']"
						v-for="item,index in bookClasses" :key="index">{{item}}</view>
				</view>
				<view class="btn">
					<uv-icon @tap="goToSearch" size="60rpx" name="search" color="#000"></uv-icon>
					<uv-icon @tap="changeLayoutStyle" size="60rpx" :name="isList?'list-dot':'grid'"
						color="#000"></uv-icon>
				</view>
			</view>
		</view>
		<midAreaVue background="#fff" :height="bookShellContainerHeight" :length="2" :current="currentActiveTabbar"
			@pageChange="pageChange">
			<mid-area-item-vue v-for="({key,value},index) in bookShellTitle" :key="index" :refresh="false"
				:customStyle="{ padding:0 }">
				<emptyVue @onNoDataBtn="onNoDataBtn" v-if="bookShellList[key].length==0" :desc="`书架暂无${value}`">
				</emptyVue>
				<template v-else>
					<rowVue :bookList="bookShellList[key]" @operate="handelAct" v-if="isList"></rowVue>
					<columnVue :bookList="bookShellList[key]" @operate="handelAct" v-else></columnVue>
				</template>
			</mid-area-item-vue>
		</midAreaVue>
		<!-- 书籍操作弹出层 -->
		<operationVue ref="popup" :currentBook="currentBook" @topUpBook="topUpBook" @confirmDelete="confirm">
		</operationVue>
	</view>
</template>

<script setup>
	import {
		getCurrentInstance,
		onMounted,
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		deleteFromBookShell,
		getBookShellList,
		isExistHistory,
		setTopInBookShell
	} from '../../api';
	import getSystemInfo from '../../utiles/getSystemInfo.js'
	import getSelectorInfo from '../../utiles/getSelectorInfo.js'
	import rowVue from './components/row.vue';
	import columnVue from './components/column.vue';
	import operationVue from './components/operation.vue';
	import emptyVue from './components/empty.vue';
	import midAreaVue from '../../components/home/mid-area/mid-area.vue';
	import midAreaItemVue from '../../components/home/mid-area/mid-area-item.vue';
	import {
		onShow
	} from '@dcloudio/uni-app'
	import novelListVue from '../../components/common/novel-list.vue';
	import useSlide from '../../hooks/useSlide';
	import EventBus from '../../utiles/eventBus';
	import {
		parseBookList
	} from './utils';
	const {
		currentActiveTabbar,
		pageChange,
		handelTopChange
	} = useSlide()
	// 是否列表布局
	const isList = ref(true)
	// 底部操作弹出层
	const popup = ref(null)
	// 确认移除书架
	const confirm = async () => {
		const key = bookShellTitle.value[currentActiveTabbar.value].key
		const deleteBook =
			await deleteFromBookShell(currentBook.value.novel_id, key)
		const bookIndex = bookShellList[key].findIndex(item => item.novel_id == currentBook.value
			.novel_id)
		bookShellList[key].splice(bookIndex, 1)
	}
	// 书架标题
	const bookShellTitle = ref([{
		key: "novel",
		value: '小说'
	}, {
		key: "comic",
		value: '漫画'
	}])
	// 分类
	const bookClasses = computed(() => bookShellTitle.value.map(item => item.value))
	// 书架列表
	const bookShellList = reactive({
		novel: [],
		comic: []
	})
	const currentBookShell = ref(0)
	onShow(async () => {
		const novelList = await getBookShellList();
		const comicList = await getBookShellList("comic")
		bookShellList.novel = await parseBookList(novelList, 'novel')
		bookShellList.comic = await parseBookList(comicList, 'comic')
	})
	// 书架区高度
	const bookShellContainerHeight = ref(0)
	onMounted(async () => {
		const instance = getCurrentInstance()
		const headerInfo = await getSelectorInfo(instance, '.header')
		const systemInfo = await getSystemInfo()
		bookShellContainerHeight.value = systemInfo.windowHeight - headerInfo.height
	})
	// 当前查看的书
	const currentBook = ref(null)
	const handelAct = (info) => {
		currentBook.value = info
		popup.value.open()
	}
	// 改变布局方式
	const changeLayoutStyle = () => {
		isList.value = !isList.value
	}
	// 前往搜索页
	const goToSearch = () => {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}
	// 点击没有数据按钮
	const onNoDataBtn = () => {
		EventBus.emit("changeTab", currentActiveTabbar.value)
	}
	// 置顶图书
	const topUpBook = async (bookInfo) => {
		const key = bookShellTitle.value[currentActiveTabbar.value].key
		const index = bookShellList[key].findIndex(item => item.id == bookInfo.id)
		const currentTop = bookShellList[key][index].top
		const newTop = currentTop == 1 ? 0 : 1
		bookShellList[key][index].top = newTop
		currentBook.value.top = newTop
		if (newTop == 1) bookShellList[key].unshift(...bookShellList[key].splice(index, 1))
		else bookShellList[key].push(...bookShellList[key].splice(index, 1))
		await setTopInBookShell(bookInfo.id, newTop)
	}
</script>

<style lang="scss" scoped>
	.bookshell-page {
		.header {
			background-image: $linear-color;

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

					.active {
						transform: scale(1.2);
						color: #000 !important;
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
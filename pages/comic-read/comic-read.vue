<template>
	<comicMenuVue @changeChapter="changeChapter" @reverseChapter="reverseChapter" :currentChapter_n="currentChapter_n"
		:chapterList="chapterList" :title="currentChapterTitle" ref="popMenu">
	</comicMenuVue>
	<timeVue :zIndex="isLoaded?9:0" :chapterImageInfo="chapterImageInfo"></timeVue>
	<pageLoadingVue v-if="!isLoaded" :backgroundColor="currentTheme.secondaryBcg"></pageLoadingVue>
	<view class="page" @tap.stop="handelOpenMenu">
		<z-paging :show-scrollbar="false" :fixed="false" @scrollTopChange="scrollTopChange" lower-threshold="500px"
			cell-height-mode="dynamic" :refresher-enabled="false" ref="virtualList" v-model="comicImageList"
			use-virtual-list @query="queryList">
			<uv-load-more status="loading" v-if="currentChapter_n!=1&&!hasChangedChapter" loading-text="努力加载中..." />
			<comicChapterContentVue @changeChapterInfo="changeChapterInfo" v-for="(chapter, index) in comicImageList"
				:id="`zp-id-${chapter?.zp_index}`" :key="chapter?.zp_index" :chapter="chapter">
			</comicChapterContentVue>
		</z-paging>
	</view>
</template>
<script setup>
	import {
		onUnload,
		onHide,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from "vuex"
	import {
		computed,
		getCurrentInstance,
		onMounted,
		ref,
		watch,
		onUnmounted
	} from 'vue'
	import comicImageVue from "./components/comic-image.vue";
	import comicChapterContentVue from "./components/comic-chapter.vue";
	import pageLoadingVue from "@/components/loading/page-loading.vue";
	import timeVue from "./components/time.vue";
	import comicMenuVue from "./components/comic-menu.vue";
	import {
		getComicChapters,
		getComicContent,
		insertHistory,
		isExistHistory,
		updateHistory
	} from "@/api";
	import getSystemInfo from "@/utiles/getSystemInfo";
	import getSelectorInfo from "@/utiles/getSelectorInfo";
	import useTheme from '@/hooks/useTheme';
	const {
		currentTheme,
		theme
	} = useTheme()
	const store = useStore()
	const virtualList = ref(null)
	// 当前观看漫画信息
	const comic = computed(() => store.state.currentNovelDetail)
	const curentComicName = ref(comic.value.name)
	// 漫画图片列表
	const comicImageList = ref([])
	const listLen = ref(0)
	// 当前设备宽度
	const device_width = ref(0)
	// 菜单
	const popMenu = ref(null)
	// 是否加载完毕
	const isLoaded = ref(false)
	// 当前观看章节
	const currentChapter_n = ref(0)
	// 当前菜单中的标题
	const currentChapterTitle = ref('')
	// 当前漫画章节列表
	const chapterList = ref([])
	// 屏幕高度
	const screenHeight = ref(0)
	// 滚动条高度
	const scrollTop = ref(0)
	onLoad(async ({
		comic_id,
		chapter_n,
		appoint = false
	}) => {
		if (!JSON.parse(appoint)) {
			const res = await isExistHistory(comic_id, 'comic')
			currentChapter_n.value = (res.length != 0 ? res[0].chapter_n : 1) - 1;
		} else {
			currentChapter_n.value = parseInt(chapter_n) - 1
		}
	})
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		device_width.value = sysInfo.windowWidth
		screenHeight.value = sysInfo.screenHeight
		const chapterRes = await getComicChapters(comic.value.id)
		chapterList.value = chapterRes.data.data
		// console.log(chapterList.value);
		// #ifdef APP
		plus.navigator.setFullscreen(true)
		plus.key.addEventListener("keydown", onVolumeKeyDown);
		// #endif
	})
	onUnmounted(() => {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(false)
		plus.key.removeEventListener('keydown', onVolumeKeyDown);
		plus.screen.lockOrientation('portrait-primary'); // 锁定竖屏
		saveHistory()
		// #endif
	})

	const saveHistory = async () => {
		const res = await isExistHistory(comic.value.id, 'comic');
		if (res.length == 0) {
			await insertHistory({
				novel_id: comic.value.id,
				offsetY: 0,
				chapter_n: currentChapter_n.value,
				chapter_name: chapterList.value[currentChapter_n.value - 1].chapter_name,
				type: "comic",
				...comic.value,
			})
		} else {
			await updateHistory(
				comic.value.id,
				currentChapter_n.value,
				chapterList.value[currentChapter_n.value - 1].chapter_name, 0,
				'comic'
			)
		}
	}
	onHide(() => {
		saveHistory()
	})
	const queryList = async (pageNo, pageSize) => {
		currentChapter_n.value += 1
		const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value)
		if (res.data.status == 1) {
			const resLen = res.data.data.imgUrlList.length
			await virtualList.value.completeByNoMore([res.data.data], resLen == 0)
			if (resLen < 3 && resLen != 0) {
				await queryList()
			}
		}
		setTimeout(() => {
			isLoaded.value = true
		}, 500)
	}
	// 音量键
	const onVolumeKeyDown = ({
		keyCode
	}) => {
		if (keyCode == 24) {
			virtualList.value.scrollToY(scrollTop.value - 500, 0, true);
		} else if (keyCode == 25) {
			virtualList.value.scrollToY(scrollTop.value + 500, 0, true)
		}
	}
	// 打开菜单
	const handelOpenMenu = (e) => {
		const y = e.changedTouches[0].pageY
		if (y <= (screenHeight.value / 3)) {
			virtualList.value.scrollToY(scrollTop.value - 500, 0, true);
		} else if (y >= (screenHeight.value / 3) && y <= (screenHeight.value / 3) * 2) {
			popMenu.value.openMenu()
		} else if (y >= (screenHeight.value / 3) * 2) {
			virtualList.value.scrollToY(scrollTop.value + 500, 0, true)
		}
	}
	const chapterImageInfo = ref({})
	// 改变当前章节信息
	const changeChapterInfo = ({
		chapter_name,
		chapter_n,
		curentImgNum,
		totalImage
	}) => {
		currentChapter_n.value = chapter_n
		currentChapterTitle.value = chapter_name
		chapterImageInfo.value = {
			curentImgNum,
			totalImage
		}
	}
	// 切换章节
	const changeChapter = async (targetChapter_n) => {
		currentChapter_n.value = targetChapter_n
		isLoaded.value = false
		comicImageList.value = []
		const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value)
		if (res.data.status == 1) {
			const resLen = res.data.data.imgUrlList.length
			await virtualList.value.completeByNoMore([res.data.data], resLen == 0)
			if (resLen < 3 && resLen != 0) {
				await queryList()
			}
		}
		isLoaded.value = true
	}
	let hasChangedChapter = ref(true)
	// 当滚动条高度改变
	const scrollTopChange = async (top) => {
		// 当滚动条高度小于等于300时，自动进入上一章
		if (top <= 500 && currentChapter_n.value !== 1 && hasChangedChapter.value) {
			hasChangedChapter.value = false
			currentChapter_n.value -= 1
			const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value)
			await virtualList.value.addDataFromTop([res.data.data], false)
			setTimeout(() => {
				hasChangedChapter.value = true
			}, 500)
		}
		scrollTop.value = top
	}
	// 章节列表逆序
	const reverseChapter = () => {
		chapterList.value.reverse()
	}
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #000;
	}
</style>
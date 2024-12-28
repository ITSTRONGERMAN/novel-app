import {
	createStore
} from 'vuex'
import {
	Worker
} from '@/uni_modules/xianxu-worker/js_sdk/index.js'


const store = createStore({
	state() {
		return {
			// 中部区域高度
			midAreaHeight: 0,
			readTime: uni.getStorageSync("readTime") || 0,
			// 当前浏览的小说详情内容
			currentNovelDetail: {},
			// 当前浏览的小说章节
			currentNovelChapters: [],
			// 下载线程
			downloadWorker: null,
			// 主题
			theme: uni.getStorageSync("app-theme") || "bright"
		}
	},
	mutations: {
		// 设置中部区域高度
		setMidAreaHeight(state, num) {
			state.midAreaHeight = num
		},
		// 设置当前小说详情内容
		setCurrentNovelDetail(state, detail) {
			state.currentNovelDetail = detail
		},
		// 设置当前小说章节列表
		setCurrentNovelChapters(state, chapters) {
			state.currentNovelChapters = chapters
		},
		// 更新阅读时间
		updateReadTime(state) {
			state.readTime = state.readTime + 1;
			uni.setStorageSync("readTime", state.readTime);
		},
		// 设置下载线程
		setDownloadWorker(state, worker) {
			if (worker) {
				state.downloadWorker = worker
				state.downloadWorker.start()
			}
		},
		// 设置主题
		setAppTheme(state, theme) {
			state.theme = theme
			uni.setStorageSync("app-theme", theme)
		}
	}
})

export default store
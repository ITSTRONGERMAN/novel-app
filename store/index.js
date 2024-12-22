import {
	createStore
} from 'vuex'

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
		}
	}
})

export default store
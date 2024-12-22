import {
	ref
} from 'vue'
const useSearchHistory = () => {
	// 搜索历史
	const searchHistoryList = ref(uni.getStorageSync('searchHistoryList') || [])
	// 添加搜索历史记录
	const addSearchHistory = (value) => {
		searchHistoryList.value = Array.from(new Set([value, ...searchHistoryList.value.slice(0, 10)]))
		uni.setStorageSync('searchHistoryList', searchHistoryList.value)
	}
	// 清空历史记录
	const clearHistory = () => {
		searchHistoryList.value = []
		uni.setStorageSync('searchHistoryList', [])
	}
	return {
		searchHistoryList,
		addSearchHistory,
		clearHistory,
	}
}
export default useSearchHistory
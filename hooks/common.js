import {
	useStore
} from 'vuex'
const commonHook = () => {
	const store = useStore()
	const goToDetail = (detail) => {
		const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, '')
		store.commit('setCurrentNovelDetail', {
			...detail,
			name: removeHtmlTags(detail.name),
		})
		uni.navigateTo({
			url: '/pages/detail/detail',
			animationType: "slide-in-right"
		})
	}
	const exceptDetailPageGoToRead = (detail) => {
		const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, '')
		store.commit('setCurrentNovelDetail', {
			...detail,
			name: removeHtmlTags(detail.name),
			id: detail.novel_id
		})
		const type = detail.type
		uni.navigateTo({
			url: `/pages/${type}-read/${type}-read?${type}_id=${detail.novel_id}&chapter_n=1`
		})
	}
	return {
		goToDetail,
		exceptDetailPageGoToRead
	}
}

export default commonHook
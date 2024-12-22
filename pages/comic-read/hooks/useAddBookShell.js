import {
	ref,
	onMounted
} from 'vue'
import {
	useStore
} from 'vuex'
import {
	deleteFromBookShell,
	insterBookShell,
	isExistHistory,
	isInBookShell
} from '../../../api'
const useAddBookShell = (modal) => {
	const store = useStore()
	const isAdd = ref(false)
	onMounted(async () => {
		isAdd.value = await isInBookShell(store.state.currentNovelDetail.id, 'comic')
	})
	// 添加到书架
	const addBookShell = async () => {
		if (isAdd.value) {
			modal.value.open()
		} else {
			await insterBookShell({
				...store.state.currentNovelDetail,
				type: 'comic'
			})
			isAdd.value = true
		}
	}
	// 确认从书架中删除
	const confirmRemove = async () => {
		await deleteFromBookShell(store.state.currentNovelDetail.id, 'comic')
		isAdd.value = false
	}
	return {
		addBookShell,
		isAdd,
		confirmRemove
	}
}
export default useAddBookShell
import {
	ref,
	computed
} from 'vue'
import {
	comicBoyRank
} from '../../../api'
const useComicGenderRank = () => {
	// 男女精选
	const ranks = ref([])
	// 索引
	const rankIndex = ref(0)
	// 当前精选
	const rankList = computed(() => ranks.value[rankIndex.value])
	// 改变榜单
	const changeRank = async (index) => {
		rankIndex.value = index
		if (!ranks.value[index]) {
			await getRankList(index)
		}
	}
	// 换一换
	const changeAchange = async () => {
		await getRankList(rankIndex.value)
	}
	// 获取男生女生榜数据
	const getRankList = async (index) => {
		const res = await comicBoyRank(rankIndex.value == 0 ? 'boy' : 'girl')
		ranks.value[index] = res.data.data
	}
	return {
		ranks,
		rankIndex,
		rankList,
		changeRank,
		changeAchange,
		getRankList
	}
}
export default useComicGenderRank
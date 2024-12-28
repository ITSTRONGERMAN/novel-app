import {
	insertChapter,
	selectSql,
	getNovelChapters
} from "@/api"
import {
	ref,
	onMounted
} from 'vue'
// 保存章节
export const saveChapters = (chapters, novel_id) => {
	try {
		const promisePool = chapters.map((item) => {
			return insertChapter([item.chapter_name, novel_id, item.chapter_n])
		})
		Promise.all(promisePool)
	} catch (err) {
		console.error("插入章节失败:" + error.message)
	}
}
// 获取当前小说的所有章节
const selectAllChapters = (novel_id) => selectSql(`select * from chapters where novel_id=${novel_id}`)
// 获取章节列表
export const getChapterList = async (novel_id) => {
	// #ifdef APP-PLUS
	const savedChapters = await selectAllChapters(novel_id)
	if (savedChapters.length === 0) {
		const {
			data: chapterList
		} = await getNovelChapters(novel_id)
		// saveChapters(chapterList, novel_id)
		return chapterList
	} else {
		console.log("当前章节已经存储在数据库中");
		return savedChapters
	}
	// #endif
	// #ifdef H5
	const {
		data: chapterList
	} = await getNovelChapters(novel_id)
	return chapterList
	// #endif
}
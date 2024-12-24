import server from "./utils/server.js"
import DB from "./utils/db.js"

// 推荐榜
export const getRecommendRank = (data) => server('/rank/recommend')
// 完结榜
export const getFinishedRank = (data) => server('/rank/finished')
// 猜你喜欢
export const getGuessYouLike = (data) => server('/guessyoulike')
// 计算小说封面主色调
export const calculateCoverMainColor = (url) => server(`/covermaincolor?url=${url}`)
// 小说章节
export const getNovelChapters = (novel_id) => server(`/novel/chapters?novel_id=${novel_id}`)
// 小说章节内容
export const getChapterContent = (novel_id, chapter_n) => server(
	`/novel/chapter/content?novel_id=${novel_id}&content_id=${chapter_n}`)
// 热门小说推荐
export const getHotNovelList = () => server('/novel/hotnovels')
// 获取小说详情
export const getNovelDetai = (novel_id) => server(`/novel/detail?novel_id=${novel_id}`)
// 搜索小说
export const searchNovel = (novel_name, author, offset, size = 10) => server(
	`/novel/search?novel_name=${novel_name}&author=${author}&offset=${offset}&size=${size}`)
// 小说分类
export const getNovelAllClass = () => server("/novel/class")
// 根据分类筛选小说
export const getNovelByGenre = (genre, size, offset) => server(
	`/novel/getBookByGenre?genre=${genre}&size=${size}&offset=${offset}`)
export const searchBook = (keyword) => server(`/book/search?keyword=${keyword}`)

// 漫画
// 男女漫画精选
export const comicBoyRank = (gender) => server(`/comic/rank?gender=${gender}`)
// 所有漫画分类名称
export const getComicClassName = () => server("/comic/classes")
export const getHotComicList = () => server("/comic/hotcomic")
// 根据分类筛选漫画
export const getComicByCategory = (categoryName, size = 10) => server(
	`/comic/category?className=${categoryName}&size=${size}`)
// 专属你的个人推荐
export const getYourPersionalRecommend = (size = 10, offset = 0) => server(
	`/comic/recommend?size=${size}&offset=${offset}`)
// 漫画内容
export const getComicContent = (comic_name, chapter_n, device_width = 375) => server(
	`/comic/content?name=${comic_name}&chapter_n=${chapter_n}&device_width=${device_width}`)
// 目标漫画章节
export const getComicChapters = (comic_name) => server(`/comic/chapters?name=${comic_name}`)
// 漫画搜索
export const searchComic = (comic_name, offset, size) => server(
	`/comic/search?name=${comic_name}&offset=${offset}&size=${size}`)
// 获取漫画所有类别
export const getComicAllClass = () => server("/comic/class")
export const getComicByGenre = (genre, size, offset) => server(
	`/comic/getBookByGenre?genre=${genre}&size=${size}&offset=${offset}`)

// 本地sqlite
const db = new DB()
export const closeDatabase = () => db.closeDatabase()
export const executeSql = (sql) => db.executeSql(sql)
export const selectSql = (sql) => db.select(sql)
// 添加章节
export const insertChapter = (params) => db.insertChapter(params)
// 添加历史记录
export const insertHistory = (params) => db.insertHistory(params)
// 是否已有历史记录
export const isExistHistory = (novel_id, type = "novle") => db.isExistHistory(novel_id, type)
// 更新历史记录
export const updateHistory = (novel_id, chapter_n, chapter_name, offsetY, type = 'novel') => db.executeSql(`
		update history
		set chapter_n=${chapter_n},chapter_name='${chapter_name}', offsetY=${offsetY}, read_time = CURRENT_TIMESTAMP
		where novel_id = ${novel_id} and type='${type}'
`)
// 添加书到书架
export const insterBookShell = (option) => db.insterBookShell(option)
// 获取书架列表
export const getBookShellList = (type = "novel") => {
	if (type !== 'all') return db.select(`select * from bookshell where type='${type}'`)
	else return db.select("select * from bookshell")
}
// 是否已加入书架
export const isInBookShell = async (novel_id, type = "novel") => {
	const result = await db.select(`select * from bookshell where novel_id=${novel_id} and type='${type}'`)
	return result.length > 0
}
// 从书架中移除
export const deleteFromBookShell = (novel_id, type = "novel") => db.executeSql(
	`delete from bookshell where novel_id=${novel_id} and type='${type}'`)
// 收藏数
export const getBookShellCount = () => db.select("select count(*) as 'collections' from bookshell")
// 浏览数
export const getBrowseCount = () => db.select("select count(*) as 'browseCount' from history")
// 浏览历史列表
export const getHistoryList = (type = "all", size = 10, offset = 0) => db.select(
	type == 'all' ?
	`
	SELECT *
	FROM history
	ORDER BY read_time DESC;						
	` :
	`
	SELECT *
	FROM history
	WHERE type='${type}'
	ORDER BY read_time DESC
	LIMIT ${size}
	OFFSET ${offset}
	`
)
// 删除浏览历史
export const deleteHistoryListById = (id) => db.executeSql(`DELETE FROM history WHERE id = ${id}`)
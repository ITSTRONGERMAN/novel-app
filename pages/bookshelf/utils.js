import {
	isExistHistory
} from "../../api";
// 解析图书列表
export const parseBookList = async (bookList, type) => {
	let newList = await Promise.all(bookList.map((item) => {
		return isExistHistory(item.novel_id, type).then((isExist) => {
			const hasRead = isExist.length > 0 ? isExist[0].chapter_name : null
			const read_time = isExist.length > 0 ? isExist[0].read_time : 0
			return {
				...item,
				hasRead,
				read_time,
			};
		});
	}))
	let topList = newList.filter(book => book.top === 1)
	let notTopList = newList.filter(book => book.top === 0)
	topList = topList.sort((a, b) => {
		const dateA = new Date(a.read_time);
		const dateB = new Date(b.read_time);
		return dateB - dateA;
	});
	notTopList = notTopList.sort((a, b) => {
		const dateA = new Date(a.read_time);
		const dateB = new Date(b.read_time);
		return dateB - dateA;
	});
	return [...topList, ...notTopList]
}
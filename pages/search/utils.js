// 解析搜索结果
export const parseSearchResult = (str, keyword) => {
	return str.replace(
		new RegExp(keyword, 'gi'),
		(match) => `<text style="color:#D4AB63">${match}</text>`
	)
}
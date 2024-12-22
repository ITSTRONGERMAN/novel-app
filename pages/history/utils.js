export const parseTime = (time) => {
	const newTimestamp = new Date(time).getTime() + 8 * 60 * 60 * 1000;
	// 转换为新的 Date 对象
	const newDate = new Date(newTimestamp);
	const year = newDate.getFullYear()
	const month = newDate.getMonth()
	const day = newDate.getDate()
	const hour = newDate.getHours()
	const minute = newDate.getMinutes()
	return `${year}年${month}月${day} ${hour}时${minute}分`
}
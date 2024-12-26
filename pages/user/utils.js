const formatTime = (hour, minute) => {
	return `${hour}<text class="small-font">时</text>${minute}<text class="small-font">分</text>`
}
export const parseTime = (minute) => {
	const hour = 60
	const day = hour * 24
	if (minute > hour) return formatTime(parseInt(minute / hour, minute % hour))
}
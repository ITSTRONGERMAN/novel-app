import {
	ref,
	onMounted,
	onUnmounted
} from 'vue'
import {
	useStore
} from 'vuex'
import EventBus from './eventBus'
const getCurrentTime = () => {
	const time = new Date()
	let hour = time.getHours()
	hour = hour >= 10 ? hour : '0' + hour
	let minute = time.getMinutes()
	minute = minute >= 10 ? minute : '0' + minute
	return `${hour}:${minute}`
}
const getBottomInfo = () => {
	const store = useStore()
	const batteryInfo = ref(null)
	// #ifdef APP
	batteryInfo.value = (uni.getBatteryInfoSync())
	// #endif
	const currentTime = ref(getCurrentTime())
	const timeTimer = setInterval(() => {
		store.commit("updateReadTime")
		currentTime.value = getCurrentTime()
		// #ifdef APP
		batteryInfo.value = uni.getBatteryInfoSync()
		// #endif
	}, 60000)
	onUnmounted(() => {
		clearInterval(timeTimer)
	})
	return {
		currentTime,
		batteryInfo
	}
}
export default getBottomInfo
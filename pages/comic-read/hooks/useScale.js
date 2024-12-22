import {
	ref,
	computed,
	nextTick
} from 'vue'

const useScale = () => {
	const startDistance = ref(0)
	// 最初的缩放比例
	const startScale = ref(1)
	// 缩放比例
	const scale = ref(1)
	// 页面面是否可以滚动
	const canScroll = ref(true)
	// 是否开启动画
	const animation = ref(false)
	const scalePosition = ref({
		x: 0,
		y: 0
	})
	// 手指接触屏幕
	const handleTouchStart = (event) => {
		if (event.touches.length === 2) {
			canScroll.value = false
			startDistance.value = calcDistance(event.touches[0], event.touches[1])
			scalePosition.value.x = event.touches[0].clientX
			scalePosition.value.y = event.touches[0].clientY
			startScale.value = scale.value
		}
	}
	// 手指移动
	const handleTouchMove = (event) => {
		if (event.touches.length === 2) {
			const distance = calcDistance(event.touches[0], event.touches[1])
			const newScale = startScale.value * (distance / startDistance.value)
			scale.value = newScale
		}
	}
	// 手指离开屏幕
	const handleTouchEnd = (event) => {
		if (event.touches.length < 2) {
			startDistance.value = 0
			animation.value = true
			scale.value = scale.value < 1 ? 1 : scale.value
			scale.value = scale.value > 2 ? 2 : scale.value
			canScroll.value = true
			setTimeout(() => {
				animation.value = false
			}, 300)
		}
	}
	// 计算移动距离
	const calcDistance = (touch1, touch2) => {
		const xDistance = touch2.clientX - touch1.clientX
		const yDistance = touch2.clientY - touch1.clientY
		return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
	}
	// 缩放样式
	const transformStyle = computed(() => ({
		transform: `scale(${scale.value})`,
		transition: animation.value ? 'transform 0.3s ease' : 'none',
		transformOrigin: `${scalePosition.value.x}px ${scalePosition.value.y}px`
	}))
	return {
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		transformStyle,
		canScroll
	}
}

export default useScale
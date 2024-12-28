<template>
	<view class="home-mid" :style="{ height: `${height}px`, background}">
		<view class="content" :style="contentStyle" @touchstart.capture="handelTouchStart"
			@touchmove.capture="handelTouchMove" @touchend.capture="handelTouchEnd">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		defineProps,
		defineEmits,
		onMounted,
		computed,
		watch
	} from 'vue';
	import getSystemInfo from '@/utiles/getSystemInfo';
	import {
		useStore
	} from 'vuex';
	const store = useStore()
	// 屏幕宽度
	const screenWidth = ref(0)
	// 第一次手指落下的坐标位置
	const fingerCoordinates = reactive({
		x: 0,
		y: 0
	})
	// 手指是否在滑动
	const isMove = ref(false)
	// 手指滑动距离
	const moveDistance = ref(0)
	// 手指滑动页面偏移距离
	const offset = reactive({
		x: 9,
		y: 0
	})
	onMounted(async () => {
		const info = await getSystemInfo()
		screenWidth.value = info.screenWidth
	})
	// 内容区样式
	const contentStyle = computed(() => {
		return {
			width: screenWidth.value * props.length + 'px',
			transform: isMove.value ? `translate(${moveDistance.value}px,${offset.y}px)` :
				`translate(${-(props.current*screenWidth.value)}px,${offset.y}px)`,
			transition: isMove.value ? "none" : "transform 0.3s"
		}
	})
	// 组件参数
	const props = defineProps({
		length: {
			type: Number,
			required: true
		},
		current: {
			type: Number,
			default: 0
		},
		pageName: {
			type: String,
			default: ' '
		},
		refresh: {
			type: Boolean,
			default: true
		},
		height: {
			type: Number,
			default: 0
		},
		background: {
			type: String,
			default: '#F6F6F6'
		},
		enableSlide: {
			type: Boolean,
			default: true
		}
	});
	// 检测current的变化
	watch(
		() => props.current, // 使用 getter 函数来访问 props
		(newVal) => {
			offset.x = -(props.current * screenWidth.value)
		}, {
			immediate: true, // 立即执行回调
		}
	);
	// 组件事件触发
	const emit = defineEmits(['pageChange']);
	// 手指第一次落下
	const handelTouchStart = (e) => {
		if (!props.enableSlide) return
		fingerCoordinates.x = e.changedTouches[0].pageX
		fingerCoordinates.y = e.changedTouches[0].pageY
	}
	// 手指离开屏幕
	const handelTouchEnd = (e) => {
		if (!props.enableSlide) return
		isMove.value = false
		const moveY = e.changedTouches[0].pageY - fingerCoordinates.y
		const moveX = e.changedTouches[0].pageX - fingerCoordinates.x
		if ((Math.abs(moveX) - Math.abs(moveY)) < 50) return
		// 检查条件并发出事件
		if (moveX < -100 && props.current < props.length - 1) {
			emit("pageChange", 'r'); // 向右滑动
		} else if (moveX > 100 && props.current > 0) {
			emit("pageChange", 'l'); // 向左滑动
		}

	}
	// 手指滑动
	const handelTouchMove = (e) => {
		if (!props.enableSlide) return
		const moveX = e.changedTouches[0].pageX - fingerCoordinates.x
		const moveY = e.changedTouches[0].pageY - fingerCoordinates.y
		if ((Math.abs(moveX) - Math.abs(moveY)) < 50) return
		if ((moveX < 0 && props.current == props.length - 1) || (moveX > 0 && props.current == 0)) return
		isMove.value = true
		moveDistance.value = offset.x + moveX
	}
</script>

<style lang="scss" scoped>
	.home-mid {
		overflow: hidden;
		position: relative;

		.pull-down {
			width: 100%;
			height: 200rpx;
			position: absolute;
			left: 0;
			transition: top 0.3s;
			z-index: 11;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: transparent;
		}

		.content {
			display: flex;
			height: 100%;
			overflow: hidden;
			position: relative;
		}
	}
</style>
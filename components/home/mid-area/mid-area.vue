<template>
	<view class="home-mid" :style="{ height: `${height}px` }">
		<view class="content bcg-color" :style="contentStyle" @touchstart="handelTouchStart"
			@touchmove.stop="handelTouchMove" @touchend="handelTouchEnd">
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
	import getSystemInfo from '../../../utiles/getSystemInfo';
	// 屏幕宽度
	const screenWidth = ref(0)
	// 第一次手指落下的坐标位置
	const fingerCoordinates = reactive({
		x: 0,
		y: 0
	})
	// 手指是否在滑动
	const isMove = ref(true)
	// 手指滑动距离
	const moveDistance = ref(0)
	// 手指滑动页面偏移距离
	const offsetX = ref(0)
	onMounted(async () => {
		const info = await getSystemInfo()
		screenWidth.value = info.screenWidth
	})
	// 内容区样式
	const contentStyle = computed(() => {
		return {
			width: screenWidth.value * props.length + 'px',
			transform: isMove.value ? `translateX(${moveDistance.value}px)` :
				`translateX(${-(props.current*screenWidth.value)}px)`,
			transition: isMove.value ? "none" : "transform 0.3s"
		}
	})
	// 组件参数
	const props = defineProps({
		height: {
			type: Number,
			required: true
		},
		length: {
			type: Number,
			required: true
		},
		current: {
			type: Number,
			default: 0
		},
	});
	watch(
		() => props.current, // 使用 getter 函数来访问 props
		(newVal) => {
			offsetX.value = -(props.current * screenWidth.value)
		}, {
			immediate: true, // 立即执行回调
		}
	);
	// 组件事件触发
	const emit = defineEmits(['pageChange']);
	// 手指第一次落下
	const handelTouchStart = (e) => {
		fingerCoordinates.x = e.changedTouches[0].pageX
		fingerCoordinates.y = e.changedTouches[0].pageY
	}
	// 手指离开屏幕
	const handelTouchEnd = (e) => {
		isMove.value = false
		const moveY = e.changedTouches[0].pageY - fingerCoordinates.y
		const moveX = e.changedTouches[0].pageX - fingerCoordinates.x
		if (Math.abs(moveX) < Math.abs(moveY)) return
		// 检查条件并发出事件
		if (moveX < -100 && props.current < props.length - 1) {
			emit("pageChange", 'r'); // 向右滑动
		} else if (moveX > 100 && props.current > 0) {
			emit("pageChange", 'l'); // 向左滑动
		}
	}
	// 手指滑动
	const handelTouchMove = (e) => {
		const moveX = e.changedTouches[0].pageX - fingerCoordinates.x
		const moveY = e.changedTouches[0].pageY - fingerCoordinates.y
		if (Math.abs(moveX) < Math.abs(moveY)) return
		if (moveX < 0 && props.current == props.length - 1) return
		if (moveX > 0 && props.current == 0) return
		moveDistance.value = offsetX.value + moveX
		isMove.value = true
	}
</script>

<style lang="scss" scoped>
	.home-mid {
		.content::-webkit-scrollbar {
			display: none;
			/* 对于 Webkit 内核的浏览器 (Chrome, Safari) 隐藏滚动条 */
		}

		.content {
			display: flex;
			height: 100%;

			.item {
				flex: 1;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
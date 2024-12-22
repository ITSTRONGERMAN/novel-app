<template>
	<view class="comic-image-container">
		<view class="comic-image" :style="{height:imgInfo.height+'px',width:imgInfo.width+'px'}">
			<image :draggable="false" v-if="loadParameter.show&&!loadParameter.loadError" @load="handelLoad"
				@error="handelLoadError" class="img" :src="imgInfo.url" :lazy-load="isLazyLoad"
				:style="{opacity:loadParameter.loaded?1:0}" mode="widthFix">
			</image>
			<view class="loading" v-if="!loadParameter.loaded&&!loadParameter.loadError">
				{{imgInfo.pageNum}}
			</view>
			<view @tap="handelReload" class="load-error" v-if="loadParameter.loadError">
				加载失败
				<br>
				请点击重试
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		getCurrentInstance,
		onMounted,
		reactive,
		ref,
		defineEmits
	} from 'vue';

	// 定义组件接收的props
	const props = defineProps({
		imgInfo: {
			required: true,
			type: Object
		},
		isLazyLoad: {
			type: Boolean,
			default: true
		},
	});

	const comicImageRef = ref(null);

	// 获取当前组件实例
	const instance = getCurrentInstance();
	const emits = defineEmits(['intoView'])
	// 创建交叉观察器
	let observer;
	const loadParameter = reactive({
		show: false,
		loaded: false,
		loadError: false,
		loading: true
	})
	// 在组件挂载时进行相关设置
	onMounted(() => {
		if (props.isLazyLoad) {
			observer = uni.createIntersectionObserver(instance);
			// 开始观察目标元素
			observer.relativeToViewport({
				bottom: 500
			}).observe('.comic-image', (res) => {
				if (res.intersectionRatio > 0 && props.isLazyLoad) {
					loadParameter.show = true
					// console.log(props.imgInfo.pageNum);
					emits("intoView", {
						imgNum: props.imgInfo.pageNum
					})
				}
			});
		}
	});
	// 图片加载成功
	const handelLoad = () => {
		loadParameter.loaded = true
	}
	// 图片加载失败
	const handelLoadError = () => {
		loadParameter.loadError = true
	}
	// 图片重新加载
	const handelReload = () => {
		loadParameter.loadError = false
	}
</script>

<style lang="scss" scoped>
	.comic-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 500rpx;

		.comic-image {
			width: 100vw;
			background-color: #000;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			min-height: 500rpx;

			.load-error,
			.loading {
				width: 100%;
				height: 100%;
				color: #fff;
				font-size: 60rpx;
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 5;
			}

			.load-error {
				text-align: center;
				font-size: 28rpx !important;
			}

			.img {
				width: 100%;
				height: 100%;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
				opacity: 0;
				transition: opacity 0.1s;
			}
		}
	}
</style>
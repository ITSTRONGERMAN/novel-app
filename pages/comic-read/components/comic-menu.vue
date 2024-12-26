<template>
	<view class="mask" :style="{backgroundColor:`rgba(0,0,0,${brightness/100})`}"></view>
	<!-- 顶部弹出层 -->
	<uv-popup :overlay="false" bgColor="#fff" ref="popupTop" mode="top" :overlayOpacity="0" @change="handelChange">
		<view class="comic-menu-top">
			<view class="status-bar"></view>
			<view class="action">
				<view class="action-left">
					<uv-icon name="arrow-left" color="#000" bold size="20" @tap="back"></uv-icon>
					<view class="title">{{title}}</view>
				</view>
				<view class="action-right">
					<view @tap="addBookShell">{{isAdd?'已加入书架':'加入书架'}}</view>
				</view>
			</view>
		</view>
	</uv-popup>
	<!-- 底部弹出层 -->
	<uv-popup :overlay="false" bgColor="#fff" ref="popupBottom" mode="bottom" :overlayOpacity="0">
		<view class="slider-box">
			<view class="btn" @tap="changeChapter(currentChapter_n-1)">上一话</view>
			<view class="mid">
				<uv-slider activeColor="#F59F70" v-model="chapterSlideValue" block-size="25" :min="1"
					:max="chapterList[chapterList.length-1].chapter_n" @changing="handelSliderChange"
					@change="handelSliderChange"></uv-slider>
			</view>
			<view class="btn" @tap="changeChapter(currentChapter_n+1)">下一话</view>
		</view>
		<view class="comic-popup-bottom">
			<view class="item" @tap="showChapter">
				<uv-icon name="content" custom-prefix="custom-icon" size="20" color="#000"></uv-icon>
				目录
			</view>
			<view class="item" @tap="changeDark">
				<uv-icon :name="brightness>=50?'sun':'moon'" custom-prefix="custom-icon" size="20"
					color="#000"></uv-icon>
				{{brightness>=50?'日间':'夜间'}}
			</view>
			<view class="item" @tap="openConfigPopup">
				<uv-icon name="setting" color="#000" size="24"></uv-icon>
				设置
			</view>
		</view>
	</uv-popup>
	<!-- 目录弹层 -->
	<view :class="['chapter-popup',popupChapterShow?'show':'']">
		<view class="top">
			<view class="status-bar"></view>
			<view class="comic-name">狐妖小红娘</view>
			<view class="info">
				<view class="info-left">
					共{{chapterList.length}}话 连载中
				</view>
				<view class="info-right" @tap="reverseChapter">
					<view class="icon">
						<uv-icon name="arrow-up-fill" size="10"></uv-icon>
						<uv-icon name="arrow-down-fill" size="10"></uv-icon>
					</view>
					{{isReverse?'逆序':'正序'}}
				</view>
			</view>
		</view>
		<scroll-view :scroll-into-view="'chapter-'+currentChapter_n" scroll-y="true"
			:style="{height:chaperListHeight+'px'}" class="scroll-box">
			<view class="chapter-item" :style="{color:currentChapter_n==item.chapter_n?'#F59F70':''}"
				:id="'chapter-'+item.chapter_n" @tap="changeChapter(item.chapter_n)" v-for="item,index in chapterList"
				:key="index">{{item.chapter_name}}
			</view>
		</scroll-view>
	</view>
	<uv-transition :show="popupChapterShow||configShow" custom-class="chapter-mask" @tap="tapMask">
	</uv-transition>
	<!-- 设置弹出层 -->
	<uv-popup round="10" :overlay="false" bgColor="#fff" ref="configPopup" mode="bottom" :overlayOpacity="0">
		<view class="config-popup">
			<view class="config-list">
				<view class="config-item">
					<view class="name">亮度</view>
					<view class="action">
						<uv-icon name="moon" custom-prefix="custom-icon" size="20" color="#8A8A8A"></uv-icon>
						<view class="mid">
							<uv-slider v-model="brightness" activeColor="#F59F70" block-size="20" :min="1"
								:max="80"></uv-slider>
						</view>
						<uv-icon name="sun" custom-prefix="custom-icon" size="20" color="#8A8A8A"></uv-icon>
					</view>
				</view>
				<view class="config-item">
					<view class="name">允许缩放</view>
					<view class="action">
						<uv-switch v-model="premitScale" inactiveColor="#8A8A8A" activeColor="#F59F70"></uv-switch>
					</view>
				</view>
			</view>
		</view>
	</uv-popup>
	<modal ref="removeFromBookShellModal" title="确认将本书从书架移除？" @confirm="confirmRemove"></modal>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineExpose,
		onMounted,
		getCurrentInstance,
		defineEmits,
		watch,
		computed
	} from 'vue'
	import getSystemInfo from '../../../utiles/getSystemInfo'
	import getSelectorInfo from '../../../utiles/getSelectorInfo'
	import useAddBookShell from '../hooks/useAddBookShell'
	import modal from "../../../components/modal/modal.vue"
	const removeFromBookShellModal = ref(null)
	const {
		addBookShell,
		isAdd,
		confirmRemove
	} = useAddBookShell(removeFromBookShellModal)
	// 顶部弹出层
	const popupTop = ref(null)
	// 底部弹出层
	const popupBottom = ref(null)
	// 是否打开章节弹出层
	const popupChapterShow = ref(false)
	// 设置弹出层
	const configPopup = ref(null)
	// 是否黑夜主题
	const isDark = computed(() => brightness.value > 40)
	// 屏幕方向
	// 是否允许缩放
	const premitScale = ref(false)
	let isOpen = false
	const emits = defineEmits(["changeChapter", "reverseChapter"])
	const props = defineProps({
		title: {
			default: "",
			type: String
		},
		chapterList: {
			default: () => [],
			type: Array
		},
		currentChapter_n: {
			default: 1,
			type: Number
		}
	})
	// 打开菜单
	const openMenu = () => {
		if (!isOpen) {
			popupTop.value.open()
			popupBottom.value.open()
		} else {
			popupTop.value.close()
			popupBottom.value.close()
		}
	}
	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}
	// 当菜单状态改变时
	const handelChange = ({
		show
	}) => {
		isOpen = show
		// #ifdef APP
		plus.navigator.setFullscreen(!show)
		// #endif
	}
	// 调节亮度
	const brightness = ref(1)
	const changeDark = () => {
		if (isDark.value) {
			brightness.value = 0
		} else {
			brightness.value = 50
		}
		setTimeout(() => {
			openMenu()
		}, 100)
	}
	// 展示章节弹出层
	const showChapter = () => {
		openMenu()
		setTimeout(() => {
			popupChapterShow.value = true
		}, 300)
	}
	// 打开设置弹出层
	const configShow = ref(false)
	const openConfigPopup = () => {
		openMenu()
		configShow.value = true
		configPopup.value.open()
	}
	// 点击遮罩层
	const tapMask = () => {
		popupChapterShow.value = false
		configShow.value && configPopup.value.close()
		configShow.value = false
	}
	// 章节列表高度
	const chaperListHeight = ref(0)
	onMounted(async () => {
		const instance = getCurrentInstance()
		const chapterTopInfo = await getSelectorInfo(instance, ".chapter-popup .top")
		const sysInfo = await getSystemInfo()
		chaperListHeight.value = sysInfo.windowHeight - chapterTopInfo.height
	})
	// 切换章节
	const changeChapter = (chapter_n) => {
		const lastChapter_n = props.chapterList[props.chapterList.length - 1].chapter_n
		if (props.currentChapter_n == chapter_n || chapter_n > lastChapter_n) return
		popupChapterShow.value = false
		emits("changeChapter", chapter_n)
	}
	const isReverse = ref(false) // 章节是否已经逆转
	//  逆序章节列表
	const reverseChapter = () => {
		isReverse.value = !isReverse.value
		emits("reverseChapter")
	}
	// 章节滑动
	const chapterSlideValue = ref(0)
	const sliderTiimer = ref(null)
	watch(() => props.currentChapter_n, (newVal) => {
		chapterSlideValue.value = newVal
	})
	// 滑动切换章节
	const handelSliderChange = (val) => {
		if (sliderTiimer.value) clearTimeout(sliderTiimer.value)
		sliderTiimer.value = setTimeout(() => {
			changeChapter(props.chapterList[val - 1].chapter_n);
		}, 300)
	}
	defineExpose({
		openMenu
	})
</script>

<style scoped lang="scss">
	/* 顶部弹出层 */
	.comic-menu-top {
		width: 100%;
		padding: 20rpx;
		padding-right: 30rpx;

		.action {
			display: flex;
			align-items: center;
			gap: 40rpx;

			.action-left {
				flex: 1;
				display: flex;
				gap: 10rpx;
				font-size: 32rpx;
				align-items: center;

				.title {
					flex: 1;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}

			.action-right {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				gap: 20rpx;
			}
		}
	}

	/* 亮度遮罩 */
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 99999999;
		background-color: rgba(0, 0, 0, 0.2);
		pointer-events: none;
		transition: opacity 0.5s;
	}

	/* 章节切换滑动器 */
	.slider-box {
		padding: 10rpx 30rpx;
		display: flex;
		gap: 10rpx;
		align-items: center;

		.btn {
			font-size: 32rpx;
		}

		.mid {
			flex: 1
		}
	}

	/* 底部弹出层 */
	.comic-popup-bottom {
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-around;

		.item {
			display: flex;
			flex-direction: column;
			gap: 10rpx;
			align-items: center;
			font-size: 24rpx;
		}
	}

	/* 弹出层出现 */
	.show {
		transform: translateX(0) !important;
	}

	/* 章节切换弹出层 */
	.chapter-mask {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10074;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.2);
	}

	/* 章节弹出层 */
	.chapter-popup {
		position: fixed;
		right: 0;
		top: 0;
		transform: translateX(100%);
		width: 450rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		z-index: 10075;
		background-color: #fff;
		transition: transform 0.3s;

		.top {
			display: flex;
			flex-direction: column;
			gap: 10rpx;

			.comic-name {
				font-size: 28rpx;
				text-align: center;
			}

			.info {
				font-size: 24rpx;
				padding: 10rpx 15rpx;
				background-color: #F4F4F4;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info-right {
					font-size: 24rpx;
					display: flex;
					align-items: center;
					gap: 10rpx;
				}
			}
		}

		.scroll-box {
			padding: 30rpx 0;

			.chapter-item {
				font-size: 28rpx;
				padding: 0 30rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				margin-bottom: 30rpx;
			}
		}
	}

	.config-popup {
		padding: 30rpx 20rpx;

		.config-list {
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			padding: 0 20rpx;
			gap: 20rpx;

			.config-item {
				display: flex;
				align-items: center;
				gap: 20rpx;

				.name {
					font-size: 28rpx;
					color: #8A8A8A
				}

				.action {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 10rpx;

					.mid {
						flex: 1;
					}

					.change-screen {
						font-size: 20rpx;
						width: 100rpx;
						height: 100rpx;
						border: 4rpx solid #8A8A8A;
						color: #8A8A8A;
						border-radius: 8rpx;
						margin-left: 40rpx;
						display: flex;
						flex-direction: column;
						gap: 10rpx;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
</style>
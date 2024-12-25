<template>
	<view :class="['bottom-menu',menuShow?'show':'']"
		:style="{backgroundColor:themeStyle.backgroundColor,color:themeStyle.contentColor}">
		<!-- 章节提示 -->
		<view class="chapter_tip" v-if="tipShow&&isSlide">
			<view>
				{{currentChapterPercentage}}%
			</view>
			<view class="chapter_name">
				{{chapterNameList[chapterSlideValue]?.chapter_name}}
			</view>
		</view>
		<!-- 滑动切换章节 -->
		<view class="slide">
			<text @tap="prevChapter">上一章</text>
			<view class="slide-box">
				<uv-slider v-model="chapterSlideValue" block-size="25" min="0" :max="chapterNameList?.length-1"
					@changing="handelSliderChange" @change="handelSliderChange"></uv-slider>
			</view>
			<text @tap="nextChapter">下一章</text>
		</view>
		<view class="icon-btn">
			<view class="icon-item" @tap="openChapterContalog">
				<uv-icon name="content" custom-prefix="custom-icon" size="20"
					:color="themeStyle.contentColor"></uv-icon>
				<view :style="{color:themeStyle.contentColor}">目录</view>
			</view>
			<view class="icon-item" @tap="addBookShelf">
				<uv-icon :name="!isAdded?'plus':'checkmark'" size="20" :color="themeStyle.contentColor"></uv-icon>
				<view :style="{color:themeStyle.contentColor}">{{!isAdded?'加入书架':'已加书架'}}</view>
			</view>
			<view class="icon-item" @tap="changeDarkOrBright">
				<uv-icon :name="isDarkTheme?'sun':'moon'" custom-prefix="custom-icon" size="20"
					:color="themeStyle.contentColor"></uv-icon>
				<view :style="{color:themeStyle.contentColor}">{{isDarkTheme?'日间':'夜间'}}</view>
			</view>
			<view class="icon-item" @tap="openConfig">
				<uv-icon name="setting" :color="themeStyle.contentColor" size="24"></uv-icon>
				<view :style="{color:themeStyle.contentColor}">设置</view>
			</view>
		</view>
	</view>
	<uv-modal :style="{backgroundColor:themeStyle.backgroundColor,color:themeStyle.contentColor}" showCancelButton
		:closeOnClickOverlay="false" ref="modal" content='确认将本书从书架移除' @confirm="confirm" confirmText="移除">
	</uv-modal>
</template>

<script setup>
	import {
		defineProps,
		ref,
		defineEmits,
		computed,
		onMounted,
		watch
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import {
		deleteFromBookShell,
		insterBookShell,
		isInBookShell
	} from '../../../api';
	const store = useStore()
	const modal = ref(null)
	const emit = defineEmits([
		'openConfig',
		'handelSliderChange',
		'nextChapter',
		'prevChapter',
		'openChapterContalog',
		'changeDarkOrBright'
	])
	const isSlide = ref(false)
	// 当前章节占比
	const currentChapterPercentage = computed(() => ((chapterSlideValue.value / props.chapterNameList?.length) * 100)
		.toFixed(2))
	// 章节提示是否显示
	const tipShow = ref(false)
	const isAdded = ref(false)
	// slide value
	const chapterSlideValue = ref(0)
	const props = defineProps({
		menuShow: { // 底部弹出层是否显示
			type: Boolean,
			default: false
		},
		themeStyle: { // 主题
			type: Object,
			default: () => ({
				backgroundColor: '#F6F6F6',
				color: '#929292',
				contentColor: '#000'
			})
		},
		chapterNameList: { // 总章节数
			type: Array,
			default: () => []
		},
		currentChapterName: { // 当前章节名称
			type: String,
			default: ''
		},
		isDarkTheme: { // 是否黑夜主题
			type: Boolean,
			default: false
		},
		currentChapter_n: {
			type: Number,
			default: 1
		},
		novel_id: {
			type: Number,
			required: true
		}
	})
	// 打开设置弹出层
	const openConfig = () => {
		emit('openConfig')
	}
	// slider定时器，用于防抖
	const sliderTimer = ref(null)
	// slider的值改变
	const handelSliderChange = (chapter_n) => {
		tipShow.value = true
		isSlide.value = true
		if (sliderTimer.value) {
			clearTimeout(sliderTimer.value)
		}
		sliderTimer.value = setTimeout(async () => {
			isSlide.value = false
			emit('handelSliderChange', chapterSlideValue.value)
		}, 300)
	}
	// 下一章
	const nextChapter = () => {
		emit('nextChapter')
	}
	// 上一章
	const prevChapter = () => {
		emit('prevChapter')
	}
	// 打开章节弹出层
	const openChapterContalog = () => {
		emit('openChapterContalog')
	}
	// 改变黑夜白天主题
	const changeDarkOrBright = () => {
		emit('changeDarkOrBright', props.isDarkTheme ? 'bright' : 'dark')
	}
	// 观察当前章节数变化
	watch(() => props.currentChapter_n, (val) => {
		chapterSlideValue.value = val
	})
	onMounted(async () => {
		const res = await isInBookShell(store.state.currentNovelDetail.id)
		isAdded.value = res
	})
	// 加入书架
	const addBookShelf = async () => {
		if (isAdded.value) {
			modal.value.open()
		} else {
			await insterBookShell(store.state.currentNovelDetail)
			isAdded.value = true
		}
	}
	// 移出书架
	const confirm = async () => {
		await deleteFromBookShell(store.state.currentNovelDetail.id)
		isAdded.value = false
	}
</script>

<style lang="scss" scoped>
	.show {
		transform: translate(0, 0) !important;
	}

	.bottom-menu {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 11;
		transform: translateY(100%);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding: 20rpx 40rpx;
		transition: transform 0.3s;

		.chapter_tip {
			position: absolute;
			bottom: 110%;
			left: 50%;
			transform: translateX(-50%);
			padding: 20rpx 30rpx;
			background-color: #3D3D3D;
			border-radius: 100rpx;
			color: #707070;
			text-align: center;
			width: 70vw;

			.chapter_name {
				text-align: center;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.slide {
			display: flex;
			// gap: 10rpx;
			align-items: center;

			.slide-box {
				flex: 1;
			}
		}

		.icon-btn {
			display: flex;
			justify-content: space-around;

			.icon-item {
				font-size: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10rpx;
			}
		}
	}
</style>
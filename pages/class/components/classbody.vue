<template>
	<view class="class-container">
		<view class="l" :style="{backgroundColor:theme=='light'?currentTheme.mainBcg:currentTheme.secondaryBcg}">
			<scroll-view :scroll-into-view="'classItem-'+active" :style="{height:classContainerHeight+'px'}"
				scroll-y="true">
				<view @tap="changeGenre(index,className)" :id="'classItem-'+index"
					:style="{color:currentTheme.secondaryFontColor}" :class="['class-item',index==active?'active':'']"
					v-for="className,index in classItemList" :key="index">
					{{className}}
				</view>
			</scroll-view>
		</view>
		<view class="r"
			:style="{height:classContainerHeight+'px',backgroundColor:theme=='light'?'#fff':currentTheme.mainBcg}">
			<loadingVue v-if="bookList.length==0"></loadingVue>
			<scroll-view @scroll="handelScroll" @scrolltolower="scrolltolower" :lower-threshold="300"
				:scroll-top="scrollTop" v-else :style="{height:classContainerHeight+'px'}" scroll-y="true">
				<l-empty v-if="bookList.length===0" description="没有找到相关内容" />
				<template v-else>
					<view class="book-list">
						<view @tap="goToDetail(book)" class="book-item" v-for="book in bookList" :key="book.id">
							<view style="width: 140rpx;height: 200rpx;">
								<uv-image :src="book.cover" lazy-load observeLazyLoad fade radius="5" width="100%"
									height="100%"></uv-image>
							</view>
							<view class="info">
								<view class="name" :style="{color:currentTheme.mainFontColor}">{{book.name}}</view>
								<view class="author">{{book.author}}</view>
								<view class="intro">{{book.intro}}</view>
							</view>
						</view>
					</view>
					<view style="padding: 10rpx 0;" v-if="isShowLoadingMore">
						<uv-load-more :status="loadingStatus" loadingText="努力加载中" nomoreText="实在没有了" />
					</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits,
		ref,
		watch,
		nextTick,
		getCurrentInstance
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import loadingVue from '@/components/loading/loading.vue';
	import getSelectorInfo from '@/utiles/getSelectorInfo';
	import commonHook from "@/hooks/common.js"
	import useTheme from '@/hooks/useTheme';
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		goToDetail
	} = commonHook()
	const emits = defineEmits(["changeType", "scrolltolower", "onListLayout"])
	const store = useStore()
	const scrollTop = ref(0)
	const props = defineProps({
		classContainerHeight: {
			type: Number,
			default: 0
		},
		classItemList: {
			type: Array,
			default: () => []
		},
		active: {
			type: Number,
			default: 0
		},
		bookList: {
			type: Array,
			default: () => []
		},
		loadingStatus: {
			type: String,
			default: "loading"
		}
	})
	const instance = getCurrentInstance()
	const isShowLoadingMore = ref(true)
	watch(() => props.bookList, () => {
		nextTick(async () => {
			const info = await getSelectorInfo(instance, ".book-list")
			isShowLoadingMore.value = props.classContainerHeight < info.height
		})
	})
	// 切换分类
	const changeGenre = (index, className) => {
		scrollTop.value = 0
		emits("changeType", {
			index,
			className
		})
	}
	// 滚动到底部
	const scrolltolower = () => {
		emits("scrolltolower")
	}
	// 处理内容区滚动事件
	const scrollTimer = ref(null)
	const handelScroll = (e) => {
		if (scrollTimer.value) {
			clearTimeout(scrollTimer.value)
		}
		scrollTimer.value = setTimeout(() => {
			scrollTop.value = 0
		}, 300)
	}
</script>

<style lang="scss" scoped>
	.class-container {
		display: flex;
		background-color: #fff;

		.active {
			color: #F76C2C !important;
		}

		.l {
			background-color: #F6F6F6;
			min-width: 150rpx;
			text-align: center;

			.class-item {
				padding: 20rpx 0;
				font-size: 30rpx;

				&:first-child {
					padding-top: 30rpx;
				}

				&:last-child {
					padding-bottom: 30rpx;
				}
			}
		}

		.r {
			flex: 1;
			position: relative;

			.book-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				align-items: center;
				padding: 20rpx;

				.book-item {
					width: 100%;
					display: flex;
					gap: 20rpx;
					align-items: center;

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						gap: 10rpx;

						.author {
							color: $gold-color;
							font-size: 24rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.name {
							font-size: 28rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.intro {
							color: $gray-color;
							font-size: 24rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
				}
			}
		}
	}
</style>
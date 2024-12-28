<template>
	<view class="nove-detail-container" :style="{backgroundColor:theme=='light'?'#fff':currentTheme.mainBcg}">
		<pageLoadingVue @reload="reload" :status="loadError?'error':'loading'" v-if="isLoading"></pageLoadingVue>
		<view class="nove-detail-top" :style="{backgroundImage:`url(${novel.cover})`}">
			<view class="frosted-glass" :style="{
					backgroundColor:theme=='light'?'rgba(255, 255, 255, 0.5)':currentTheme.secondaryBcg}
					">
			</view>
			<view class="status-bar"></view>
			<view class="back">
				<uv-icon @tap="goBack" bold name="arrow-left"
					:color="theme=='light'?(txtColor=='white'?'black':'white'):currentTheme.mainFontColor"
					size="28"></uv-icon>
			</view>
			<view class="info">
				<uv-image :src="novel.cover" lazy-load observeLazyLoad fade radius="5" width="90"
					height="120"></uv-image>
				<view class="name"
					:style="{color:theme=='light'?(txtColor=='white'?'black':'white'):currentTheme.mainFontColor}">
					{{novel.name}}
				</view>
				<view class="author"
					:style="{color:theme=='light'?(txtColor=='white'?'black':'white'):currentTheme.mainFontColor}">
					{{novel.author}} · {{novel.genre}}
				</view>
			</view>
		</view>
		<view class="nove-detail-bottom" :style="{backgroundColor:theme=='light'?'#fff':currentTheme.mainBcg}">
			<view class="info" :style="{color:currentTheme.mainFontColor}">
				<view class="t">
					<view class="l">{{novel.type=='novel'?novel.words_count:novel.genre.split(",")[0]}}</view>
					<view class="line">|</view>
					<view class="r">{{novel.status}}</view>
				</view>
				<!-- 小说简介 -->
				<uv-read-more :shadow-style="{
						backgroundImage:theme=='light'?'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)':'linear-gradient(-180deg, rgba(0,0 0, 0) 0%, #000 80%)'
					}" show-height="200rpx" :toggle="true" color="#D33D22">
					<view class="intro">
						{{novel.intro}}
					</view>
				</uv-read-more>
				<!-- 小说目录 -->
				<view class="catalog">
					<text class="txt">目录</text>
					<view class="catalog-name" @tap="goToChaptersPage">
						<text>
							连载至：{{novel_chapters.length>0?novel_chapters[novel_chapters.length-1]?.chapter_name:'当前小说暂无章节内容'}}
						</text>
						<uv-icon name="arrow-right"></uv-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部功能按钮 -->
		<view class="fun" :style="{backgroundColor:currentTheme.secondaryBcg,border:theme=='light'?'':'none'}">
			<view class="add-book" @tap="addBookShell" :style="{color:currentTheme.mainFontColor}">
				<uv-icon name="bookshelfshujia" custom-prefix="custom-icon" size="20"></uv-icon>
				{{isAdded?'已在书架':'加入书架'}}
			</view>
			<view class="view download">全本缓存</view>
			<view class="read" @tap="goToRead">开始阅读</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from 'vue';
	import {
		useStore
	} from 'vuex'
	import {
		calculateCoverMainColor,
		deleteFromBookShell,
		getComicChapters,
		getNovelChapters,
		getNovelDetai,
		insterBookShell,
		isInBookShell
	} from '../../api';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import pageLoadingVue from "@/components/loading/page-loading.vue";
	import EventBus from '@/utiles/eventBus';
	import useReload from "@/hooks/useReload.js"
	import useTheme from '@/hooks/useTheme';
	const {
		theme,
		currentTheme
	} = useTheme()
	const {
		loadErrorParam,
		reload
	} = useReload()
	const store = useStore()
	// 小说信息
	const novel = computed(() => store.state.currentNovelDetail)
	// 页面数据是否加载完毕
	const isLoading = ref(true);
	// 是否加载失败
	const loadError = ref(false)
	// 字体颜色
	const txtColor = ref('')
	// 小说章节
	const novel_chapters = ref([])
	// 是否已经加入书架
	const isAdded = ref(false)
	onShow(async () => {
		const addedVal = await isInBookShell(novel.value.id, novel.value.type)
		isAdded.value = addedVal
	})
	const init = async () => {
		try {
			loadError.value = false
			if (theme.value === 'light') await getCoverMainColor(novel.value.cover)
			await getChapters()
			isLoading.value = false
		} catch (error) {
			loadError.value = true
			loadErrorParam.fun = init
		}
	}
	onMounted(init)
	// 返回上一页
	const goBack = () => {
		uni.navigateBack()
	}
	// 获取封面主色调
	const getCoverMainColor = async (cover_url) => {
		const {
			data: {
				data: maincolor
			}
		} = await calculateCoverMainColor(cover_url)
		txtColor.value = maincolor
	}
	// 小说章节
	const getChapters = async () => {
		if (novel.value.type == "novel") {
			const {
				data: chapters
			} = await getNovelChapters(novel.value.id)
			novel_chapters.value = chapters
		} else {
			const res = await getComicChapters(novel.value.id);
			novel_chapters.value = res.data.data
		}
	}
	// 前往小说章节页面
	const goToChaptersPage = () => {
		if (novel_chapters.value.length > 0) {
			store.commit('setCurrentNovelChapters', {
				novel_name: novel.value.name,
				chapters: novel_chapters.value
			})
			uni.navigateTo({
				url: `/pages/chapters/chapters?novel_id=${novel.value.id}&from=detail`
			})
		} else {
			uni.showToast({
				icon: "none",
				title: "当前小说暂无章节内容",
			})
		}

	}
	// 开始阅读
	const goToRead = () => {
		const type = novel.value.type
		if (novel_chapters.value.length > 0) {
			uni.navigateTo({
				url: `/pages/${type}-read/${type}-read?${type}_id=${novel.value.id}&chapter_n=1`,
			})
		} else {
			uni.showToast({
				icon: "none",
				title: "当前小说暂无章节内容",
			})
		}
	}
	// 添加到书架
	const addBookShell = async () => {
		if (novel_chapters.value.length > 0) {
			if (isAdded.value) {
				await deleteFromBookShell(store.state.currentNovelDetail.id, novel.value.type)
				isAdded.value = false
			} else {
				await insterBookShell({
					novel_id: novel.value.id,
					...novel.value
				})
				isAdded.value = true
			}
		} else {
			uni.showToast({
				icon: "none",
				title: "当前小说暂无章节内容，暂不能加入书架",
			})
		}
	}
</script>

<style lang="scss" scoped>
	.nove-detail-container {
		min-height: 100vh;
		padding-bottom: 128rpx;

		.nove-detail-top {
			height: 550rpx;
			background-size: cover;
			background-position: center;
			position: relative;


			.back {
				padding: 20rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 50%;
				top: 55%;
				transform: translate(-50%, -50%);
				gap: 20rpx;
				z-index: 1;

				.name {
					text-align: center;
					font-size: 36rpx;
					color: #fff;
				}

				.author {
					font-size: 20rpx;
					color: $font-gray-color;
				}
			}
		}

		.nove-detail-bottom {
			transform: translateY(-30rpx);
			background-color: #fff;
			border-top-right-radius: 40rpx;
			border-top-left-radius: 40rpx;
			position: relative;

			.info {
				padding-top: 10rpx;
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				.t {
					display: flex;
					justify-content: space-between;
					padding: 20rpx 0;
					position: relative;

					.line {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						color: #dadbde;
					}

					.l,
					.r {
						flex: 1;
						text-align: center;
						font-size: 32rpx;
						font-weight: 500;
					}
				}

				.intro {
					padding: 0 30rpx;
					font-size: 28rpx;
				}

				.catalog {
					padding: 0 30rpx;
					display: flex;
					justify-content: space-between;
					gap: 40rpx;
					align-items: center;

					.txt {
						font-size: 40rpx;
						font-weight: 500;
					}

					.catalog-name {
						flex: 1;
						display: flex;
						justify-content: space-between;
						gap: 10rpx;
						font-size: 28rpx;
						align-items: center;
						color: rgb(143, 143, 143);

						text {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
					}
				}
			}
		}

		.fun {
			position: fixed;
			left: 0;
			bottom: 0;
			padding: 20rpx;
			width: 100%;
			display: flex;
			gap: 20rpx;
			background-color: #fff;
			border-top: 2rpx solid #ECECEC;

			.add-book {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 10rpx;
				font-size: 24rpx;
			}

			.download {
				flex: 1;
				background-color: #FCE6E8;
				color: $red-color;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}

			.read {
				flex: 1;
				background-color: $red-color;
				color: #fff;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}
		}
	}
</style>
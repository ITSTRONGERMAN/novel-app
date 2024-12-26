<template>
	<view class="home bcg-color-white">
		<view class="home-top" :style="{background:topBackground[currentActiveTabbar]}">
			<view class="status-bar"></view>
			<view class="search-box bcg-color-white" @tap="goToSearch">
				<uv-icon name="search" color="#989898" size="24"></uv-icon>
				<swiper @change="handelSwiperChange" disable-touch :indicator-dots="false" :autoplay="true" circular
					vertical :interval="3000" :duration="1000">
					<swiper-item v-for="item,index in searchRecommendList" :key="item.id">
						{{item.name}}
					</swiper-item>
				</swiper>
			</view>
			<!-- 顶部导航栏 -->
			<topTabbarVue :tabBarList="tabBarList" :value="currentActiveTabbar" @change="handelTopChange" />
		</view>
		<!-- 中部内容显示区 -->
		<midAreaVue :height="midAreaHeight" :length="tabBarList.length" :pageName="curentPage.name"
			:current="currentActiveTabbar" @pageChange="pageChange">
			<!-- 小说模块 -->
			<novelVue />
			<!-- 漫画模块 -->
			<comicVue />
		</midAreaVue>
	</view>
</template>

<script setup>
	import topTabbarVue from '../../components/common/top-tabbar/top-tabbar.vue';
	import midAreaVue from '../../components/home/mid-area/mid-area.vue';
	import getSystemInfo from '../../utiles/getSystemInfo';
	import getSelectorInfo from '../../utiles/getSelectorInfo';
	import novelVue from '../../components/home/novel.vue';
	import comicVue from './components/comic.vue';
	import {
		useStore
	} from 'vuex';
	import {
		onMounted,
		ref,
		getCurrentInstance,
		provide,
		computed,
		watch
	} from 'vue'
	import {
		getHotNovelList
	} from '../../api';
	import useSlide from '../../hooks/useSlide';
	import EventBus from '../../utiles/eventBus';
	const {
		currentActiveTabbar,
		pageChange,
		tabBarList,
		pageList,
		handelTopChange
	} = useSlide()
	// 公共状态管理库
	const store = useStore()
	const midAreaHeight = ref(0)
	const curentPage = computed(() => pageList.value[currentActiveTabbar.value])
	const topBackground = ref([
		'linear-gradient(45deg, rgba(250, 223, 209,0.5), rgba(205, 254, 209,0.5))',
		'linear-gradient(45deg, rgba(254, 205, 240,0.5), rgba(204, 255, 209,0.5))'
	])
	watch(curentPage, (newVal) => {
		if (!newVal.hasShown) {
			EventBus.emit(`${newVal.name}_show`)
			pageList.value[currentActiveTabbar.value] = {
				...newVal,
				hasShown: true
			}
		}
	})
	// 搜索推荐小说
	const searchRecommendList = ref([])
	onMounted(async () => {
		getMidAreaHeight()
		const res = await getHotNovelList()
		searchRecommendList.value = res.data.data
		currentNovel.value = searchRecommendList.value[0].name
		// 注册切换tab事件
		EventBus.on("changeTab", (tab) => {
			currentActiveTabbar.value = tab
		})
	})
	// 计算中部区域高度
	const getMidAreaHeight = async () => {
		const instance = await getCurrentInstance();
		const systemInfo = await getSystemInfo()
		const topInfo = await getSelectorInfo(instance, ".home-top")
		midAreaHeight.value = systemInfo.windowHeight - topInfo.height
	}
	const currentNovel = ref('')
	// Swiper改变
	const handelSwiperChange = (e) => {
		currentNovel.value = searchRecommendList.value[e.detail.current].name
	}
	const goToSearch = () => {
		uni.navigateTo({
			url: `/pages/search/search?novel_name=${currentNovel.value}`,
		})
	}
</script>

<style lang="scss" scoped>
	.home {
		.home-top {
			transition: all 0.3s;

			.search-box {
				padding: 10rpx 30rpx;
				width: 85%;
				margin: 0 auto;
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				gap: 20rpx;

				swiper {
					flex: 1;
					height: 50rpx;

					swiper-item {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						color: #989898;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>
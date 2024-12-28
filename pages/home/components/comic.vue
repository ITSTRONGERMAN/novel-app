<template>
	<midAreaItemVue ref="comicPage" @onRefresh="handelRefresh" @onScrollToLower="handelScrollLower">
		<view class="loading-box" v-if="isLoading">
			<loadingVue></loadingVue>
		</view>
		<view class="comic-page" v-else>
			<!-- 男女精选 -->
			<comicGenderRecommendVue @changeAchange="changeAchange" :rankList="rankList" @changeRank="changeRank" />
			<!-- 国漫也精彩 -->
			<comicHotRecommendVue title="国漫也精彩" :comicList="nationalComicList" />
			<!-- 日漫大世界 -->
			<comicHotRecommendVue title="日漫大世界" :comicList="japaneseComicList" />
			<!-- 专属热门推荐 -->
			<comicMoreRecomendVue :comicList="personalRecommenList.list" />
			<uv-load-more status="loading" loading-text="努力加载中..." />
		</view>
	</midAreaItemVue>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed,
		reactive
	} from 'vue'
	import midAreaItemVue from '@/components/mid-area/mid-area-item.vue';
	import {
		comicBoyRank,
		getComicByCategory,
		getYourPersionalRecommend
	} from '@/api';
	import EventBus from '@/utiles/eventBus';
	import loadingVue from '@/components/loading/loading.vue';
	import comicGenderRecommendVue from './comic-gender-recommend.vue';
	import useComicGenderRank from '../hooks/useComicGenderRank';
	import comicHotRecommendVue from './comic-hot-recommend.vue';
	import comicMoreRecomendVue from './comic-more-recomend.vue';
	import {
		useStore
	} from 'vuex'
	const {
		ranks,
		rankIndex,
		rankList,
		changeRank,
		changeAchange,
		getRankList
	} = useComicGenderRank() // 男女精选钩子函数
	const comicPage = ref(null)
	const store = useStore()
	const isLoading = ref(true)
	// 国漫列表
	const nationalComicList = ref([])
	// 日漫列表
	const japaneseComicList = ref([])
	// 专属你的人们推荐
	const personalRecommenList = reactive({
		offset: 0,
		size: 10,
		list: []
	})
	// 获取国漫推荐
	const getNationalComic = async () => {
		const res = await getComicByCategory("国漫", 6)
		nationalComicList.value = res.data.data
	}
	// 获取日漫推荐
	const getJapaneseComicList = async () => {
		const res = await getComicByCategory("日漫", 6)
		japaneseComicList.value = res.data.data
	}
	// 获取专属个人推荐
	const getRecommendList = async () => {
		const res = await getYourPersionalRecommend(personalRecommenList.size, personalRecommenList.offset)
		personalRecommenList.list = [...personalRecommenList.list, ...res.data.data]
	}
	// 刷新男女精选
	const refreshGenderRecommend = async () => {
		const res = await comicBoyRank(0)
		ranks.value = []
		ranks.value[0] = res.data.data
		rankIndex.value = 0
	}
	// 滚动到底部事件
	const handelScrollLower = async () => {
		personalRecommenList.offset += personalRecommenList.size
		await getRecommendList()
	}
	onMounted(async () => {
		EventBus.on("comic_show", async () => {
			await getRankList(0)
			await getNationalComic()
			await getJapaneseComicList()
			await getRecommendList()
			isLoading.value = false
		})
	})
	// 下拉刷新
	const handelRefresh = async () => {
		await refreshGenderRecommend()
		await getNationalComic()
		await getJapaneseComicList()
		personalRecommenList.list = []
		await getRecommendList()
		isLoading.value = false
		comicPage.value.endRefresh()
	}
</script>

<style lang="scss" scoped>
	.loading-box {
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.comic-page {
		display: flex;
		flex-direction: column;
		padding-bottom: 30rpx;
		gap: 30rpx;
	}
</style>
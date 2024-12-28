<template>
	<midAreaItemVue ref="novelPage" pageName="novel" @onRefresh="handelRefresh" @onScrollToLower="handelScrollLower">
		<view class="novel-page">
			<recommedVue :current="currentRank" :novelList="rankList" :isLoaded="isRankListLoaded"
				@changeRank="handelChangeRank" />
			<guessyoulikeVue :novelList="guessYouLikeList" />
			<uv-load-more status="loading" loading-text="努力加载中..." />
		</view>
	</midAreaItemVue>
</template>

<script setup>
	import {
		defineProps,
		onMounted,
		ref
	} from 'vue'
	import midAreaItemVue from '@/components/mid-area/mid-area-item.vue'
	import recommedVue from './novel-recommed.vue'
	import guessyoulikeVue from './novel-guessyoulike.vue'
	import EventBus from '@/utiles/eventBus.js'
	import useTheme from '@/hooks/useTheme'
	import {
		getFinishedRank,
		getGuessYouLike,
		getRecommendRank
	} from '@/api'
	const {
		currentTheme
	} = useTheme()
	const novelPage = ref(null)
	// 当前榜单列表
	const rankList = ref([])
	// 每个榜单数据
	const rankLists = ref([])
	const currentRank = ref(0)
	// 榜单数据是否加载完毕
	const isRankListLoaded = ref(false)
	// 猜你喜欢数据列表
	const guessYouLikeList = ref([])
	onMounted(async () => {
		handelChangeRank(0)
		getLikes()
	})
	// 滚动到底事件
	const handelScrollLower = () => {
		getLikes()
	}
	// 切换榜单
	const handelChangeRank = async (index = 0) => {
		isRankListLoaded.value = false
		currentRank.value = index
		try {
			if (rankLists.value[index]) {
				rankList.value = rankLists.value[index]
			} else {
				if (index == 0 || index == 1) {
					const {
						data: recommends
					} = await getRecommendRank()
					rankLists.value[index] = recommends
					rankList.value = recommends
				} else {
					const {
						data: recommends
					} = await getFinishedRank()
					rankLists.value[index] = recommends
					rankList.value = recommends
				}
			}
			isRankListLoaded.value = true
		} catch (e) {
			console.log(e.message);
		}
	}
	// 获取猜你喜欢列表数据
	const getLikes = async () => {
		let {
			data: likes
		} = await getGuessYouLike()
		likes = likes.map(item => ({
			...item,
			type: "novel"
		}))
		guessYouLikeList.value = [...guessYouLikeList.value, ...likes]
	}
	// 下拉刷新
	const handelRefresh = async () => {
		rankLists.value = []
		await handelChangeRank(0)
		guessYouLikeList.value = []
		await getLikes()
		novelPage.value.endRefresh()
	}
</script>

<style lang="scss" scoped>
	.novel-page {
		padding-bottom: 30rpx;
		height: 100vw;
	}
</style>
<template>
	<view class="recommend">
		<view class="title">
			<text :class="[current==index?'active':'']" v-for="item,index in rankList" :key="index"
				@tap="changeRank(index)">{{item}}</text>
		</view>
		<view class="list">
			<loadingVue v-show="!isLoaded"></loadingVue>
			<view class="list-item" @tap="goToNovelDetail(item)" v-show="isLoaded" v-for="item,index in novelList"
				:key="item.id">
				<view class="l">
					<uv-image :src="item.cover" lazy-load observeLazyLoad fade loadingIcon="photo-fill" duration="450"
						radius="5" width="50" height="60"></uv-image>
				</view>
				<view class="r">
					<view class="name">
						<text :class="['num',index<3?'advanced':'']">{{index+1}}</text>
						{{item.name}}
					</view>
					<view class="info">
						{{item.genre}}
						<text>{{item.author}}</text>
						<!-- <text>{{item.status}}</text> -->
						<text>{{item.words_count}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineEmits,
	} from 'vue'
	import loadingVue from '../../common/loading/loading.vue';
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const props = defineProps({
		isLoaded: {
			default: false,
			type: Boolean
		},
		novelList: {
			default: () => [],
			type: Array
		},
		current: {
			type: Number,
			default: 0
		}
	})
	const emits = defineEmits(['changeRank'])
	const rankList = ref([
		'推荐榜',
		'点击榜',
		'完本榜'
	])
	// 切换榜单
	const changeRank = (index) => {
		emits('changeRank', index)
	}
	const goToNovelDetail = (detail) => {
		store.commit('setCurrentNovelDetail', {
			...detail,
			type: "novel"
		})
		uni.navigateTo({
			url: '/pages/nove-detail/index',
			animationType: "slide-in-right"
		})
	}
</script>

<style lang="scss" scoped>
	.recommend {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		// overflow: hidden;

		.title {
			display: flex;
			gap: 20rpx;
			padding-top: 30rpx;
			padding-left: 30rpx;
			padding-bottom: 0;
			transition: all 0.3s;
			color: $gray-color;
		}

		.active {
			color: #000;
			font-weight: 500;
		}

		.list {
			column-count: 2;
			column-gap: 16px;
			padding: 20rpx 30rpx;
			height: 580rpx;
			flex-wrap: wrap;
			gap: 20rpx;
			background-color: #fff;
			position: relative;

			@keyframes fadeIn {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}

			.list-item {
				margin-bottom: 20rpx;
				display: flex;
				animation: fadeIn 0.5s forwards;

				.r {
					margin-left: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;

						.advanced {
							color: $gold-color !important;
						}

						.num {
							color: #000;
							font-weight: bold;
						}
					}

					.info {
						font-size: 20rpx;
						color: $gold-color;

						text {
							margin-left: 15rpx;
							color: $gray-color;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="recommend">
		<view class="title">
			<text :class="[current==index?'active':'']" v-for="item,index in rankList" :key="index"
				@tap="changeRank(index)">{{item}}</text>
		</view>
		<view class="list">
			<loadingVue v-show="!isLoaded"></loadingVue>
			<view class="list-item" v-show="isLoaded" v-for="item,index in novelList" :key="index">
				<view class="l">
					<uv-image :src="item.cover" lazy-load observeLazyLoad fade loadingIcon="photo-fill" duration="450"
						radius="5" width="50" height="60"></uv-image>
				</view>
				<view class="r">
					<view class="name">
						<text class="num">{{index+1}}</text>
						{{item.name}}
					</view>
					<view class="info">
						{{item.genre}}
						<text>{{item.author}}</text>
						<text>{{item.status}}</text>
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
		onMounted
	} from 'vue'
	import novelList from '../../../fakedata/novelList';
	import loadingVue from '../../common/loading/loading.vue';
	// 是否加载完毕
	const isLoaded = ref(false)
	const current = ref(0)
	const rankList = ref([
		'推荐榜',
		'点击榜',
		'完本榜'
	])
	onMounted(() => {
		setTimeout(() => {
			isLoaded.value = true
		}, 500)
	})
	const changeRank = (index) => {
		current.value = index
		isLoaded.value = false
		setTimeout(() => {
			isLoaded.value = true
		}, 500)
	}
</script>

<style lang="scss" scoped>
	.recommend {
		width: 100%;
		background-color: #fff;
		border-radius: 10rpx;
		// overflow: hidden;

		.title {
			display: flex;
			gap: 20rpx;
			// font-weight: bold;
			padding-top: 30rpx;
			padding-left: 30rpx;
			padding-bottom: 0;
			transition: all 0.3s;
			color: $font-gray-color;
		}

		.active {
			color: $main-color ;
			font-weight: bold;
		}

		.list {
			padding: 20rpx 30rpx;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			height: 580rpx;
			flex-wrap: wrap;
			background-color: #fff;

			@keyframes fadeIn {
				0% {
					opacity: 0;
					/* 初始透明度为0 */
				}

				100% {
					opacity: 1;
					/* 最终透明度为1 */
				}
			}

			.list-item {
				width: 50%;
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
						/* 限制为两行 */
						overflow: hidden;
						/* 隐藏超出的文本 */

						.num {
							color: red;
							font-weight: bold;
						}
					}

					.info {
						font-size: 20rpx;
						color: $main-color;

						text {
							margin-left: 15rpx;
							color: $font-gray-color;
						}
					}
				}
			}
		}
	}
</style>
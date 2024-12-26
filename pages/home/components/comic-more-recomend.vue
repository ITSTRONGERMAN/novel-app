<template>
	<view class="more-recomend">
		<view class="title">专属你的热门推荐</view>
		<view class="comic-list">
			<view @tap="goToDetail(item)" class="comic-item" v-for="item,index in comicList" :key="item.id">
				<uv-image bgColor="#fff" :src="`http://192.168.0.100/comic/cover/${item.name}.png`" lazy-load
					observeLazyLoad fade width="100%" height="250"></uv-image>
				<view class="bottom">
					<view class="comic-name">{{item.name}}</view>
					<view class="comic-genre">
						<view v-for="genre,index in item.genre.split(',')" :key="index">{{genre}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	defineProps({
		comicList: {
			type: Array,
			default: () => []
		},
	})
	const goToDetail = (detail) => {
		store.commit('setCurrentNovelDetail', {
			...detail,
			type: "comic"
		})
		uni.navigateTo({
			url: "/pages/detail/detail"
		})
	}
</script>

<style lang="scss" scoped>
	.more-recomend {
		.title {
			font-size: 34rpx;
			margin-bottom: 24rpx;
			font-weight: 500;
		}

		.comic-list:nth-last-child(1) {
			margin-bottom: 0;
		}

		.comic-list:nth-last-child(2) {
			margin-bottom: 0;
		}

		.comic-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 16px;


			.comic-item {
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				gap: 15rpx;
				background-color: #fff;

				.bottom {
					padding-bottom: 20rpx;
					padding-left: 20rpx;

					.comic-name {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						font-size: 28rpx;
						overflow: hidden;
					}

					.comic-genre {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: $gray-color;
						display: flex;
						flex-wrap: wrap;
						gap: 6rpx;
					}
				}
			}
		}
	}
</style>
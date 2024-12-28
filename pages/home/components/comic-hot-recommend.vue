<template>
	<view class="hot" :style="{backgroundColor:currentTheme.componentBcg}">
		<view class="hot-top" :style="{color:currentTheme.mainFontColor}">
			<view class="l">
				<uv-icon name="fire" color="red" custom-prefix="custom-icon" size="16"></uv-icon>
				{{title}}
			</view>
			<view class="r">
				更多
				<uv-icon name="arrow-right" size="24rpx" bold></uv-icon>
			</view>
		</view>
		<view class="comic-list">
			<view @tap="goToDetail(item)" class="comic-item" v-for="item,index in comicList" :key="item.id*(index+1)">
				<uv-image :src="`http://192.168.0.100/comic/cover/${item.name}.png`" lazy-load observeLazyLoad fade
					radius="5" width="100%" height="150"></uv-image>
				<view class="name" :style="{color:currentTheme.mainFontColor}">
					{{item.name}}
				</view>
				<view class="genre-list">
					<view class="genre-item" v-for="genre,index in item.genre.split(',').slice(0,3)" :key="index">
						{{genre}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		defineProps
	} from 'vue'
	import commonHook from '@/hooks/common'
	import useTheme from '@/hooks/useTheme'
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		goToDetail
	} = commonHook()
	defineProps({
		comicList: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: " "
		}
	})
</script>

<style lang="scss" scoped>
	.hot {
		background-color: #ffff;
		padding: 30rpx;
		border-radius: 20rpx;

		.hot-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.l {
				font-size: 32rpx;
				font-weight: 500;
				display: flex;
				gap: 10rpx;
				align-items: center;
			}

			.r {
				font-size: 24rpx;
				display: flex;
				gap: 6rpx;
				align-items: center;
			}
		}

		.comic-list {
			margin-top: 30rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 16px;

			.name {
				margin-top: 10rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				font-size: 28rpx;
				overflow: hidden;
				// text-align: center;
			}

			.genre-list {
				margin-top: 4rpx;
				display: flex;
				gap: 4rpx;
				font-size: 24rpx;
				flex-wrap: wrap;
				color: $gray-color;
			}
		}
	}
</style>
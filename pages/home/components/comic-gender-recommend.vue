<template>
	<view :class="['gender-recommend',theme+'-bcg']">
		<view class="recommend-top">
			<view class="title-list">
				<view :class="rankIndex==index?theme+'-active':''" @tap="changeRank(index)"
					v-for="item,index in rankTitle" :key="index">{{item}}</view>
			</view>
			<view class="more" :style="{color:currentTheme.mainFontColor}" @tap="changeAchange">
				<view>换一换</view>
				<uv-icon name="reload" size="14" bold></uv-icon>
			</view>
		</view>
		<view class="list">
			<view @tap="goToDetail(item)" class="item" v-for="(item,index) in rankList" :key="item.id">
				<uv-image :src="`http://192.168.0.100/comic/cover/${item.name}.png`" lazy-load observeLazyLoad fade
					radius="5" width="100%" height="200rpx"></uv-image>
				<view class="name" :style="{color:currentTheme.mainFontColor}">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineEmits,
		defineProps
	} from 'vue'
	import commonHook from '@/hooks/common'
	import useTheme from '../../../hooks/useTheme'
	const {
		currentTheme,
		theme
	} = useTheme()

	const {
		goToDetail
	} = commonHook()
	defineProps({
		rankList: {
			type: Array,
			default: () => []
		}
	})
	const rankTitle = ["男生精选", "女生精选"]
	const rankIndex = ref(0)
	const emits = defineEmits(["changeRank", "changeAchange"])
	const changeRank = async (index) => {
		rankIndex.value = index
		emits("changeRank", index)
	}
	const changeAchange = () => {
		emits("changeAchange")
	}
</script>

<style lang="scss" scoped>
	.light-bcg {
		background-color: #D5E7FB;
	}

	.dark-bcg {
		background-color: #1A1A1A;
	}

	.gender-recommend {
		padding: 30rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.recommend-top {
			display: flex;
			gap: 30rpx;
			align-items: center;

			.title-list {
				flex: 1;
				font-size: 32rpx;
				display: flex;
				gap: 30rpx;
				font-weight: 500;
				color: $gray-color;

				.light-active {
					color: #000
				}

				.dark-active {
					color: #fff
				}
			}

			.more {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				gap: 10rpx;
				font-weight: 500;
			}
		}

		.list {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-gap: 10px;
			height: 536.8rpx;

			.item {
				display: flex;
				flex-direction: column;
				gap: 10rpx;

				.name {
					width: 100%;
					font-size: 28rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}
	}
</style>
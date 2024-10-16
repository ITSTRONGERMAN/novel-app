<template>
	<view class="guess-like-container">
		<view class="title">猜你喜欢</view>
		<view class="list">
			<view class="item" v-for="item in novelList" :key="item.id">
				<view class="l">
					<uv-image :src="item.cover" lazy-load observeLazyLoad fade loadingIcon="photo-fill" duration="450"
						radius="5" width="90" height="120"></uv-image>
				</view>
				<view class="r">
					<view class="name">{{item.name}}</view>
					<view class="info">
						{{item.info}}
					</view>
					<view class="b">完结 69万字</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import novelList from '../../../fakedata/novelList.js'
</script>

<style lang="scss" scoped>
	.guess-like-container {
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 20;
		background-color: #fff;

		.title {
			font-size: 40rpx;
		}

		.list {
			display: flex;
			margin-top: 30rpx;
			flex-direction: column;
			gap: 30rpx;

			.item {
				display: flex;
				gap: 30rpx;

				.r {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 10rpx;

					.info {
						color: $font-gray-color;
						font-size: 24rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						/* 限制为两行 */
						overflow: hidden;

						/* 隐藏超出的文本 */
					}

					.b {
						color: $font-gray-color;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
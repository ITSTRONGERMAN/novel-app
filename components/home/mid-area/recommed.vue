<template>
	<view class="recommend">
		<view class="title">
			<text class="active">推荐榜</text>
			<text>完本榜</text>
		</view>
		<view class="list">
			<view class="list-item" v-for="item,index in novelList" :key="index">
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
	import novelList from '../../../fakedata/novelList';
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
		}

		.active {
			color: $main-color
		}

		.list {
			padding: 20rpx 30rpx;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			height: 580rpx;
			flex-wrap: wrap;

			.list-item {
				width: 50%;
				display: flex;

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
							color: #989898;
						}
					}
				}
			}
		}
	}
</style>
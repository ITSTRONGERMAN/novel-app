<template>
	<view class="book-list">
		<view class="book-item" v-for="item,index in bookList" :key="item.novel_id">
			<view class="l" @tap="exceptDetailPageGoToRead(item)">
				<view class="cover">
					<uv-image :src="item.cover" lazy-load observeLazyLoad fade radius="5" width="100%" height="100%"
						mode="widthFit"></uv-image>
					<view class="top" v-if="item.top==1">
						<uv-icon name="top" color="#fff" custom-prefix="custom-icon" size="20rpx"></uv-icon>
					</view>
				</view>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="hasRead">{{item.hasRead?`读到：${item.hasRead}`:'未读'}}</view>
					<view class="status">{{item.status}}</view>
				</view>
			</view>
			<view class="btn">
				<uv-icon @tap="operate({index,...item})" name="more" custom-prefix="custom-icon" size="20"
					color="#989898"></uv-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from 'vue'
	import commonHook from '../../../hooks/common'
	const {
		exceptDetailPageGoToRead
	} = commonHook()
	const emits = defineEmits(["operate"])
	defineProps({
		bookList: {
			default: Array,
			default: () => []
		}
	})
	const operate = (info) => {
		emits("operate", info)
	}
</script>

<style lang="scss" scoped>
	.book-list {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.book-item {
			display: flex;
			gap: 30rpx;

			.l {
				flex: 1;
				display: flex;
				gap: 30rpx;

				.cover {
					width: 150rpx;
					height: 200rpx;
					position: relative;

					.top {
						position: absolute;
						left: 0;
						top: 0;
						padding: 5rpx;
						background-color: rgba(0, 0, 0, .5);
						border-bottom-right-radius: 16rpx;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.name {
						font-size: 28rpx;
					}

					.hasRead,
					.status {
						font-size: 24rpx;
						color: $gray-color;
					}
				}
			}

			.btn {
				padding: 0 20rpx;
				height: inherit;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
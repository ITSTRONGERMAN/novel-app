<template>
	<view class="book-grid">
		<view class="book-item" v-for="(item,index) in bookList" :key="item.novel_id">
			<view @tap="exceptDetailPageGoToRead(item)" class="top">
				<view class="cover">
					<uv-image :src="item.cover" lazy-load observeLazyLoad fade radius="5" width="100%"
						height="160"></uv-image>
					<view :class="['finish',item.status=='完结'?'':'renew']">{{item.status}}</view>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
			<view class="bottom">
				<view class="chapter">{{item.hasRead?`读到：${item.hasRead}`:'未读'}}</view>
				<uv-icon @tap="operate(item)" name="more" custom-prefix="custom-icon" size="14"
					color="#989898"></uv-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits,
		onMounted
	} from 'vue'
	import commonHook from '../../../hooks/common'
	const {
		exceptDetailPageGoToRead
	} = commonHook()
	const emits = defineEmits(["operate"])
	const props = defineProps({
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
	.book-grid {
		padding: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20px;

		.book-item {
			display: flex;
			flex-direction: column;
			gap: 14rpx;

			.top {
				display: flex;
				flex-direction: column;
				gap: 14rpx;

				.cover {
					width: 100%;
					position: relative;

					.finish {
						background-color: #EBE9EA;
						border-radius: 6rpx;
						position: absolute;
						top: 5rpx;
						right: 5rpx;
						color: #000;
						font-size: 20rpx;
						padding: 4rpx;
					}

					.renew {
						background-color: $gold-color !important;
						color: #ffff !important;
					}
				}

				.name {
					text-align: center;
					font-size: 28rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}

			.bottom {
				display: flex;
				gap: 10rpx;
				align-items: center;
				justify-content: space-between;

				.chapter {
					text-align: center;
					font-size: 24rpx;
					color: $gray-color;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}
	}
</style>
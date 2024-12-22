<template>
	<view class="book-list">
		<view class="book-item" v-for="item in bookList" :key="item.novel_id">
			<uv-image :src="item.cover" lazy-load observeLazyLoad fade radius="5" width="80" height="100"
				mode="aspectCover"></uv-image>
			<view class="info">
				<view class="name">{{item.name}}</view>
				<view class="hasRead">{{item.hasRead?`读到：${item.hasRead}`:'未读'}}</view>
				<view class="status">{{item.status}}</view>
			</view>
			<view class="btn">
				<uv-icon @tap="operate(item)" name="more" custom-prefix="custom-icon" size="20"
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

			.info {
				flex: 1;
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
<template>
	<uv-popup :safeAreaInsetBottom="false" :round="10" ref="popup" mode="bottom" bgColor="#F6F7F9">
		<view class="handel-box">
			<view class="top">
				<uv-image :src="currentBook.cover" lazy-load observeLazyLoad fade radius="5" width="70"
					height="90"></uv-image>
				<view class="r">
					<view class="name">{{currentBook.name}}</view>
					<view class="author">{{currentBook.author}}</view>
				</view>
			</view>
			<view class="handel-list">
				<view class="handel-item" v-for="item,index in handelList" :key="index">
					<view class="icon">
						<uv-icon :size="item.size" :name="item.icon" @tap="item.onTap" v-if="!item.custom"></uv-icon>
						<uv-icon :name="item.icon" custom-prefix="custom-icon" @tap="item.onTap" :size="item.size"
							v-else></uv-icon>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<button style="margin: 10rpx;" @tap="popup.close()">取消</button>
	</uv-popup>
	<modalVue btnReverse ref="modal" title='确认将本书从书架移除' @confirm="confirm" confirmText="移除">
	</modalVue>
</template>

<script setup>
	import {
		ref,
		defineExpose,
		defineProps,
		defineEmits
	} from 'vue'
	import modalVue from '../../../components/modal/modal.vue'
	const popup = ref(null)
	const modal = ref(null)
	const handelList = ref([{
			icon: 'zhiding',
			custom: true,
			size: 25,
			name: '置顶',
			onTap() {
				console.log("content");
			}
		},
		{
			icon: 'content',
			custom: true,
			size: 17,
			name: '目录',
			onTap() {
				console.log("content");
			}
		},
		{
			icon: 'download',
			custom: false,
			size: 25,
			name: '下载本书',
			onTap() {
				console.log("dowload");
			}
		},
		{
			icon: 'reload',
			custom: false,
			size: 25,
			name: '清除缓存',
			onTap() {
				console.log("reload");
			}
		},
		{
			icon: 'trash',
			custom: false,
			size: 25,
			name: '删除',
			onTap: () => {
				popup.value.close()
				modal.value.open()
			}
		},
	])
	const open = () => {
		popup.value.open()
	}
	const emits = defineEmits(["confirmDelete"])
	const confirm = () => {
		emits("confirmDelete")
	}
	defineProps({
		currentBook: {
			required: true
		}
	})
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.handel-box {
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.top {
			display: flex;
			gap: 30rpx;

			.r {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 20rpx;

				.name {
					font-size: 32rpx;
				}

				.author {
					font-size: 24rpx;
					color: $gray-color;
				}
			}
		}

		.handel-list {
			display: flex;
			justify-content: space-between;

			.handel-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10rpx;

				.icon {
					width: 100rpx;
					height: 100rpx;
					background-color: #fff;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.name {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
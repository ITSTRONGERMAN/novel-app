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
				<view class="handel-item" v-for="item,index in handelList" @tap="item.onTap" :key="index">
					<view class="icon">
						<uv-icon :size="item.size" :name="item.icon[currentBook.top]" v-if="!item.custom"></uv-icon>
						<uv-icon :name="item.icon[currentBook.top]" custom-prefix="custom-icon" :size="item.size"
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
		defineEmits,
		computed
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import modalVue from '../../../components/modal/modal.vue'
	const store = useStore()
	const popup = ref(null)
	const modal = ref(null)
	const handelList = computed(() => (
		[{
				icon: ['top', 'canceltop'],
				custom: true,
				size: '40rpx',
				name: props.currentBook.top == 1 ? '取消置顶' : '置顶',
				onTap() {
					emits("topUpBook", props.currentBook)
				}
			},
			{
				icon: ['content', 'content'],
				custom: true,
				size: '34rpx',
				name: '目录',
				onTap() {
					store.commit('setCurrentNovelDetail', {
						...props.currentBook,
						id: props.currentBook.novel_id
					})
					uni.navigateTo({
						url: `/pages/chapters/chapters?novel_name=${props.currentBook.name}&novel_id=${props.currentBook.novel_id}&from=bookshell&type=${props.currentBook.type}`,
						success() {
							popup.value.close()
						}
					})
				}
			},
			{
				icon: ['download', 'download'],
				custom: false,
				size: '50rpx',
				name: '下载本书',
				onTap() {
					console.log("dowload");
				}
			},
			{
				icon: ['reload', 'reload'],
				custom: false,
				size: '50rpx',
				name: '清除缓存',
				onTap() {
					console.log("reload");
				}
			},
			{
				icon: ['trash', 'trash'],
				custom: false,
				size: '50rpx',
				name: '删除',
				onTap: () => {
					popup.value.close()
					modal.value.open()
				}
			},
		]
	))
	const open = () => {
		popup.value.open()
	}
	const emits = defineEmits(["confirmDelete", "topUpBook"])
	const confirm = () => {
		emits("confirmDelete")
	}
	const props = defineProps({
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
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 20rpx;

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
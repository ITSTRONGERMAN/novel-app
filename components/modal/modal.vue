<template>
	<uv-popup :round="10" ref="modal" bgColor="#fff" :closeOnClickOverlay="closeOnClickOverlay">
		<view class="modal" mode="center">
			<view class="content" v-html="title"></view>
			<view :class="['btn',btnReverse?'reverse':'']">
				<view class="btn-left" @tap="confirm">{{confirmText}}</view>
				<view class="btn-right" @tap="cancel">取消</view>
			</view>
		</view>
	</uv-popup>
</template>

<script setup>
	import {
		ref,
		defineExpose,
		defineEmits,
		defineProps
	} from 'vue'
	const modal = ref(null)
	const emits = defineEmits(['confirm'])
	defineProps({
		title: { // modal标题
			default: "hello",
			type: String
		},
		// 确认按钮文字
		confirmText: {
			default: "确定",
			type: String
		},
		// 按钮是否反向排列
		btnReverse: {
			default: false,
			type: Boolean
		},
		// 是否点击遮罩关闭modal
		closeOnClickOverlay: {
			default: false,
			type: Boolean
		}
	})
	const open = () => {
		modal.value.open()
	}
	const cancel = () => {
		modal.value.close()
	}
	const confirm = () => {
		modal.value.close()
		emits("confirm")
	}
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.modal {
		color: #656565;

		.content {
			width: 600rpx;
			padding: 60rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 1.5;
			font-weight: 700;
		}

		.reverse {
			flex-direction: row-reverse;
		}

		.btn {
			display: flex;
			font-weight: 700;

			view {
				flex: 1;
				padding: 30rpx 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				border: 2rpx solid #EDEDED;
				border-collapse: collapse;

				&:active {
					background-color: rgba(0, 0, 0, 0.05);
				}
			}

			.btn-left {
				border-right: none;
				color: #F19D37;
			}
		}
	}
</style>
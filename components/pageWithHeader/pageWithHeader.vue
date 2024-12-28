<template>
	<view class="page-with-header-contanier" :style="{backgroundColor:bodyBcg}">
		<view class=" page-header" :style="{backgroundColor:headerBcg,border:theme=='dark'?'none':''}">
			<view class="status-bar"></view>
			<view class="inner-box">
				<uv-icon @tap="back" name="arrow-left" size="46rpx"></uv-icon>
				<view class="name" :style="{color:titleColor}">
					{{title}}
				</view>
				<view class="placeholder">
					<slot name="header-right"></slot>
				</view>
			</view>
			<slot name="header-bottom"></slot>
		</view>
		<scroll-view scroll-y="true" :style="{height:scrollViewHeight+'px',backgroundColor:bodyBcg}">
			<slot name="body"></slot>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue'
	import getSystemInfo from '../../utiles/getSystemInfo'
	import getSelectorInfo from '../../utiles/getSelectorInfo'
	const instance = getCurrentInstance()
	const scrollViewHeight = ref(0)
	defineProps({
		title: {
			type: String,
			default: ''
		},
		headerBcg: {
			type: String,
			default: '#fff'
		},
		bodyBcg: {
			type: String,
			default: '#fff'
		},
		titleColor: {
			type: String,
			default: '#000'
		},
		theme: {
			type: String,
			default: "light"
		}
	})
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		const headerInfo = await getSelectorInfo(instance, '.page-header')
		scrollViewHeight.value = sysInfo.windowHeight - headerInfo.height
	})
	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.page-with-header-contanier {
		width: 100vw;
		height: 100vh;

		.page-header {
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #eee;
			background-color: #fff;

			.inner-box {
				padding: 20rpx 30rpx;
				padding-bottom: 0;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				align-items: center;

				view {
					text-align: center;
				}

				.name {
					font-size: 32rpx;
				}
			}

			.order {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 20rpx;
				padding-bottom: 10rpx;
				background-color: #fff;
				gap: 20rpx;

				.l {
					flex: 1;
					font-size: 28rpx;
					color: rgb(143, 143, 143);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.r {
					font-size: 24rpx;
					display: flex;
					align-items: center;
					gap: 10rpx;
				}
			}
		}
	}
</style>
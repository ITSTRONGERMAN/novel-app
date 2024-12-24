<template>
	<view class="about-contanier bcg-color">
		<view class="header">
			<view class="status-bar"></view>
			<view class="inner-box">
				<uv-icon @tap="back" color="#000" name="arrow-left" size="50rpx"></uv-icon>
			</view>
		</view>
		<view class="icon-box">
			<image src="../../static/images/logo.png" mode=""></image>
			<view class="name">番猫免费小说 </view>
		</view>
		<view class="about-list">
			<view class="about-item">
				<view class="name">版本信息：{{appVersion}}</view>
				<uv-icon color="#000" name="arrow-right" size="32rpx"></uv-icon>
			</view>
			<view class="about-item" @tap="goToGitHub">
				<view class="name">
					github地址：
				</view>
				<view class="content">
					https://github.com/ITSTRONGERMAN/novel-app
				</view>
			</view>
			<view class="about-item" @tap="goToDisclaimer">
				<view class="name">
					免责声明
				</view>
				<uv-icon color="#000" name="arrow-right" size="32rpx"></uv-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import getSystemInfo from '../../utiles/getSystemInfo'
	const appVersion = ref('')
	onMounted(async () => {
		const sysInfo = await getSystemInfo()
		appVersion.value = sysInfo.appVersion
	})
	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}
	// 打开外部浏览器，并进入GitHub地址
	const goToGitHub = () => {
		plus.runtime.openURL(encodeURI("https://github.com/ITSTRONGERMAN/novel-app"));
	}
	const goToDisclaimer = () => {
		uni.navigateTo({
			url: "/pages/aboutus/childpage/disclaimer/disclaimer"
		})
	}
</script>

<style lang="scss" scoped>
	.about-contanier {
		width: 100vw;
		height: 100vh;

		.header {
			padding: 0 20rpx;
		}

		.icon-box {
			padding: 100rpx 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20rpx;

			image {
				box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.1);
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}

			.name {
				font-size: 36rpx;
			}
		}

		.about-list {
			background-color: #fff;

			.about-item {
				padding: 30rpx;
				border-bottom: 2rpx solid #eee;
				font-size: 32rpx;
				transition: all 0.3s;
				display: flex;
				justify-content: space-between;

				.content {
					flex: 1;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				&:active {
					background-color: #F6F6F6;
				}

				&:last-child {
					border-bottom: none;
				}
			}

		}
	}
</style>
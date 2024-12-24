<template>
	<view class="user-contanier">
		<view class="header">
			<view class="status-bar"></view>
			<view class="login-contanier">
				<image src="../../static/images/logo.png" mode="" class="headImg"></image>
				<view class="userInfo">
					<!-- <view class="user-name">番猫免费小说</view> -->
					<view class="user-name" @tap="goToLogin">登录/注册</view>
					<view class="edit-info" v-if="false">编辑资料</view>
				</view>
			</view>
		</view>
		<view class="readInfo">
			<view class="readInfo-item">
				<view class="t">
					{{readInfo.collectionCount}}
					<text class="small-font">个</text>
				</view>
				<view class="b">我的收藏</view>
			</view>
			<view class="readInfo-item">
				<view class="t">
					{{store.state.readTime}}
					<text class="small-font">分钟</text>
				</view>
				<view class="b">阅读时长</view>
			</view>
			<view class="readInfo-item">
				<view class="t">0<text class="small-font">个</text></view>
				<view class="b">我的评论</view>
			</view>
			<view class="readInfo-item">
				<view class="t">
					{{readInfo.browseCount}}
					<text class="small-font">个</text>
				</view>
				<view class="b">浏览历史</view>
			</view>
		</view>
		<view class="config-list">
			<view class="title">常用功能</view>
			<view class="inner-box">
				<view @tap="goToHistory" class="config-list-item">
					<uv-icon name="history" custom-prefix="custom-icon" size="30"></uv-icon>
					<view class="txt">浏览历史</view>
				</view>
				<view class="config-list-item" @tap="handelShareApp">
					<uv-icon name="share" size="26"></uv-icon>
					<view class="txt">分享应用</view>
				</view>
				<view class="config-list-item">
					<uv-icon name="clear" custom-prefix="custom-icon" size="26"></uv-icon>
					<view class="txt">清除缓存</view>
				</view>
				<view class="config-list-item">
					<uv-icon name="bug" custom-prefix="custom-icon" size="26"></uv-icon>
					<view class="txt">bug报错</view>
				</view>
				<view class="config-list-item" @tap="reward">
					<uv-icon name="dashang" custom-prefix="custom-icon" size="26"></uv-icon>
					<view class="txt">打赏作者</view>
				</view>
				<view class="config-list-item">
					<uv-icon name="setting" size="26"></uv-icon>
					<view class="txt">设置</view>
				</view>
				<view class="config-list-item" @tap="handelAboutApp">
					<uv-icon name="info-circle" size="26"></uv-icon>
					<view class="txt">关于番猫</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from "vue"
	import EventBus from "../../utiles/eventBus.js"
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from 'vuex'
	import {
		getBookShellCount,
		getBrowseCount
	} from "../../api";

	const store = useStore()
	const readInfo = reactive({
		collectionCount: 0,
		browseCount: 0
	})
	onShow(async () => {
		const [{
			collections
		}] = await getBookShellCount()
		readInfo.collectionCount = collections
		const [{
			browseCount
		}] = await getBrowseCount()
		readInfo.browseCount = browseCount
	})
	// 分享APP
	const handelShareApp = () => {
		uni.shareWithSystem({
			summary: '番猫小说\n免费开源好用得阅读APP\n热门小说、漫画免费看\n官网地址：https://www.douyin.com/?recommend=1\ngithub地址：https://github.com/ITSTRONGERMAN/novel-app',
			success() {

			},
		})
	}
	// 关于APP
	const handelAboutApp = () => {
		uni.navigateTo({
			url: "/pages/aboutus/aboutus"
		})
	}
	// 前往浏览历史
	const goToHistory = () => {
		uni.navigateTo({
			url: "/pages/history/history"
		})
	}
	// 前往登录页
	const goToLogin = () => {
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	// 打赏
	const reward = () => {
		uni.navigateTo({
			url: "/pages/reward/reward"
		})
	}
</script>

<style lang="scss" scoped>
	.user-contanier {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
		width: 100vw;
		height: 100vh;
		background-color: #F6F6F6;

		.header {
			width: 100%;
			background-image: linear-gradient(to bottom, rgba(205, 254, 209, 0.5) 50%, transparent 100%);

			.feature {
				display: flex;
				justify-content: flex-end;
				gap: 20rpx;
				padding: 0 30rpx;
			}

			.login-contanier {
				display: flex;
				align-items: center;
				height: 250rpx;
				padding: 0 30rpx;
				gap: 20rpx;

				.headImg {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.1);
				}

				.userInfo {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					margin-left: 20rpx;

					.user-name {
						font-size: 32rpx;
					}

					.edit-info {
						padding: 6rpx 12rpx;
						background-color: rgba(0, 0, 0, 0.3);
						color: #fff;
						width: fit-content;
						border-radius: 30rpx;
						font-size: 20rpx;
					}
				}

			}

		}

		.readInfo {
			width: 95vw;
			padding: 30rpx 40rpx;
			background-color: #fff;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			border-radius: 20rpx;

			.readInfo-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10rpx;

				.small-font {
					margin-left: 2rpx;
					font-size: 24rpx;
				}

				.t {
					font-size: 36rpx;
					color: #000;
					font-weight: 500;
				}

				.b {
					font-size: 24rpx;
					color: $font-gray-color;
					font-weight: 500;
				}
			}
		}

		.config-list {
			margin-top: 20rpx;
			width: 95vw;
			background-color: #fff;
			padding: 30rpx 40rpx;
			border-radius: 20rpx;

			.title {
				font-size: 32rpx;
				padding-bottom: 20rpx;
			}

			.inner-box {
				display: grid;
				grid-gap: 20rpx;
				grid-template-columns: repeat(3, 1fr);

				.config-list-item {
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 10rpx;
					align-items: center;

					.txt {
						font-size: 24rpx;
						color: #000;
					}
				}
			}
		}
	}
</style>
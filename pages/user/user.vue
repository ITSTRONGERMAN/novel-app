<template>
	<view class="user-contanier" :style="{backgroundColor:currentThemeStyle.mainBcg}">
		<view class="header" :style="{backgroundImage:store.state.theme=='light'?'':'none'}">
			<view class="status-bar"></view>
			<view class="login-contanier">
				<image src="../../static/images/logo.png" mode="" class="headImg"></image>
				<view class="userInfo" :style="{color:currentThemeStyle.mainFontColor}">
					<view class="user-name">番猫免费小说</view>
					<!-- <view class="user-name" @tap="goToLogin">登录/注册</view> -->
					<!-- <view class="edit-info" v-if="false">编辑资料</view> -->
				</view>
			</view>
		</view>
		<view class="readInfo" :style="{backgroundColor:currentThemeStyle.secondaryBcg}">
			<view class="readInfo-item">
				<view class="t" :style="{color:currentThemeStyle.mainFontColor}">
					{{readInfo.collectionCount}}
					<text class="small-font">个</text>
				</view>
				<view class="b">我的收藏</view>
			</view>
			<view class="readInfo-item">
				<view class="t" :style="{color:currentThemeStyle.mainFontColor}">
					{{store.state.readTime}}
					<text class="small-font">分钟</text>
				</view>
				<view class="b">阅读时长</view>
			</view>
			<view class="readInfo-item">
				<view class="t" :style="{color:currentThemeStyle.mainFontColor}">0<text class="small-font">个</text>
				</view>
				<view class="b">我的评论</view>
			</view>
			<view class="readInfo-item">
				<view class="t" :style="{color:currentThemeStyle.mainFontColor}">
					{{readInfo.browseCount}}
					<text class="small-font">个</text>
				</view>
				<view class="b">浏览历史</view>
			</view>
		</view>
		<view class="config-list" :style="{backgroundColor:currentThemeStyle.secondaryBcg}">
			<view class="title" :style="{color:currentThemeStyle.mainFontColor}">常用功能</view>
			<view class="inner-box">
				<view :key="index" v-for="configItem,index in configItemList" @tap="configItem.onTap"
					class="config-list-item">
					<uv-icon :name="configItem.icon" :custom-prefix="configItem.iconPrefix"
						:size="configItem.size"></uv-icon>
					<view class="txt" :style="{color:currentThemeStyle.mainFontColor}">{{configItem.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive,
		computed,
	} from "vue"
	import EventBus from "@/utiles/eventBus.js"
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from 'vuex'
	import {
		getBookShellCount,
		getBrowseCount
	} from "@/api";
	import useTheme from "@/hooks/useTheme.js"
	import {
		configItemList
	} from "./props.js";
	import themeSwitchVue from "./components/theme-switch.vue";
	import themeStyle from "@/theme/index.js";
	const store = useStore()
	const currentThemeStyle = computed(() => themeStyle[store.state.theme])
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
	// 前往登录页
	const goToLogin = () => {
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	onMounted(() => {
		// tabBar主题切换
		EventBus.on("changeTabBarTheme", (style) => {
			uni.setTabBarStyle({
				...style,
				fail(e) {
					console.log(e);
				}
			})
		})
	})
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
				align-items: center;
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
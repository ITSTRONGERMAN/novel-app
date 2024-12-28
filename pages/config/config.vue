<template>
	<view class="config-contanier">
		<pageWithHeader title="设置" :theme="store.state.theme" :header-bcg="currentTheme?.secondaryBcg"
			:body-bcg="currentTheme?.mainBcg" :titleColor="currentTheme?.mainFontColor">
			<template #header-bottom>
				<view style="height:20rpx"></view>
			</template>
			<template #body>
				<view class="config-list">
					<view class="inner-box">
						<view :style="{backgroundColor:currentTheme?.secondaryBcg,color:currentTheme?.mainFontColor}"
							class="config-list-item" @tap="themeActionSheet.open()">
							日间模式
							<uv-icon size="30rpx" name="arrow-right"></uv-icon>
						</view>
						<view :style="{backgroundColor:currentTheme?.secondaryBcg,color:currentTheme?.mainFontColor}"
							class="config-list-item">
							缓存管理
							<uv-icon size="30rpx" name="arrow-right"></uv-icon>
						</view>
					</view>
				</view>
			</template>
		</pageWithHeader>
		<uv-action-sheet fontSize="32rpx" cancelText="关闭" :closeOnClickOverlay="false" ref="themeActionSheet"
			:actions="themeActions" @select="onSelect" />
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		watch,
		onUnmounted
	} from 'vue'
	import pageWithHeader from "../../components/pageWithHeader/pageWithHeader.vue"
	import useThemeAction from './hooks/useThemeAction';
	import setBottomNavigationBarColor from "@/utiles/setBottomNavigationBarColor"
	import useTheme from '@/hooks/useTheme';
	import {
		useStore
	} from 'vuex'
	import EventBus from '@/utiles/eventBus';
	const {
		currentTheme
	} = useTheme()
	const store = useStore()
	const {
		themeActionSheet,
		themeActions,
		onSelect
	} = useThemeAction()
	watch(() => store.state.theme, () => {
		setBottomNavigationBarColor(currentTheme.value.mainBcg)
	})
	onUnmounted(() => {
		setTimeout(() => {
			EventBus.emit("changeTabBarTheme", {
				color: currentTheme.value.mainFontColor,
				selectedColor: currentTheme.value.tarBarItemSelectedColor,
				backgroundColor: currentTheme.value.secondaryBcg,
			})
		}, 0)
	})
</script>

<style lang="scss" scoped>
	.config-list {
		padding: 20rpx;

		.inner-box {
			border-radius: 10rpx;
			overflow: hidden;

			.config-list-item {
				padding: 30rpx 20rpx;
				display: flex;
				justify-content: space-between;
				color: 36rpx;
				align-items: center;
				background-color: #fff;
			}
		}
	}
</style>
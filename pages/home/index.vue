<template>
	<view class="home">
		<view class="home-top">
			<view class="status-bar"></view>
			<view class="search-box">
				<uv-search shape="round" :showAction="false" disabled></uv-search>
			</view>
			<!-- 顶部导航栏 -->
			<topTabbarVue :value="currentActiveTabbar" @change="handelTopChange" />
		</view>
		<!-- 中部内容显示区 -->
		<midAreaVue :height="midAreaHeight" :length="3" :current="currentActiveTabbar" @pageChange="pageChange">
			<!-- 小说模块 -->
			<novelVue :height="midAreaHeight" />
			<midAreaItemVue :height="midAreaHeight">
				2
			</midAreaItemVue>
			<midAreaItemVue :height="midAreaHeight">
				3
			</midAreaItemVue>
		</midAreaVue>
		<!-- 底部导航栏 -->
		<bottomTabbarVue />
	</view>
</template>

<script setup>
	import topTabbarVue from '../../components/common/top-tabbar/top-tabbar.vue';
	import bottomTabbarVue from '../../components/common//bottom-tabbar/bottom-tabbar.nvue';
	import midAreaVue from '../../components/home/mid-area/mid-area.vue';
	import getSystemInfo from '../../utiles/getSystemInfo';
	import getSelectorInfo from '../../utiles/getSelectorInfo';
	import novelVue from '../../components/home/novel.vue';
	import midAreaItemVue from '../../components/home/mid-area/mid-area-item.vue';
	midAreaItemVue
	import {
		onMounted,
		ref,
		getCurrentInstance,
		provide
	} from 'vue'
	const midAreaHeight = ref(0)
	// 当前激活的tabBar
	const currentActiveTabbar = ref(0)
	onMounted(() => {
		getMidAreaHeight()
	})
	// 计算中部区域高度
	const getMidAreaHeight = async () => {
		const instance = await getCurrentInstance();
		const systemInfo = await getSystemInfo()
		const topInfo = await getSelectorInfo(instance, ".home-top")
		midAreaHeight.value = systemInfo.windowHeight - topInfo.height - 50
	}
	const pageChange = (e) => {
		if (e == 'l') {
			currentActiveTabbar.value--;
		} else if (e == 'r') {
			currentActiveTabbar.value++;
		}
	}
	const handelTopChange = (e) => {
		currentActiveTabbar.value = e.index
	}
</script>

<style lang="scss" scoped>
	.home {
		.search-box {
			margin: 30rpx;
			margin-top: 0;
			margin-bottom: 10rpx;
		}
	}
</style>
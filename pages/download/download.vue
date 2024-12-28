<template>
	<pageWithHeader title="我的下载" :theme="theme" :header-bcg="currentTheme?.secondaryBcg"
		:body-bcg="currentTheme?.mainBcg" :titleColor="currentTheme?.mainFontColor">
		<template #header-bottom>
			<view style="height:20rpx"></view>
		</template>
	</pageWithHeader>
</template>

<script setup>
	import pageWithHeader from "@/components/pageWithHeader/pageWithHeader.vue"
	import useTheme from "@/hooks/useTheme";
	const {
		currentTheme,
		theme
	} = useTheme()
</script>

<style>

</style>
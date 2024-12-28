<template>
	<pageWithHeaderVue title="免责声明" :theme="theme" :header-bcg="currentTheme?.secondaryBcg"
		:body-bcg="currentTheme?.mainBcg" :titleColor="currentTheme?.mainFontColor">
		<template #header-bottom>
			<view style="height:20rpx"></view>
		</template>
		<template #body>
			<view class="disclaimer-container" :style="{color:currentTheme?.mainFontColor}">
				<view class="h1">《番猫免费小说 开源免责声明》</view>
				<p class="h2">尊敬的读者：</p>
				<p class="content"> 欢迎阅读由 PIONEER.JU 创作并开源的小说软件《番猫免费小说》。在此，特向您阐明相关事宜，请您在阅读前仔细阅读本免责声明。</p>
				<p class="h2">一、内容性质</p>
				<p class="content">本小说为虚构创作，所有人物、情节、场景等均源自作者的想象与构思，与现实中的个人、团体、事件无直接关联，如有雷同，纯属巧合。</p>
				<p class="h2">二、开源许可</p>
				<p class="content">
					本小说依据MIT开源协议进行发布，这意味着您有权在遵循该协议条款的前提下，对本小说进行合理使用、分享、改编等操作。但未经作者书面许可，不得用于任何商业盈利目的，包括但不限于出版印刷、影视改编盈利、网络付费阅读等商业行为。
				</p>
				<p class="h2">三、风险提示</p>
				<p class="content">
					阅读小说是一种个人娱乐行为，由于个人理解、心理承受能力等差异，若您在阅读过程中因小说内容产生任何不适、精神压力或其他负面情绪，作者及相关开源平台不承担任何责任。请您依据自身情况，谨慎选择阅读。</p>
				<p class="h2">四、版权归属</p>
				<p class="content">本小说的版权归属于 PIONEER.JU，虽开源供公众阅读与交流，但作者始终保留对小说的最终解释权以及对违反开源协议行为追究法律责任的权利。</p>
				<p class="h2">五、更新与维护</p>
				<p class="content"> 作者将尽力按照既定计划更新小说内容，但因不可预见的个人原因、技术问题等因素，可能导致更新延迟或中断，望您理解，并不对此追究作者责任。</p>
				<p class="h2">六、外部链接与引用</p>
				<p class="content">小说中可能包含指向外部网站、资料的链接，作者不对这些外部资源的安全性、准确性、合法性负责，您点击访问这些链接所产生的一切后果自行承担。</p>
				<p class="content">再次感谢您对本开源小说的关注与支持，希望您享受阅读过程，若您有任何疑问或建议，欢迎通过与作者沟通。</p>
				<p class="content">PIONEER.JU</p>
				<p class="content">邮箱：2929727886@qq.com</p>
			</view>
		</template>
	</pageWithHeaderVue>
</template>

<script setup>
	import pageWithHeaderVue from '@/components/pageWithHeader/pageWithHeader.vue';
	import useTheme from '@/hooks/useTheme';
	const {
		currentTheme,
		theme
	} = useTheme()
</script>

<style lang="scss" scoped>
	.disclaimer-container {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;

		.h1 {
			font-size: 36rpx;
			font-weight: 500;
			text-align: center;
			margin-bottom: 30rpx;
		}

		.content {
			line-height: 1.7;
			text-indent: 2em;
			font-size: 32rpx;
		}
	}
</style>
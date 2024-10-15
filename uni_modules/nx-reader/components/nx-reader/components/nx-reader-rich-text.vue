<template>
	<view>
		<template v-for="(n, index) in nodes">
			<!-- #ifdef MP-BAIDU -->
			<text v-if="n.text" selectable="false" decode>{{n.text}}</text>
			<!-- #endif -->
			<!-- #ifndef MP-BAIDU -->
			<text v-if="n.text" :selectable="false" decode>{{n.text}}</text>
			<!-- #endif -->
			<!-- #ifndef MP-BAIDU -->
			<text v-else-if="n.name==='br'" :selectable="false">\n</text>
			<!-- #endif -->
			<rich-text v-else :nodes="[n]" :selectable="false"></rich-text>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'nx-reader-rich-text',
		props: {
			nodes: {
				type: Array,
				default: () => []
			}
		},
	}
</script>

<style>
</style>
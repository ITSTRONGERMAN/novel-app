<template>
	<midAreaItemVue :height="height">
		<recommedVue />
		<guessyoulikeVue />
	</midAreaItemVue>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	import midAreaItemVue from './mid-area/mid-area-item.vue'
	import recommedVue from './mid-area/recommed.vue'
	import guessyoulikeVue from './mid-area/guessyoulike.vue'
	const props = defineProps({
		height: {
			type: Number,
			required: true
		},
	})
</script>

<style>
</style>
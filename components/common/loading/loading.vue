<template>
	<view class="loading-container" :style="{position:type=='loading'?'absolute':'relative'}">
		<defaultLoadingVue v-if="type=='loading'"></defaultLoadingVue>
		<pulldownLoadingVue v-else-if="type=='pulldown'"></pulldownLoadingVue>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';
	import defaultLoadingVue from './default-loading.vue';
	import pulldownLoadingVue from './pulldown-loading.vue';
	defineProps({
		type: {
			type: String,
			default: 'loading'
		},
		animation: {
			type: Boolean,
			default: true
		}
	})
</script>
<style lang="scss" scoped>
	.loading-container {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		.recommend-loading-img {
			transform: scale(0.25);
		}

		.pulldown-loading {
			width: 70rpx;
			height: 70rpx;
			display: inline-block;
			position: relative;
		}

		.pulldown-loading::before {
			content: "";
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: $main-color;
			position: absolute;
			left: 0;
			top: 0;
		}

		.pulldown-active {
			animation: pull-down-loading 2s ease-in-out infinite;
		}

		@keyframes pull-down-loading {

			0%,
			100% {
				transform: scale(0);
				opacity: 1;
			}

			50% {
				transform: scale(1);
				opacity: 0;
			}
		}


	}
</style>
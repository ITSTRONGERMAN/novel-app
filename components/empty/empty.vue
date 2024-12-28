<template>
	<view class="empty">
		<l-empty v-if="type.length==0">
		</l-empty>
		<l-empty v-else :image="type"></l-empty>
		<view class="txt" :style="{color}">{{desc}}</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	defineProps({
		color: {
			type: String,
			default: '#000'
		},
		desc: {
			type: String,
			default: '没有相关内容'
		},
		type: {
			type: String,
			default: ''
		}
	})
</script>

<style lang="scss" scoped>
	.empty {
		display: flex;
		flex-direction: column;

		.txt {
			font-size: 28rpx;
			text-align: center;
			transform: translateY(-80rpx);
		}
	}
</style>
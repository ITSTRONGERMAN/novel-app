<template>
	<view :class="['catalog',catalogShow?'show':'']" :style="{backgroundColor:theme.backgroundColor}">
		<view class="status-bar"></view>
		<scroll-view :scroll-into-view="chapterNameList.length>0?'chapter_'+currentChapter_n:''"
			:style="`height:${chapterNameScrollHeight}px`" class="scroll-box" :scroll-y="true">
			<view @tap="changeChapter(item.chapter_n)" :id="'chapter_'+item.chapter_n" class="item"
				v-for="(item,index) in chapterNameList" :key="item.id"
				:style="{color:currentChapter_n==item.chapter_n?'rgb(41, 121, 255)':theme.color}">
				{{item.chapter_name.trim()}}
			</view>
		</scroll-view>
	</view>
</template>
<script setup>
	import {
		defineProps,
		defineEmits
	} from 'vue'
	const emit = defineEmits(['changeChapter'])
	defineProps({
		catalogShow: { // 目录弹出层是否显示
			type: Boolean,
			default: false
		},
		theme: { // 主题
			type: Object,
			default: () => ({
				backgroundColor: '#F6F6F6',
				color: '#929292',
				contentColor: '#000'
			})
		},
		currentChapter_n: { // 当前章节
			type: Number,
			default: 1
		},
		chapterNameList: { // 章节列表
			type: Array,
			default: () => []
		},
		chapterNameScrollHeight: { // 章节列表滚动区高度
			type: Number,
			default: 0
		}
	})
	// 切换章节
	const changeChapter = (chapter_n) => {
		emit('changeChapter', chapter_n)
	}
</script>
<style lang="scss" scoped>
	.show {
		transform: translate(0, 0) !important;
	}

	.catalog {
		position: fixed;
		left: 0;
		top: 0;
		width: 60%;
		height: 100%;
		background-color: #000;
		transition: transform 0.3s;
		transform: translateX(-100%);
		z-index: 11;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		.scroll-box {
			padding: 20rpx 30rpx;

			.item {
				font-size: 30rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #1F1F1F;
			}
		}
	}
</style>
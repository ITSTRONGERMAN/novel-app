<template>
	<view class="comic-chapter-content">
		<view class="image-container">
			<comicImageVue @intoView="handelImageIntoView" v-for="item,index in chapter.imgUrlList" :key="index"
				:imgInfo="item" />
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		getCurrentInstance,
		ref,
		defineEmits
	} from 'vue'
	import comicImageVue from './comic-image.vue';
	const props = defineProps({
		chapter: {
			type: Object,
			default: () => {}
		},
		id: {
			required: true
		}
	})
	const emits = defineEmits(["changeChapterInfo"])
	const observer = ref(null)
	// 当漫画图片进入视口时
	const handelImageIntoView = ({
		imgNum
	}) => {
		emits("changeChapterInfo", {
			chapter_name: props.chapter.chapter_name,
			chapter_n: props.chapter.chapter_n,
			curentImgNum: imgNum,
			totalImage: props.chapter.imgUrlList.length
		})
	}
</script>

<style>
</style>
<template>
	<view class="history-list" :style="{paddingBottom:isEditMode?operationContanierHeight+'px':0}">
		<l-empty v-if="historyList.length===0" description="没有找到相关内容" />
		<view v-else @tap="selectBook(index,book)" @longpress="handelLongPress(index)" class="history-list-item"
			v-for="book,index in historyList" :key="book.id">
			<view class="l">
				<view class="cover">
					<view class="type" :style="typeStyle[book.type].style">{{typeStyle[book.type].name}}</view>
					<uv-image :src="book.cover" lazy-loade observeLazyLoad fade radius="5" width="140rpx"
						height="200rpx"></uv-image>
				</view>
				<view class="info">
					<view class="name">{{book.name}}</view>
					<view class="b">
						<view class="chapter">{{book.chapter_name}}</view>
						<view class="time">浏览时间：{{parseTime(book.read_time)}}</view>
					</view>
				</view>
			</view>
			<view class="r">
				<uv-icon v-if="isEditMode" :color="book.checked?'#F66B32':'#7E7E7E'" name="checkmark-circle-fill"
					size="24"></uv-icon>
				<view @tap.stop="addToBookShell({index,...book})" v-else
					:class="['addBookShell',book.isInBookShell?'hasAdded':'']">
					{{book.isInBookShell?'已加':'加入'}}书架
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		parseTime
	} from '../utils';
	import {
		defineProps,
		defineEmits,
		reactive
	} from 'vue'
	import commonHook from "../../../hooks/common"
	const {
		exceptDetailPageGoToRead
	} = commonHook()
	const typeStyle = reactive({
		comic: {
			name: '漫画',
			style: {
				backgroundColor: '#D9F0E9',
				color: "#386E5E"
			}
		},
		novel: {
			name: '小说',
			style: {
				backgroundColor: '#E6E7EB',
				color: "#444246"
			}
		}
	})
	const props = defineProps({
		historyList: {
			type: Array,
			default: () => []
		},
		isEditMode: {
			type: Boolean,
			default: false
		},
		operationContanierHeight: {
			type: Number,
			default: 0
		}
	})
	const emits = defineEmits(["selectBook", "handelLongPress", "addToBookShell"])
	// 选择书本
	const selectBook = (index, book) => {
		if (props.isEditMode) emits("selectBook", index)
		else exceptDetailPageGoToRead(book)
	}
	// 长按历史项
	const handelLongPress = (index) => {
		emits("handelLongPress", index)
	}
	// 添加到书架中
	const addToBookShell = (book) => {
		if (book.isInBookShell) return
		emits("addToBookShell", book)
	}
</script>

<style lang="scss" scoped>
	.history-list {
		transition: all 0.3s;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.history-list-item {
			display: flex;
			gap: 30rpx;
			align-items: center;

			.l {
				display: flex;
				gap: 30rpx;
				align-items: center;

				.cover {
					position: relative;

					.type {
						position: absolute;
						right: 6rpx;
						top: 6rpx;
						padding: 4rpx 6rpx;
						border-radius: 8rpx;
						font-size: 20rpx;
						z-index: 99;
					}
				}

				.info {
					flex: 1;
					height: inherit;
					display: flex;
					flex-direction: column;
					gap: 20rpx;

					.name {
						font-size: 32rpx;
					}

					.b {
						font-size: 24rpx;
						color: $gray-color;
						display: flex;
						flex-direction: column;
						gap: 10rpx;
					}
				}
			}

			.r {
				flex: 1;
				justify-content: center;
				display: flex;
				align-items: center;

				.addBookShell,
				.hasAdded {
					width: fit-content;
					padding: 10rpx 20rpx;
					font-size: 24rpx;
					border-radius: 20rpx;
					color: #000;
					background-color: #F7F7F7;
					text-wrap: nowrap;
				}

				.hasAdded {
					color: #AFAFAF;
				}

			}
		}
	}
</style>
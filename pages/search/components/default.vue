<template>
	<!-- 搜索历史 -->
	<view class="area" v-if="historyList.length>0">
		<view class="area-top" :style="{color:currentTheme.mainFontColor}">
			<view class="l">
				搜索历史
			</view>
			<view class="r">
				<template v-if="historyList.length>3">
					<view class="btn" @tap="isFold=!isFold">
						{{isFold?'展开':'收起'}}
						<uv-icon :name="isFold?'arrow-down':'arrow-up'" size="12"></uv-icon>
					</view>
					<view class="btn">|</view>
				</template>
				<uv-icon name="trash" @tap="clearModal.open()" size="20"></uv-icon>
			</view>
		</view>
		<view :class="['list',isFold?'fold':'unfold']">
			<view :style="{backgroundColor:currentTheme.componentBcg,color:currentTheme.mainFontColor}"
				@tap="handelSearch(item)" class="list-item" v-for="item,index in  historyList" :key="index">
				{{item}}
			</view>
		</view>
	</view>
	<!-- 热门搜索 -->
	<view class="area">
		<view class="area-top" :style="{color:currentTheme.mainFontColor}">
			<view class="l">
				热门搜索
			</view>
		</view>
		<view :class="['list','unfold']">
			<view :style="{backgroundColor:currentTheme.componentBcg,color:currentTheme.mainFontColor}"
				@tap="goToDetail(item)" class="list-item" v-for="item,index in  hotSearchList" :key="item.id">
				{{item.name}}
			</view>
		</view>
	</view>
	<!-- 确认删除历史记录Modal -->
	<modalVue ref="clearModal" title='历史记录清除后无法恢复,是否清除全部历史记录' @confirm="clearHistory" confirmText="确认">
	</modalVue>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineEmits
	} from 'vue'
	import modalVue from '@/components/modal/modal.vue'
	import commonHook from '@/hooks/common'
	import useTheme from '@/hooks/useTheme'
	const {
		currentTheme,
		theme
	} = useTheme()
	const {
		goToDetail
	} = commonHook()
	const clearModal = ref(null)
	const isFold = ref(true)
	defineProps({
		hotSearchList: {
			type: Array,
			default: () => []
		},
		historyList: {
			type: Array,
			default: () => []
		},
	})
	const emits = defineEmits(['clearHistory', 'handelSearch'])
	const clearHistory = () => {
		isFold.value = true
		emits('clearHistory')
	}
	const handelSearch = (keyword) => {
		emits("handelSearch", keyword)
	}
</script>

<style lang="scss" scoped>
	.area {
		padding: 0 30rpx;
		margin: 20rpx 0;

		.area-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.l {
				font-size: 32rpx;
				font-weight: 700;
			}

			.r {
				display: flex;
				align-items: center;
				gap: 20rpx;

				.btn {
					display: flex;
					gap: 10rpx;
					color: $font-gray-color;
					font-size: 24rpx;
				}
			}
		}

		.fold {
			height: 54rpx;
			overflow: hidden;
		}

		.unfold {
			height: auto;
			overflow: visible;
		}

		.list {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			gap: 20rpx;
			flex-wrap: wrap;

			.list-item {
				width: fit-content;
				padding: 10rpx 20rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
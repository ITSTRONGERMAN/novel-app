<template>
	<view :class="['config',show?'show':'']" :style="{backgroundColor:themeStyle.backgroundColor,color:themeStyle.contentColor
		}">
		<view class="brightness">
			<view class="config-name">亮度</view>
			<view class="slide-box">
				<uv-slider v-model="brightnessValue" block-size="25" :min="0" :max="100"
					@changing="handelChangeBrightness"></uv-slider>
			</view>
		</view>
		<view class="font">
			<view class="config-name">字号</view>
			<view class="change-font">
				<view class="btn" @tap="changeFontSize(0)" :style="{backgroundColor:themeStyle.configBtnBcg}">A-</view>
				<view>{{fontSize}}</view>
				<view class="btn" @tap="changeFontSize(1)" :style="{backgroundColor:themeStyle.configBtnBcg}">A+</view>
			</view>
		</view>
		<view class="background">
			<view class="config-name">背景</view>
			<view class="themes-list">
				<view @tap="selectTheme(item.name)" class="theme-item" v-for="(item,index) in themeList" :key="index"
					:style="{backgroundColor:item.backgroundColor,borderColor:themeStyle.backgroundColor==item.backgroundColor?themeStyle.themeActive:'transparent'}">
				</view>
			</view>
		</view>
		<view class="space">
			<view class="config-name">间距</view>
			<view class="btn-group" :style="{backgroundColor:themeStyle.configBtnBcg}">
				<view @tap="setLineHeight(item.value)"
					:style="{backgroundColor:currentLineHeight==item.value?themeStyle.backgroundColor:'transparent'}"
					class="btn" v-for="item,index in space" :key="index">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		onMounted,
		defineEmits
	} from 'vue'
	// import {
	// 	getBrightness,
	// 	setBrightness
	// } from '../utlis';
	const space = ref([{
		name: '小',
		value: 2
	}, {
		name: '较小',
		value: 2.5
	}, {
		name: '适中',
		value: 3
	}, {
		name: '大',
		value: 3.5
	}])
	const emit = defineEmits(['changeFontSize', 'changeTheme', 'setLineHeight'])
	// 亮度值
	const brightnessValue = ref(0)
	// 改变亮度值
	const handelChangeBrightness = (e) => {
		console.log(e);
	}
	// 改变字体大小
	const changeFontSize = (action) => {
		emit('changeFontSize', action)
	}
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		themeStyle: { // 主题
			type: Object,
			default: () => ({
				backgroundColor: '#F6F6F6',
				color: '#929292',
				contentColor: '#000'
			})
		},
		fontSize: {
			type: Number,
			default: 20
		},
		themeList: {
			type: Array,
			default: () => []
		},
		currentLineHeight: {
			type: Number,
			default: 2
		}
	})
	onMounted(async () => {
		// console.log(props.themeList);
	})
	const selectTheme = (theme) => {
		emit('changeTheme', theme)
	}
	const setLineHeight = (val) => {
		emit('setLineHeight', val)
	}
</script>

<style lang="scss" scoped>
	.show {
		transform: translate(0, 0) !important;
	}

	.config {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 11;
		transform: translateY(100%);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding: 30rpx 60rpx;
		transition: transform 0.3s;
		display: flex;
		flex-direction: column;

		.config-name {
			font-size: 28rpx;
		}

		.brightness {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.slide-box {
				flex: 1;
			}
		}

		.font {
			display: flex;
			gap: 20rpx;
			align-items: center;

			.change-font {
				display: flex;
				align-items: center;
				gap: 20rpx;

				.btn {
					width: 150rpx;
					text-align: center;
					padding: 10rpx 30rpx;
					border-radius: 40rpx;
				}
			}

		}

		.background {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.themes-list {
				display: flex;
				gap: 30rpx;
				align-items: center;

				.theme-item {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					border-width: 4rpx;
					border-style: solid;
					transition: border-color 0.3s;
				}
			}
		}

		.space {
			display: flex;
			gap: 20rpx;
			align-items: center;

			.btn-group {
				flex: 1;
				height: 70rpx;
				border-radius: 60rpx;
				display: flex;
				padding: 3rpx;
				position: relative;

				.btn {
					flex: 1;
					border-radius: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
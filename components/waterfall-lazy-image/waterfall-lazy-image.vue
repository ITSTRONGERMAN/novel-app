<template>
	<view class="waterfalls">
		<view v-for="(columnList, columnIndex) in listData" :key="columnIndex">
			<view :style="{ width: columnWidth + 'rpx' }" class="waterfalls-column">
				<view v-for="item in columnList" :key="item._id">
					<view :style="itemStyle(item)" v-if="item[listKeyInfo.imageUrl]" @click="handleImageClick(item)"
						class="waterfalls-column-item">
						<image class="waterfalls-column-item-image load" :src="item[listKeyInfo.imageUrl]"
							mode="aspectFill">
						</image>
						<view class="waterfalls-column-item-title">
							{{ item[listKeyInfo.title] }}
						</view>
						<view v-if="selectList.includes(item[selectKey])" class="select">
							<image class="logo" src="./selected.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "waterfall-lazy-image",
		data() {
			return {
				columnMarginTop: 18,
				listData: [],
				listDataHeight: [],
			};
		},
		props: {
			selectKey: {
				type: String,
				default: '_id'
			},
			listKeyInfo: {
				type: Object,
				default: () => ({
					imageUrl: 'imageUrl',
					title: 'title'
				})
			},
			column: { //列的数量 1-4
				type: Number,
				default: 3,
			},
			list: { //列表数据，分页时候直接更新list
				type: Array,
				default: () => [],
			},
			selectList: { //选中的部分
				type: Array,
				default: () => [],
			},
		},
		created() {
			this.init();
		},
		watch: {
			list: {
				deep: false,
				handler(newValue) {
					this.$nextTick(async () => {
						if (newValue?.length) {
							for (let i = 0; i < newValue.length; i++) {
								const item = newValue[i]
								if (!item.width || !item.height) {
									const [err, imageInfo] = await uni.getImageInfo({
										src: item[this.listKeyInfo.imageUrl],
									})
									if (imageInfo) {
										item.width = imageInfo.width
										item.height = imageInfo.height
									}
								}
								this.addListItem(item)
							}
						}
					});
				},
			},
		},
		methods: {
			/**
			 * 初始化
			 */
			async init() {
				const columnWidthMap = {
					1: 714,
					2: 348,
					3: 226,
					4: 165
				}
				this.columnWidth = columnWidthMap[this.column]
				this.refreshList();
			},
			/**
			 * 更新单个瀑布流
			 */
			addListItem(item) {
				const {
					height
				} = this.getStyle(item);
				const minIndex = this.getMinColumn(this.listDataHeight);
				if (this.listData[minIndex]) {
					this.listData[minIndex].push(item);
					this.listDataHeight[minIndex] = this.listDataHeight[minIndex] + height + uni.upx2px(this
						.columnMarginTop);
				}
			},
			/**
			 * 刷新瀑布流
			 */
			refreshList() {
				let listData = [],
					listDataHeight = [];
				for (let i = 0; i < this.column; i++) listData.push([]);
				for (let i = 0; i < this.column; i++) listDataHeight.push(0);
				this.listData = listData;
				this.listDataHeight = listDataHeight;
			},
			/**
			 * 每项样式
			 */
			itemStyle(item) {
				const {
					width,
					height
				} = this.getStyle(item);
				return {
					width: width + "rpx",
					height: height + "rpx",
					marginTop: this.columnMarginTop + "rpx",
				};
			},
			/**
			 * width、height转换
			 */
			getStyle(item) {
				const width = this.columnWidth;
				return {
					width,
					height: parseInt((width * (item.height || 500)) / (item.width || 500)),
				};
			},
			/**
			 * 点击图片
			 */
			handleImageClick(item) {
				this.$emit("imageClick", item);
			},
			/**
			 * 获取高度最小一列
			 */
			getMinColumn(listDataHeight) {
				let minIndex = 0;
				let minHeight = 0;
				listDataHeight.map((columnHeight, columnIndex) => {
					if (columnIndex == 0) {
						minHeight = columnHeight;
					} else if (columnHeight < minHeight) {
						minIndex = columnIndex;
						minHeight = columnHeight;
					}
				});
				return minIndex;
			},
		},
	};
</script>

<style lang="scss">
	.load {
		animation: Load 1.5s ease;
	}

	@keyframes Load {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.waterfalls {
		padding: 18rpx;
		padding-top: 0;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		padding-bottom: 10rpx;
		align-items: flex-start;
		justify-content: space-between;

		&-column {
			&-item {
				display: flex;
				flex-direction: column;
				transition: opacity 1s;
				position: relative;

				&-title {
					font-size: 24rpx;
					height: 36rpx;
					line-height: 36rpx;
					background: rgb(240, 240, 240);
					border-bottom-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
					padding: 12rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				&-image {
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					width: 100%;
					height: 100%;
					opacity: 0;

					&.load {
						opacity: 1;
					}
				}

				.select {
					position: absolute;
					left: 0;
					bottom: 0;
					top: 0;
					right: 0;
					z-index: 99;
					border-radius: 10rpx;
					background: rgba(0, 0, 0, 0.3);
					display: flex;
					justify-content: center;
					align-items: center;

					.logo {
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
	}
</style>
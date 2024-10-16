<template>
	<view class="prducts">
		<view class="product_l">
			<view class="product_ll">
				<view class="oneL" v-for="(item,index) in imgListL" :key="item.id" @click="fastPay(item.id)"
					:class="index>0?'top20':''">
					<image class="imgTop" mode="widthFix" :src="item.picture"></image>
					<view class="titleCenter">{{item.name}}</view>
					<view class="finSale">已售{{item.sale}}件</view>
					<view class="bomPrice">
						<text class="c49427">￥{{item.promotionPrice}}</text>
						<text class="shchu">￥{{item.price}}</text>
					</view>
					<view class="gonTitle">
						{{item.companyName}}
					</view>
				</view>
			</view>
		</view>
		<view class="product_R">
			<view class="product_RR">
				<view class="oneR" v-for="(item,index) in imgListR" :key="item.id" @click="fastPay(item.id)"
					:class="index>0?'top20':''">
					<image class="imgTop" mode="widthFix" :src="item.picture"></image>
					<view class="titleCenter">{{item.name}}</view>
					<view class="finSale">已售{{item.sale}}件</view>
					<view class="bomPrice">
						<text class="c49427">￥{{item.promotionPrice}}</text>
					</view>
					<view class="gonTitle">
						{{item.companyName}}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "waterfallFlow",
		props: {
			imgList: {
				typeof: Array,
				default: []
			}
		},
		data() {
			return {
				listBig: [],
				imgListL: [],
				imgListR: [],
				rightHeight: 0,
				leftHeight: 0,
			};
		},
		watch: {
			imgList() {
				if (this.imgList.length > 0) {
					let listBig = [...this.imgList]
					listBig.splice(0, (this.imgListL.length + this.imgListR.length))
					this.listBig = [...listBig]
				} else {
					this.listBig = [...this.imgList]
					this.imgListL = [];
					this.imgListR = [];
				}
				if (this.listBig.length > 0) {
					this.setList()
				}
			}
		},
		onLoad() {

		},
		onReady() {
			this.listBig = [...this.imgList]
			this.imgListL = [];
			this.imgListR = [];
			if (this.listBig.length > 0) {
				this.setList()
				console.log(222)
			}

		},
		methods: {
			setList() {
				let that = this
				let item = that.listBig[0] //取第一个数据
				const query1 = uni.createSelectorQuery().in(that)
				const query2 = uni.createSelectorQuery().in(that)
				query1.select('.product_ll').boundingClientRect(res2 => {
					that.leftHeight = res2.height ? res2.height : 0
					query2.select('.product_RR').boundingClientRect(res => {
						that.rightHeight = res.height ? res.height : 0
						if (that.rightHeight >= that.leftHeight) { //右边高则忘左边加数据
							that.imgListL.push(item);
						} else {
							that.imgListR.push(item);
						}
						// 移除临时列表的第一项
						that.listBig.splice(0, 1);
						// 如果临时数组还有数据，继续循环
						if (that.listBig.length > 0) {
							setTimeout(() => {
								that.leftHeight = 0
								that.rightHeight = 0
								that.setList();
							}, 80)
						}
					}).exec();
				}).exec();

			},
			fastPay(id) {
				this.$emit('fastpayId', id)
			}
		}
	}
</script>

<style lang="scss">
	.prducts {
		width: 100%;
		// margin-top: 30rpx;
		display: flex;
		justify-content: space-between;

		.product_l {
			width: 50%;
			margin-right: 15rpx;

			.product_ll {
				width: 100%;

				.top20 {
					margin-top: 20rpx;
				}

				.oneL {
					width: 100%;
					// padding: 20rpx;
					background-color: #ffffff;
					border-radius: 10rpx;
					overflow: hidden;

					.imgTop {
						width: 100%;
						border-radius: 10rpx 10rpx 0 0;
						// width: 290rpx;
						// height: 290rpx;
					}

					.titleCenter {
						padding: 0 15rpx;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
						-webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
						-webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
						font-size: 26rpx;
						color: #333333;
					}

					.finSale {
						padding: 0 15rpx;
						font-size: 24rpx;
						color: #666666;
						display: flex;
						align-items: center;
						justify-content: flex-end;
					}

					.bomPrice {
						padding: 0 15rpx;
						color: #000000;
						font-size: 34rpx;

						.c49427 {
							color: #c49427;
						}

						.shchu {
							font-size: 24rpx;
							color: #939393;
							text-decoration: line-through;
						}
					}

					.gonTitle {
						padding: 15rpx 15rpx 20rpx;
						font-size: 26rpx;
						color: #939393;
					}
				}
			}
		}

		.product_R {
			width: 50%;
			margin-left: 15rpx;

			.product_RR {
				width: 100%;

				.top20 {
					margin-top: 20rpx;
				}

				.oneR {
					width: 100%;
					// padding: 20rpx;
					background-color: #ffffff;
					border-radius: 10rpx;
					overflow: hidden;

					.imgTop {
						border-radius: 10rpx 10rpx 0 0;
						width: 100%;
						// width: 290rpx;
						// height: 290rpx;
					}

					.titleCenter {
						// width: 280rpx;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
						-webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
						-webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
						font-size: 26rpx;
						color: #333333;
						padding: 0 15rpx;
					}

					.finSale {
						font-size: 24rpx;
						color: #666666;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						padding: 0 15rpx;
					}

					.bomPrice {
						padding: 0 15rpx;
						// margin-top: 30rpx;
						color: #000000;
						font-size: 34rpx;

						.c49427 {
							color: #c49427;
						}

						.shchu {
							font-size: 24rpx;
							color: #939393;
							text-decoration: line-through;
						}
					}

					.gonTitle {
						padding: 15rpx 15rpx 20rpx;
						font-size: 26rpx;
						color: #939393;
					}
				}
			}

		}

	}
</style>
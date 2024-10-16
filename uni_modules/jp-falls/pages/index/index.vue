<template>
    <view>
       <jp-falls class="falls" :routesList="columns">
		   <template #left={left}>
			   <view v-for="item in left">
				   <view class="left item" >
					   <image mode="widthFix" :src="item.url"></image>
					  <view class="label">{{item.label}}</view>
					  <view class="price"><view>￥{{item.price}}</view><view class="yprice" >￥{{item.yprice}}</view></view>
					  <view  class="shop">{{item.shop}}</view>
				   </view>
			   </view>
		   </template>
		   <template #right={right}>
			   <view v-for="item in right">
			   		<view class="right item">
						<image mode="widthFix" :src="item.url"></image>
			   			<view class="label">{{item.label}}</view>
						<view class="price"><view>￥{{item.price}}</view><view class="yprice" >￥{{item.yprice}}</view></view>
						<view  class="shop">{{item.shop}}</view>
			   		</view>
			   </view>
		   </template>
	   </jp-falls>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				columns: [
				    {
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
						price:'188.00',
						yprice:'188.00',
						shop:'@缪段旗舰店',
						url:'https://img.alicdn.com/imgextra/i4/233440143/O1CN01fqgtkE1CvXNSF9B4H_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
					{
					    label: '精品名牌手表',
						price:'188.00',
						yprice:'188.00',
						shop:'@缪段旗舰店',
						url:'https://img1.baidu.com/it/u=917013846,2857055468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
					    value: 1,
					},
				    {
				        label: '艷冰丝阔腿裤女夏季薄款高2023夏季新款休闲裤女速干透',
				        price:'188.00',
				        yprice:'188.00',
				        shop:'@潮衫定制大码女装',
				        url:'https://img.alicdn.com/imgextra/i4/55657456/O1CN01RWpfMv24wttQyW4Vq_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '泡面批发，都吃泡面了，你还在乎健康？',
				        price:'49.00',
				        yprice:'69.00',
				        shop:'@日GPGW服饰旗舰店',
				        url:'https://img2.baidu.com/it/u=3791970328,99712995&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686243600&t=93330bed1736b70e078d99586cf96787',
				        value: 1,
				    },{
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
				        price:'49.00',
				        yprice:'69.00',
				        shop:'@日GPGW服饰旗舰店',
				        url:'https://img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/2215502014115/O1CN01i3HAqq1gGieIajBIV_!!2215502014115-0-alimamacc.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '腰大码胖mm宽松显瘦梨形身气薄款运动长裤情侣宽松束脚..',
				        price:'88.00',
				        yprice:'399.00',
				        shop:'@thea旗舰店',
				        url:'https://img.alicdn.com/imgextra/i3/166530185/O1CN01oH2frt1DEm7L9WPUq_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '装裤子夏季薄款春秋垂感九分裤夏季新款裤子高腰直简女裤..',
				        price:'239.00',
				        yprice:'239.00',
				        shop:'@日雅思诚女裤',
				        url:'https://img.alicdn.com/imgextra/i3/13565098/O1CN01SCGuLK1nWvzOFlQIm_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
				        price:'188.00',
				        yprice:'188.00',
				        shop:'@缪段旗舰店',
				        url:'https://img.alicdn.com/imgextra/i1/25258758/O1CN01Rj230g2EZDZKuIZdf_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
				    	price:'188.00',
				    	yprice:'188.00',
				    	shop:'@缪段旗舰店',
				    	url:'https://img.alicdn.com/imgextra/i4/233440143/O1CN01fqgtkE1CvXNSF9B4H_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '艷冰丝阔腿裤女夏季薄款高2023夏季新款休闲裤女速干透',
				        price:'188.00',
				        yprice:'188.00',
				        shop:'@潮衫定制大码女装',
				        url:'https://img.alicdn.com/imgextra/i4/55657456/O1CN01RWpfMv24wttQyW4Vq_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
				        price:'49.00',
				        yprice:'69.00',
				        shop:'@日GPGW服饰旗舰店',
				        url:'https://img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i3/2215502014115/O1CN01i3HAqq1gGieIajBIV_!!2215502014115-0-alimamacc.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '腰大码胖mm宽松显瘦梨形身气薄款运动长裤情侣宽松束脚..',
				        price:'88.00',
				        yprice:'399.00',
				        shop:'@thea旗舰店',
				        url:'https://img.alicdn.com/imgextra/i3/166530185/O1CN01oH2frt1DEm7L9WPUq_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '装裤子夏季薄款春秋垂感九分裤夏季新款裤子高腰直简女裤..',
				        price:'239.00',
				        yprice:'239.00',
				        shop:'@日雅思诚女裤',
				        url:'https://img.alicdn.com/imgextra/i3/13565098/O1CN01SCGuLK1nWvzOFlQIm_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				    {
				        label: '竹纤维浅灰男女职业装衬衫浼烫长短袖套装夏季工作服定制',
				        price:'188.00',
				        yprice:'188.00',
				        shop:'@缪段旗舰店',
				        url:'https://img.alicdn.com/imgextra/i1/25258758/O1CN01Rj230g2EZDZKuIZdf_!!0-saturn_solar.jpg_468x468q75.jpg_.webp',
				        value: 1,
				    },
				]
			}
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
	page{
		// background-color: #f5f5f5;
	}
	.falls{
		padding: 0 20rpx;
		.left{
			margin-right: 10rpx;
		}
		.right{
			margin-left: 10rpx;
		}
		.item{
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.1);
			overflow: hidden;
			.label{
				overflow:hidden; //超出的文本隐藏
				text-overflow:ellipsis; //溢出用省略号显示
				display:-webkit-box; //将对象作为弹性伸缩盒子模型显示。
				-webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-line-clamp: 2 ; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
				color: #666;
				padding: 0 12rpx;
			}
			.price{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #f00;
				font-weight: 700;
				padding: 0 12rpx;
				.yprice{
					color: #999;
					font-weight: 500;
					text-decoration: line-through;
					margin: 15rpx;
				}
			}
			.shop{
				color: #999;
				padding: 0 12rpx 12rpx 12rpx;
			}
			image{
				width: 100%;
			}
			img{
				width: 100%;
			}
		}
	}
</style>
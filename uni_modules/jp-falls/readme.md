 # 欢迎使用 超轻瀑布流组件
**超轻瀑布流组件，触底加载和下拉刷新具体使用方案可参照https://ext.dcloud.net.cn/plugin?id=12969组件实例**

### 安装方式
本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。


##有项目需要开发的请联系 QQ:371524845
###开发不易，如果帮助到你的，请支持 有问题请留言，作者会积极更新

###项目实例请查看 @/jp-layout/pages/index/index.vue

#使用方法
##signature基础用法
```html
<template>
    <view>
       <jpFalls class="falls" :routesList="columns">
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
	   </jpFalls>

    </view>
</template>

<script>
	import jpFalls from '@/components/jp-falls/index.vue'
    export default {
		components:{jpFalls},
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
					}
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
```




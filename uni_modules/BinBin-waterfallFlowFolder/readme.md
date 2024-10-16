# BinBin-waterfallFlowFolder


1.一个闲着无聊的前端开发人员小彬，给大家分享点实用干货。有兴趣欢迎点赞收藏。

2.有疑问联系QQ173-2755-058哦。

3.插件如果有帮助到你的，请给me一个小小的收藏，谢谢大家支持。

4.遇到bug欢迎大家在下面留言或私信我，我会积极更新优化出更好的产品给大家。

5.项目实例请查看 @components/BinBin-waterfallFlowFolder/flowIndex.vue

**以下是插件使用方法：**

```
<template>
	<view class="container">
		<waterfallFlowVue :imgList="colums" @fastpayId="fastpayId"></waterfallFlowVue>
	</view>
</template>
<script>
	import waterfallFlowVue from '@/components/BinBin-waterfallFlowFolder/BinBin-waterfallFlowFolder.vue'
	export default {
		components: {
			waterfallFlowVue
		},
		data() {
			return {
				colums: [{
						id: 1,
						picture: 'https://img2.baidu.com/it/u=1226876983,4055472391&fm=253&app=138&f=JPEG?w=800&h=1067',
						name: '李宁1',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 2,
						picture: 'https://img1.baidu.com/it/u=1571288117,3717156997&fm=253&app=138&f=JPEG?w=500&h=707',
						name: '李宁2',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 3,
						picture: 'https://t14.baidu.com/it/u=207829538,394884992&fm=224&app=112&f=JPEG?w=500&h=500',
						name: '李宁3',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 4,
						picture: 'https://img2.baidu.com/it/u=866739636,2433403903&fm=253&app=138&f=JPEG?w=500&h=707',
						name: '李宁4',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 5,
						picture: 'https://t13.baidu.com/it/u=3232122932,1277494141&fm=224&app=112&f=JPEG?w=375&h=500',
						name: '李宁5',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 6,
						picture: 'https://t14.baidu.com/it/u=106128379,1359791379&fm=224&app=112&f=JPEG?w=500&h=500',
						name: '李宁6',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 7,
						picture: 'https://cos2.solepic.com/20191014/b_1647050201910141116069461.jpg',
						name: '李宁7',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 8,
						picture: 'https://img2.baidu.com/it/u=430344235,4171760739&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '李宁8',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 9,
						picture: 'https://pic.quanjing.com/87/7c/QJ8121463169.jpg@!350h',
						name: '李宁9',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 10,
						picture: 'https://img2.baidu.com/it/u=1207371359,909867081&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
						name: '李宁10',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 11,
						picture: 'https://t13.baidu.com/it/u=926794518,3634761433&fm=224&app=112&f=JPEG?w=500&h=500',
						name: '李宁11',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 12,
						picture: 'https://img6.hznzcn.com/goods/crawler/20220405/20220405124000637633360.jpg',
						name: '定制t恤印字logo照片短袖同学聚会班服工作衣服定做广告文化衫di',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
				]
			}
		},
		methods: {
		fastpayId(id) {
		console.log(id, );
		}
	}
}
```


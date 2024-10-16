<template>
	<view class="container">
		<waterfallFlowVue :imgList="colums" @fastpayId="fastpayId"></waterfallFlowVue>
	</view>
</template>
<script>
	import waterfallFlowVue from './BinBin-waterfallFlowFolder.vue'
	export default {
		components: {
			waterfallFlowVue
		},
		data() {
			return {
				colums: [{
						id: 1,
						picture: 'https://img2.baidu.com/it/u=1226876983,4055472391&fm=253&app=138&f=JPEG?w=800&h=1067',
						name: '李宁',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 2,
						picture: 'https: //img0.baidu.com/it/u=1750412923,931276846&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
						name: '李宁',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					},
					{
						id: 3,
						picture: 'https://t14.baidu.com/it/u=207829538,394884992&fm=224&app=112&f=JPEG?w=500&h=500',
						name: '李宁',
						sale: '500',
						saleType: 1,
						promotionPrice: '433',
						price: '566',
						companyName: '好再来官方旗舰店'
					}

				]
			}
		},
		onLoad() {
			// #ifdef H5||VUE2
			// 1. 方式一
			/* this.$nextTick(()=>{
				this.colums=[...this.colums]
			}) */
			// 2.方式二
			/* setTimeout(()=>{
				this.colums=[...this.colums]
			},20) */
			// #endif
		},
		methods: {
			fastpayId(id) {
				console.log(id, '父组件接收参数');
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
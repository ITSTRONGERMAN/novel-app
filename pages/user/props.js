export const configItemList = [{
		icon: 'history',
		name: '浏览历史',
		iconPrefix: 'custom-icon',
		size: '60rpx',
		onTap() {
			uni.navigateTo({
				url: "/pages/history/history"
			})
		}
	},
	{
		icon: 'share',
		name: '分享应用',
		iconPrefix: '',
		size: '52rpx',
		onTap() {
			uni.shareWithSystem({
				summary: '番猫小说\n' +
					'免费开源好用得阅读APP\n' +
					'热门小说、漫画免费看\n' +
					'官网地址：https://www.douyin.com/?recommend=1\n' +
					'github地址：https://github.com/ITSTRONGERMAN/novel-app',
			})
		}
	},
	{
		icon: 'download',
		name: '我的下载',
		iconPrefix: '',
		size: '60rpx',
		onTap() {
			uni.navigateTo({
				url: "/pages/download/download"
			})
		}
	},
	{
		icon: 'bug',
		name: 'bug报错',
		iconPrefix: 'custom-icon',
		size: '52rpx',
		onTap() {
			console.log("bug报错");
		}
	},
	{
		icon: 'dashang',
		name: '打赏作者',
		iconPrefix: 'custom-icon',
		size: '52rpx',
		onTap() {
			uni.navigateTo({
				url: "/pages/reward/reward"
			})
		}
	},
	{
		icon: 'setting',
		name: '设置',
		iconPrefix: '',
		size: '52rpx',
		onTap() {
			uni.navigateTo({
				url: "/pages/config/config"
			})
		}
	},
	{
		icon: 'info-circle',
		name: '关于番猫',
		iconPrefix: '',
		size: '52rpx',
		onTap() {
			uni.navigateTo({
				url: "/pages/aboutus/aboutus"
			})
		}
	},
]
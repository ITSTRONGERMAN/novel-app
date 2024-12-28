export const aboutList = [{
	name: '版本信息：' + uni.getSystemInfoSync().appVersion,
	onTap() {
		uni.showToast({
			icon: "none",
			title: "已经是最新版"
		})
	}
}, {
	name: "github地址",
	onTap() {
		plus.runtime.openURL(encodeURI("https://github.com/ITSTRONGERMAN/novel-app"));
	}
}, {
	name: "免责声明",
	onTap() {
		uni.navigateTo({
			url: "/pages/aboutus/childpage/disclaimer/disclaimer"
		})
	}
}]
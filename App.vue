<script setup>
	import {
		onUnload,
		onLaunch,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from "vuex"
	import EventBus from "@/utiles/eventBus.js"
	import themeStyle from "@/theme/index.js"
	const store = useStore()
	// #ifdef APP-PLUS
	import {
		closeDatabase,
	} from './api';
	import setBottomNavigationBarColor from './utiles/setBottomNavigationBarColor.js';
	import {
		Worker
	} from '@/uni_modules/xianxu-worker/js_sdk/index.js'
	// #endif
	onLaunch(async () => { // APP启动时hook
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); // 锁定竖屏
		setBottomNavigationBarColor("#FFFFFF")
		// 设置下载线程
		const worker = await Worker('_www/static/script/downloadWorker.js')
		store.commit("setDownloadWorker", worker)
		// #endif
	})
	onLoad(() => {
		console.log(213123);
		console.log(store.state.theme);
	})
	onUnload(() => { // APP关闭时
		// #ifdef APP-PLUS
		// APP退出时关闭数据库连接
		closeDatabase()
		// #endif
	})
</script>

<style>
	/*每个页面公共css */
	@import url('./static/style/common.scss');
	/* 字体图标 */
	@import "@/static/style/iconfont.css";
</style>
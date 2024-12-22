<script setup>
	import {
		onUnload,
		onLaunch,
	} from '@dcloudio/uni-app'
	// #ifdef APP-PLUS
	import {
		closeDatabase,
	} from './api';
	// #endif
	onLaunch(() => {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary'); // 锁定竖屏
		// #endif
	})
	onUnload(() => {
		// #ifdef APP-PLUS
		// APP退出时关闭数据库连接
		closeDatabase()
		// #endif
	})
</script>

<style>
	/*每个页面公共css */
	@import url('./static/common.scss');
	@import "@/static/iconfont.css";
</style>
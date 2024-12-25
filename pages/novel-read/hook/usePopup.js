import {
	ref
} from 'vue'
const usePopup = () => {
	// 目录显示
	const catalogShow = ref(false)
	// 菜单是否展示
	const menuShow = ref(false)
	// 遮罩
	const maskShow = ref(false)
	// 设置菜单是否显示
	const configShow = ref(false)
	// 打开菜单
	const handelShowMenu = async () => {
		maskShow.value = true
		menuShow.value = true
	}
	// 关闭菜单
	const closeMenu = () => {
		catalogShow.value = false
		menuShow.value = false
		maskShow.value = false
		configShow.value = false
	}
	// 打开配置菜单
	const openConfigMenu = () => {
		menuShow.value = false
		setTimeout(() => {
			configShow.value = true
		}, 300)
	}
	return {
		catalogShow,
		menuShow,
		maskShow,
		handelShowMenu,
		closeMenu,
		configShow,
		openConfigMenu
	}
}
export default usePopup
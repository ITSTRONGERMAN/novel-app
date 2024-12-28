import {
	ref
} from 'vue'
import {
	useStore
} from 'vuex'
import getSystemInfo from '../../../utiles/getSystemInfo'
const useThemeAction = () => {
	const store = useStore()
	const themeActionSheet = ref(null)
	const themeActions = [{
			name: '跟随系统',
			value: "auto"
		}, {
			name: '日间',
			value: "light"
		},
		{
			name: '夜间',
			value: "dark"
		}
	]
	const onSelect = async (e) => {
		if (e.value === 'auto') {
			const sysInfo = await getSystemInfo()
			store.commit("setAppTheme", sysInfo.osTheme)
		} else store.commit("setAppTheme", e.value)
	}
	return {
		themeActionSheet,
		themeActions,
		onSelect
	}
}
export default useThemeAction
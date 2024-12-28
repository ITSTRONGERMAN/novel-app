import themeStyle from "@/theme/index.js"
import {
	useStore,
} from 'vuex'
import {
	computed,
} from 'vue'


const useTheme = () => {
	const store = useStore()
	const currentTheme = computed(() => themeStyle[store.state.theme])
	const theme = computed(() => store.state.theme)
	return {
		currentTheme,
		theme
	}
}
export default useTheme
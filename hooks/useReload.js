import {
	reactive
} from 'vue'
const useReload = () => {
	const loadErrorParam = reactive({
		fun: null,
		param: null
	})
	const reload = () => {
		loadErrorParam.fun(loadErrorParam.param)
	}
	return {
		loadErrorParam,
		reload
	}
}
export default useReload
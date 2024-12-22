import {
	ref,
	reactive,
	computed
} from 'vue'
const useSlide = () => {
	// 当前激活的tabBar
	const currentActiveTabbar = ref(0)
	const tabBarList = computed(() => pageList.value.map(item => item.alias))
	const pageList = ref([{
		name: "novel",
		alias: "小说",
		hasShown: true
	}, {
		name: "comic",
		alias: "漫画",
		hasShown: false
	}])
	const currentPage = computed(() => pageList.value[currentActiveTabbar.value])
	// 页面切换
	const pageChange = (e) => {
		if (e == 'l') {
			currentActiveTabbar.value--;
		} else if (e == 'r') {
			currentActiveTabbar.value++;
		}
	}
	// 根据顶部top栏改变页面
	const handelTopChange = (e) => {
		currentActiveTabbar.value = e.index
	}
	return {
		currentActiveTabbar,
		pageChange,
		handelTopChange,
		tabBarList,
		pageList,
		currentPage
	}
}
export default useSlide
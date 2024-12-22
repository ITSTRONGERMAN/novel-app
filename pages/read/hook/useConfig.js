import {
	ref,
	computed,
	reactive,
	watch
} from 'vue'
const useConfig = () => {
	const config = reactive({
		novel_id: -1, // 当前小说id
		fontSize: uni.getStorageSync("read_fontSize") || 20, // 字体大小
		currentTheme: uni.getStorageSync("read_theme") || 'bright', // 当前主题
		lineHeight: uni.getStorageSync('read_lineHeight') || 2, // 行高
		isAddBookShelf: false //是否已加入书架
	})
	// 主题样式
	const themeStyle = reactive({
		bright: {
			backgroundColor: '#F6F6F6',
			color: '#929292',
			contentColor: '#000',
			configBtnBcg: '#EEEEEE',
			themeActive: '#000'
		},
		lightBrown: {
			backgroundColor: '#E8E3CF',
			color: '#929292',
			contentColor: '#000',
			configBtnBcg: '#D9D7C2',
			themeActive: '#000'
		},
		lightGreen: {
			backgroundColor: '#E4F0D8',
			color: '#929292',
			contentColor: '#000',
			configBtnBcg: '#DCE8D0',
			themeActive: '#000'
		},
		lightBlue: {
			backgroundColor: '#DAE4EE',
			color: '#929292',
			contentColor: '#000',
			configBtnBcg: '#D3DDE7',
			themeActive: '#000'
		},
		dark: {
			backgroundColor: '#0E0E0E',
			color: '#B8B8B8',
			contentColor: '#B6B6B6',
			configBtnBcg: '#202020',
			themeActive: '#888888'
		},
	})
	// 当前主题
	const theme = computed(() => themeStyle[config.currentTheme])
	const themeNames = computed(() => {
		const names = Object.keys(themeStyle)
		const result = names.map(item => ({
			name: item,
			backgroundColor: themeStyle[item].backgroundColor
		}))
		return result
	})
	// 改变字体大小
	const changeFontSize = (action) => {
		if (action == 1) {
			config.fontSize = config.fontSize + 2 >= 30 ? 30 : config.fontSize + 2
		} else if (action == 0) {
			config.fontSize = config.fontSize - 2 <= 12 ? 12 : config.fontSize - 2
		}
		uni.setStorageSync("read_fontSize", config.fontSize)
	}
	// 设置行高
	const setLineHeight = (val) => {
		config.lineHeight = val
		uni.setStorageSync("read_lineHeight", config.lineHeight)
	}
	// 切换主题
	const changeTheme = (theme) => {
		config.currentTheme = theme
		uni.setStorageSync("read_theme", config.currentTheme)
	}
	return {
		config,
		theme,
		changeFontSize,
		themeNames,
		setLineHeight,
		changeTheme
	}
}
export default useConfig
import {
	getScreenBrightness,
	setScreenBrightness
} from '@/uni_modules/lime-screen-utils';
// 深拷贝
export const deepCopy = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}
// 延迟函数
export const delay = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}
// 获取屏幕亮度
export const getBrightness = () => {
	return new Promise((resolve, reject) => {
		getScreenBrightness({
			success(val) {
				resolve(val)
			},
			fail() {
				reject()
			}
		})
	})
}
// 设置目录亮度
export const setBrightness = (value) => {
	return new Promise((resolve, reject) => {
		setScreenBrightness({
			value,
			success() {
				resolve()
			},
			fail(err) {
				console.log("设置亮度出错了");
				reject()
			}
		})
	})
}
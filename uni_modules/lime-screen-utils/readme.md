# lime-screen-utils 屏幕亮度
- lime-screen-utils 系参考小程序 屏幕亮度API 实现的UTS API插件，目前只实现安卓端

## 安装
在插件市场导入即可


## 使用

### 获取屏幕亮度

```js
import {
	getScreenBrightness,
	GetScreenBrightnessOption
} from '@/uni_modules/lime-screen-utils';


getScreenBrightness({
	success(res) {
		console.log(res.value)
	}
} as GetScreenBrightnessOption)

```


### 设置屏幕亮度

```js
import {
	setScreenBrightness,
	SetScreenBrightnessOption,
} from '@/uni_modules/lime-screen-utils';


setScreenBrightness({
	value: 0.5,
	success:(res) => {
		console.log('res', res)
	}
} as SetScreenBrightnessOption)

```


### 保持常亮状态

```js
import {
	setKeepScreenOn,
	SetKeepScreenOnOption
} from '@/uni_modules/lime-screen-utils';


setKeepScreenOn({
	// true 是常亮 false 是取消
	keepScreenOn: true,
	success(res){
		console.log('setKeepScreenOn', res)
	},
	fail(err) {
		console.log('err', err)
	}
} as SetKeepScreenOnOption)

```


## API
由于是参考小程序的API，故可以参考uniapp[brightness](https://uniapp.dcloud.net.cn/api/system/brightness.html)文档


## 打赏

如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)
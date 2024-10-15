# nx-turn
#使用须知

* 1、这是一个翻页组件，适用于小说翻页功能
* 2、这个插件支持APP-VUE、H5、微信小程序

#props属性
| 属性名称 | 类型 | 默认值 | 可选值 | 说明 |
| :----- | :----: | :----: | :----: | :---- |
| initPage | Number | 0 | - | 初始页码，从0开始 |
| pageCount | Number | -1 | - | 总页数。-1时无限向下翻页 |
| customClass | String | nx-turn-theme | - | 自定义class |
| customStyle | Object | - | - | 自定义style |

#event事件
| 事件名称 | 参数 | 说明 |
| :----- | :----: | :---- |
| init-completed | pageWrapperInfo: 书页节点信息 | 组件初始化完成事件 |
| turning | ---- | 书页正在翻动事件 |
| turned | info = { pageNumber, isFirst, isLast }，pageNumber: 当前页（从0开始），isFirst: 是否是第一页，isLast: 是否是最后一页 | 书页翻动完成事件 |
| click-center | ---- | 点击书页中部事件 |

#slot插槽
| 插槽名称 | 参数 | 说明 |
| :----- | :----: | :---- |
| page-content | page: 当前页页码（从0开始） | 当前页/翻动页插槽，传入自定义页面内容 |
| next-page-content | page: 下一页页码（从1开始） | 下一页插槽，传入自定义页面内容，一般和当前页一致 |

#快速开始
```html
<view class="content">
	<nx-turn>
		<template v-slot:page-content="{ page }">
			<text>{{ page }}</text>
		</template>
		<template v-slot:next-page-content="{ page }">
			<text>{{ page }}</text>
		</template>
	</nx-turn>
</view>
```
```css
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
}
```

#完整示例
```html
<view class="content">
	<nx-turn
		:initPage="page"
		:pageCount="pageContent.length"
		custom-class="theme-blue"
		@init-completed="initCompleted"
		@turning="handleTurning"
		@turned="handleTurned"
		@click-center="handleClickCenter"
	>
		<template v-slot:page-content="{ page }">
			<view class="page-content">
				<text>{{ pageContent[page] }}</text>
			</view>
		</template>
		<template v-slot:next-page-content="{ page }">
			<view class="page-content">
				<text>{{ pageContent[page] }}</text>
			</view>
		</template>
	</nx-turn>
</view>
```
```javascript
export default {
	data() {
		return {
			// 当前页码
			page: 0,
			// 分页数据
			pageContent: [
				"使用须知\n1. 这是一个翻页组件，适用于小说翻页功能\n2. 这个插件支持APP-VUE、H5、微信小程序", 
				"1.0.0（2024-07-10）\n第一次发布\n仿真翻页，支持翻起书角"
			],
		};
	},
	methods: {
		initCompleted(pageWrapperInfo) {
			console.log('页面节点信息：', pageWrapperInfo);
		},
		handleTurning() {
			uni.showToast({
				title: '翻页中',
				duration: 100,
				icon: 'none'
			});
		},
		handleTurned(info) {
			console.log('当前页面信息：', info);
			if (info.isFirst) {
				uni.showToast({
					title: '已经是第一页了',
					icon: 'none'
				});
			}
			if (info.isLast) {
				uni.showToast({
					title: '已经是最后一页了',
					icon: 'none'
				});
			}
		},
		handleClickCenter() {
			uni.showModal({
				title: '提示',
				content: '点击中部',
			});
		}
	}
}
```
```css
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
}
/* #ifdef VUE3 */
::v-deep
/* #endif */
/* #ifdef VUE2 */
/deep/
/* #endif */
.theme-blue {
	background-color: #DCE2F1;
	color: mix(#000000, #DCE2F1, 50%);
	border-color: mix(#FFFFFF, #DCE2F1, 70%);
}
.page-content {
	padding: 15px;
	font-size: 16px;
	line-height: 1.5;
}
```
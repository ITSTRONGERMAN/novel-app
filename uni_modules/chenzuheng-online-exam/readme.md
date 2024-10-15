### 创作不易，请给五星评论
### 有疑问或定制 请im我
### 使用说明
# ！！！注意：本插件要搭配uni-popup使用
### 使用教程
### 1、将下载插件中的uni-popup移至导入项目的uni_modules下，如果uni_modules已经有uni-popup，可忽略。
### 2、下载到指定项目后，打开pages.json页面，加入以下代码：
```
		{
			"path": "uni_modules/chenzuheng-online-exam/pages/exam",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		}
```

### 组件说明1：题目
### exam-item

## Props


|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|examItem|当前题目|`Object`|`false`|{}|
|total|题目总数|`Number`|`false`|0|
|current|当前题目序号|`Number`|`false`|0|
|currentType|当前题型|`String`|`false`|-|
|oneAnswer|当前题目回答数据|`Object`|`false`|{}|




## Events


|Event Name|Description|Parameters|
|---|---|---|
|answ|点击选项时触发|{id:题目id,key:题目序号,value:答题选项}|

### 组件说明2：答题卡
### popup-answ-card

## Props


|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|topic|所有的题目数据（包括某类题目的封面数据）|`Array`|`false`|[]|
|paperAnsw|所有题目的回答数据|`Array`|`false`|[]|
|questionList|所有的题目（只包含题目数据）|`Array`|`false`|[]|




## Events


|Event Name|Description|Parameters|
|---|---|---|
|intoQues|点击答题卡题目序号时触发|题目序号|


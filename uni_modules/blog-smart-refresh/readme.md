# blog-smart-refresh

### 组件属性

> 组件：blog-smart-refresh

| 参数                   | 说明     | 类型                         | 默认值  | 是否必填 | 其他  |
|----------------------|--------|----------------------------|------|------|-----|
| downRefreshHeight    | 下拉刷新高度 | Number                     | 70   | 否    |     |
| maxDownRefreshHeight | 最大下拉高度 | Number                     | 300  | 否    |     |
| dampingConstant      | 阻碍系数   | Number                     | 5    | 否    |     |
| delayTime            | 延迟时间   | Number                     | 1200 | 否    |     |
| loadingTime          | 刷新时间   | YYYY-MM-DD HH:mm:ss        |      | 否    |     |
| onRefreshListener    | 刷新监听   | (onCall:()=>Boolean)=>void |      | 否    |     |

> 使用方法

```
 <blog-smart-refresh @onRefreshListener="onRefresh">
      ...
 </blog-smart-refresh>
```

> 自定义下拉刷新头(不使用默认刷新头)

- 用法

```
 <blog-smart-refresh @onRefreshListener="onRefresh">
      <template v-slot:header>
         <CustomHeader/>
      </template>
      ...
 </blog-smart-refresh>
```

- `CustomHeader`实现

```
<template>
  <view class="custom-header">
    外部自定义头部栏 + {{ tips }}
  </view>
</template>

<script>
export default {
  data() {
    return {
      tips: "下拉刷新",
      downRefreshHeight: 70
    }
  },
  created() {
    uni.$on("onSmartRefreshPullListener", this.onPull)
  },
  methods: {
    onPull({status, y}) {
      switch (status) {
        case "start":
          this.tips = "下拉刷新";
          break;
        case "move":
          if ((y || 0) > (this.downRefreshHeight * 1.1)) {
            this.tips = "松开刷新数据";
          } else {
            this.tips = "下拉刷新";
          }
          break;
        case "refresh":
          this.tips = "正在刷新";
          break;
        case "refresh-true":
          this.tips = "刷新完成";
          break;
        case "refresh-false":
          this.tips = "刷新失败，请稍后重试";
          break;
        case "finish":
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-header {
  width: 100%;
  display: flex;
  background-color: #dd524d;
  padding: 20px;
  align-items: center;
  height: 70px;
  color: #fff;
  box-sizing: border-box;
  font-size: 14px;
  justify-content: center;
}

</style>

```

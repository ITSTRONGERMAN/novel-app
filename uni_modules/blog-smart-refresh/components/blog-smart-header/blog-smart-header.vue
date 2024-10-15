<template>
  <view class="blog-smart-header" :style="{height:`${downRefreshHeight}px`}">
    <view v-if="!isFinish" class="blog-smart-icon-main">
      <view v-if="!isRefresh" class="blog-smart-icon"
            :style="{transform:`rotateZ(${rotate}deg)`}">
        <image src="../../static/xiala.png" style="width: 23px;height: 23px;"/>
      </view>
      <view v-else class="blog-smart-icon-rotate">
        <image src="../../static/loading.png" style="width: 23px;height: 23px;"/>
      </view>
    </view>
    <view class="blog-smart-header-text">
      <text class="blog-smart-header-tips">
        {{ tips }}
      </text>
      <text style="font-size: 12px;">上次更新时间：{{ loadingTime || lastUpdateTime }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    loadingTime: {
      type: Number
    },
    downRefreshHeight: {
      type: Number,
      required: true
    },
    onPullListener: {
      type: Object
    }
  },
  data() {
    return {
      tips: "下拉刷新",
      lastUpdateTime: this.loadingTime || this.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
      isFinish: false,
      isRefresh: false,
      rotate: 0
    }
  },
  created() {
    uni.$on("onSmartRefreshPullListener", this.onPull)
  },
  methods: {
    format(date, fmt = "YYYY-MM-DD HH:mm:ss") {
      if (date == null) return null;
      if (typeof date === "string") {
        date = date.slice(0, 19).replace("T", " ").replace(/-/g, "/");
        date = new Date(date);
      } else if (typeof date === "number") {
        date = new Date(date);
      }
      let o = {
        "M+": date.getMonth() + 1,
        "[Dd]+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      if (/(Y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                  ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length)
          );
      }
      return fmt;
    },
    onPull({status, y}) {
      switch (status) {
        case "start":
          this.tips = "下拉刷新";
          this.isFinish = false;
          break;
        case "move":
          if ((y || 0) > (this.downRefreshHeight * 1.1)) {
            this.tips = "松开刷新数据";
          } else {
            this.tips = "下拉刷新";
          }
          if ((y || 0) > (this.downRefreshHeight / 2)) {
            let point = 180 / (this.downRefreshHeight / 2);
            let rotate = (((y || 0) - (this.downRefreshHeight / 2)) * point);
            if (rotate > 180) {
              rotate = 180;
            } else if (rotate < 0) {
              rotate = 0;
            }
            this.rotate = rotate;
          }
          break;
        case "refresh":
          this.tips = "正在刷新";
          this.isRefresh = true;
          break;
        case "refresh-true":
          this.tips = "刷新完成";
          this.isFinish = true;
          this.lastUpdateTime = this.format(new Date(), "YYYY-MM-DD HH:mm:ss");
          break;
        case "refresh-false":
          this.isFinish = true;
          this.tips = "刷新失败，请稍后重试";
          break;
        case "finish":
          this.isFinish = true;
          this.isRefresh = false;
          this.rotate = 0;
          break;
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/uni.scss";

.blog-smart-header {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: center;
}

.blog-smart-header-text {
  display: flex;
  align-items: center;
  color: $uni-text-color-grey;
  justify-content: center;
  gap: 3px;
  flex-direction: column;
}

.blog-smart-icon-main {
  position: absolute;
  left: 45px;
}

.blog-smart-icon {
  width: 23px;
  height: 23px;
  box-sizing: border-box;
  color: $uni-text-color-grey;
  font-size: 23px;
}

.blog-smart-icon-rotate {
  width: 23px;
  height: 23px;
  color: $uni-text-color-grey;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 23px;
  animation: rotateAnimation 800ms infinite linear;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.blog-smart-header-tips {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}


</style>

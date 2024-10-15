<template>
  <scroll-view
      scroll-y
      class="blog-smart-scroll-view-body"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @scroll="(e)=>$emit('onScroll',e)"
      @scrolltolower="(e)=>$emit('onScrollToBottom',e)"
  >
    <view class="blog-smart-scroll-view-main" :style="{transform: `translateY(${deviationY}px)`}">
      <view class="blog-smart-scroll-view-head" :style="{top:`-${downRefreshHeight}px`}">
        <slot name="header"></slot>
      </view>
      <slot></slot>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    downRefreshHeight: {
      type: Number
    },
    maxDownRefreshHeight: {
      type: Number
    },
    dampingConstant: {
      type: Number
    },
    delayTime: {
      type: Number
    }
  },
  data() {
    return {
      isTop: true,
      isStart: false,
      startX: 0,
      startY: 0,
      moveY: 0,
      deviationY: 0,
      isSideShift: false
    }
  },
  emits: ["onScroll", "onScrollToBottom"],
  methods: {
    onTouchStart(e) {
      let {x, y} = this._getPositionMap(e);
      this.isStart = true;
      this.startX = x;
      this.startY = y;
      this._onPullStart();
    },
    onTouchMove(e) {
      if (this.isSideShift) {
        return;
      }
      let {x, y} = this._getPositionMap(e);
      let moveX = x - this.startX;
      let moveY = y - this.startY;
      let virtualY = moveY;
      if (moveY < 0) {
        return;
      }
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.isSideShift = true;
        return;
      }
      let coefficient = Math.exp(-moveY / (this.downRefreshHeight) / this.dampingConstant);
      virtualY = coefficient * moveY;
      virtualY = virtualY > this.maxDownRefreshHeight ? this.maxDownRefreshHeight : virtualY
      if (this.moveY <= moveY) {
        this.moveY = moveY;
        this.deviationY = virtualY;
      } else {
        let distance = virtualY - (this.moveY - moveY);
        if (distance < 0) {
          distance = 0;
        }
        this.deviationY = distance;
      }
      this._onPullMove(this.deviationY)
    },
    onTouchEnd(e) {
      if (this.deviationY > (this.downRefreshHeight * 1.1)) {
        this.deviationY = this.downRefreshHeight;
        this._onPullRefresh();
      } else {
        this._onPullFinish();
      }
    },
    _getPositionMap(e) {
      let {touches} = e;
      let {clientX, clientY} = touches[0];
      return {x: clientX, y: clientY}
    },
    _onPullStart() {
      uni.$emit("onSmartRefreshPullListener", {status: "start"})
    },
    _onPullMove(y) {
      uni.$emit("onSmartRefreshPullListener", {status: "move", y})
    },
    _onPullRefresh() {
      uni.$emit("onSmartRefreshPullListener", {status: "refresh"})
      this.$emit("onRefreshListener", (result) => {
        uni.$emit("onSmartRefreshPullListener", {status: "refresh-" + result})
        setTimeout(() => {
          this._onPullFinish();
        }, this.delayTime)
      })
    },
    _onPullFinish() {
      this.isStart = false;
      this.isSideShift = false;
      this.startX = 0;
      this.startY = 0;
      this.moveY = 0;
      this.deviationY = 0;
      uni.$emit("onSmartRefreshPullListener", {status: "finish"})
    }
  },
}
</script>

<style>

.blog-smart-scroll-view-body {
  height: 100%;
}

.blog-smart-scroll-view-main {
  position: relative;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.19, 1.64, 0.42, 0.72);
}

.blog-smart-scroll-view-head {
  position: absolute;
  width: 100%;
}

</style>

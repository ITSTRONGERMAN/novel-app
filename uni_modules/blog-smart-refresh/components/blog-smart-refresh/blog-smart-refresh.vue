<template>
  <blog-smart-scroll-view
      :delay-time="delayTime"
      :damping-constant="dampingConstant"
      :max-down-refresh-height="maxDownRefreshHeight"
      :down-refresh-height="downRefreshHeight"
      @onRefreshListener="(onCall)=>$emit('onRefreshListener',onCall)"
  >
    <template v-slot:header>
      <slot name="header">
        <blog-smart-header
            :loading-time="loadingTime"
            :down-refresh-height="downRefreshHeight"
        />
      </slot>
    </template>
    <template>
      <view class="blog-smart-refresh-content">
        <slot></slot>
      </view>
    </template>
  </blog-smart-scroll-view>
</template>


<script>
export default {
  props: {
    downRefreshHeight: {
      type: Number,
      default: 70
    },
    maxDownRefreshHeight: {
      type: Number,
      default: 300
    },
    dampingConstant: {
      type: Number,
      default: 5
    },
    delayTime: {
      type: Number,
      default: 1200
    },
    loadingTime: {
      type: Number
    },
  },
  emits: ["onRefreshListener"]
}
</script>

<style>

.blog-smart-refresh-content {
  height: 100%;
}

</style>

"use strict";
const common_vendor = require("./common/vendor.js");
const utiles_getSystemInfo = require("./utiles/getSystemInfo.js");
const utiles_eventBus = require("./utiles/eventBus.js");
if (!Math) {
  loadingVue();
}
const loadingVue = () => "./components/common/loading/loading.js";
const _sfc_main = {
  __name: "mid-area",
  props: {
    length: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      default: 0
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ["pageChange"],
  setup(__props, { emit: __emit }) {
    const store = common_vendor.useStore();
    const screenWidth = common_vendor.ref(0);
    const fingerCoordinates = common_vendor.reactive({
      x: 0,
      y: 0
    });
    const isMove = common_vendor.ref(false);
    const moveDistance = common_vendor.ref(0);
    const offset = common_vendor.reactive({
      x: 9,
      y: 0
    });
    const pullDownOption = common_vendor.reactive({
      isLoading: false,
      top: -200
    });
    common_vendor.onMounted(async () => {
      const info = await utiles_getSystemInfo.getSystemInfo();
      screenWidth.value = info.screenWidth;
    });
    const contentStyle = common_vendor.computed(() => {
      return {
        width: screenWidth.value * props.length + "px",
        transform: isMove.value ? `translate(${moveDistance.value}px,${offset.y}px)` : `translate(${-(props.current * screenWidth.value)}px,${offset.y}px)`,
        transition: isMove.value ? "none" : "transform 0.3s"
      };
    });
    const props = __props;
    common_vendor.watch(
      () => props.current,
      // 使用 getter 函数来访问 props
      (newVal) => {
        offset.x = -(props.current * screenWidth.value);
      },
      {
        immediate: true
        // 立即执行回调
      }
    );
    const emit = __emit;
    const handelTouchStart = (e) => {
      fingerCoordinates.x = e.changedTouches[0].pageX;
      fingerCoordinates.y = e.changedTouches[0].pageY;
    };
    const handelTouchEnd = (e) => {
      isMove.value = false;
      const moveY = e.changedTouches[0].pageY - fingerCoordinates.y;
      const moveX = e.changedTouches[0].pageX - fingerCoordinates.x;
      if (Math.abs(moveX) < Math.abs(moveY)) {
        if (moveY > 200) {
          pullDownFresh();
        } else {
          finishPullDown();
        }
      } else {
        if (moveX < -100 && props.current < props.length - 1) {
          emit("pageChange", "r");
        } else if (moveX > 100 && props.current > 0) {
          emit("pageChange", "l");
        }
      }
    };
    const handelTouchMove = (e) => {
      const moveX = e.changedTouches[0].pageX - fingerCoordinates.x;
      const moveY = e.changedTouches[0].pageY - fingerCoordinates.y;
      if (Math.abs(moveX) < Math.abs(moveY)) {
        pullDown(moveY);
      } else {
        if (moveX < 0 && props.current == props.length - 1 || moveX > 0 && props.current == 0)
          return;
        isMove.value = true;
        moveDistance.value = offset.x + moveX;
      }
    };
    const pullDown = (moveY) => {
      offset.y = moveY > 100 ? 100 : moveY;
      pullDownOption.top = -200 + offset.y * 2;
    };
    const pullDownFresh = async () => {
      pullDownOption.isLoading = true;
      if (props.pageName === "home" && props.current === 0)
        await utiles_eventBus.EventBus.emit("pullDownFresh_novel_Home");
      finishPullDown();
    };
    const finishPullDown = () => {
      pullDownOption.top = -200;
      pullDownOption.isLoading = false;
      offset.y = 0;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "pulldown",
          animation: pullDownOption.isLoading
        }),
        b: pullDownOption.top + "rpx",
        c: common_vendor.s(contentStyle.value),
        d: common_vendor.o(handelTouchStart),
        e: common_vendor.o(handelTouchMove),
        f: common_vendor.o(handelTouchEnd),
        g: `${common_vendor.unref(store).state.midAreaHeight}px`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-126196ca"]]);
exports.MiniProgramPage = MiniProgramPage;

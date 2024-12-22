"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "mid-area-item",
  emits: ["scrolltolower"],
  setup(__props, { emit: __emit }) {
    const store = common_vendor.useStore();
    const emits = __emit;
    const handelMoreData = () => {
      emits("scrolltolower");
    };
    return (_ctx, _cache) => {
      return {
        a: `${common_vendor.unref(store).state.midAreaHeight}px`,
        b: common_vendor.o(handelMoreData)
      };
    };
  }
};
wx.createComponent(_sfc_main);

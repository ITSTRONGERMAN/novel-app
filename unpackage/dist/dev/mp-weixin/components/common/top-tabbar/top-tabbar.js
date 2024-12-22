"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "top-tabbar",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const tabBarList = [
      {
        name: "小说"
      },
      {
        name: "漫画"
      },
      {
        name: "壁纸"
      }
    ];
    const handelChangeTabbarItem = (e) => {
      emits("change", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabBarList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(__props.value == index ? "active" : ""),
            c: index,
            d: common_vendor.o(($event) => handelChangeTabbarItem({
              name: item.name,
              index
            }), index)
          };
        }),
        b: common_vendor.s(`transform: translate(${54 + __props.value * 150}rpx, -50%)`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-11dcda35"]]);
wx.createComponent(Component);

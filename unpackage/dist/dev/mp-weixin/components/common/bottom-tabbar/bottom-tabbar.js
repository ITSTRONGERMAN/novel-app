"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  (_easycom_uv_tabbar_item2 + _easycom_uv_tabbar2)();
}
const _easycom_uv_tabbar_item = () => "../../../uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../../uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.js";
if (!Math) {
  (_easycom_uv_tabbar_item + _easycom_uv_tabbar)();
}
const _sfc_main = {
  __name: "bottom-tabbar",
  setup(__props) {
    const value = common_vendor.ref(0);
    const list = [
      {
        name: "首页",
        icon: "home-fill"
      },
      {
        name: "分类",
        icon: "grid-fill"
      },
      {
        name: "我的",
        icon: "account"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: index,
            b: "8828bc22-1-" + i0 + ",8828bc22-0",
            c: common_vendor.p({
              iconSize: "25",
              text: item.name,
              icon: item.icon
            })
          };
        }),
        b: common_vendor.p({
          value: value.value
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);

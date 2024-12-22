"use strict";
const common_vendor = require("../../common/vendor.js");
const utiles_getSystemInfo = require("../../utiles/getSystemInfo.js");
const utiles_getSelectorInfo = require("../../utiles/getSelectorInfo.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  _easycom_uv_search2();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
if (!Math) {
  (_easycom_uv_search + topTabbarVue + novelVue + midAreaItemVue + midAreaVue + common_vendor.unref(bottomTabbarVue))();
}
const topTabbarVue = () => "../../components/common/top-tabbar/top-tabbar.js";
const bottomTabbarVue = () => "../../components/common/bottom-tabbar/bottom-tabbar.js";
const midAreaVue = () => "../../components/home/mid-area/mid-area2.js";
const novelVue = () => "../../components/home/novel.js";
const midAreaItemVue = () => "../../components/home/mid-area/mid-area-item.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const midAreaHeight = common_vendor.ref(0);
    const currentActiveTabbar = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getMidAreaHeight();
    });
    const getMidAreaHeight = async () => {
      const instance = await common_vendor.getCurrentInstance();
      const systemInfo = await utiles_getSystemInfo.getSystemInfo();
      const topInfo = await utiles_getSelectorInfo.getSelectorInfo(instance, ".home-top");
      midAreaHeight.value = systemInfo.windowHeight - topInfo.height - 50;
      store.commit("setMidAreaHeight", systemInfo.windowHeight - topInfo.height - 50);
    };
    const pageChange = (e) => {
      if (e == "l") {
        currentActiveTabbar.value--;
      } else if (e == "r") {
        currentActiveTabbar.value++;
      }
    };
    const handelTopChange = (e) => {
      currentActiveTabbar.value = e.index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          shape: "round",
          showAction: false,
          disabled: true
        }),
        b: common_vendor.o(handelTopChange),
        c: common_vendor.p({
          value: currentActiveTabbar.value
        }),
        d: common_vendor.t(common_vendor.unref(store).state.midAreaHeight),
        e: common_vendor.o(pageChange),
        f: common_vendor.p({
          length: 3,
          pageName: "home",
          current: currentActiveTabbar.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);

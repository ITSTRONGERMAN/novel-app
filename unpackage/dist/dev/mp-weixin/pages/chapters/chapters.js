"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  _easycom_uv_icon2();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  _easycom_uv_icon();
}
const _sfc_main = {
  __name: "chapters",
  setup(__props) {
    const store = common_vendor.useStore();
    const novel = common_vendor.computed(() => store.state.currentNovelChapters);
    const latestChapter = common_vendor.ref(null);
    const isReverse = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      common_vendor.index.setNavigationBarTitle({
        title: novel.value.novel_name
      });
      common_vendor.index.setNavigationBarColor({
        backgroundColor: "#fff",
        frontColor: "#000"
      });
      latestChapter.value = novel.value.chapters[novel.value.chapters.length - 1].chapter_name;
    });
    const chapters_reverse = () => {
      novel.value.chapters = novel.value.chapters.reverse();
      isReverse.value = !isReverse.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(latestChapter.value),
        b: common_vendor.p({
          name: "arrow-up-fill",
          size: "12"
        }),
        c: common_vendor.p({
          name: "arrow-down-fill",
          size: "12"
        }),
        d: common_vendor.t(isReverse.value ? "逆序" : "正序"),
        e: common_vendor.o(chapters_reverse),
        f: common_vendor.f(novel.value.chapters, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.chapter_name),
            b: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-275a8e90"]]);
wx.createPage(MiniProgramPage);

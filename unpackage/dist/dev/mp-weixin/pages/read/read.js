"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utiles_getSelectorInfo = require("../../utiles/getSelectorInfo.js");
const pages_read_hook_splitContent = require("./hook/splitContent.js");
if (!Array) {
  const _easycom_uv_loading_page2 = common_vendor.resolveComponent("uv-loading-page");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uv_loading_page2 + _easycom_uv_icon2)();
}
const _easycom_uv_loading_page = () => "../../uni_modules/uv-loading-page/components/uv-loading-page/uv-loading-page.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uv_loading_page + _easycom_uv_icon)();
}
const _sfc_main = {
  __name: "read",
  setup(__props) {
    common_vendor.onLoad(async (option) => {
      chapterInfo.novel_id = option.novel_id;
      chapterInfo.chapter_n = option.chapter_n;
    });
    common_vendor.onUnload(() => {
    });
    const isLoading = common_vendor.ref(true);
    const theme = common_vendor.reactive([{
      backgroundColor: "#F6F6F6",
      content_color: "#000",
      color: "#929292"
    }]);
    const currentTime = common_vendor.ref("");
    const batteryInfo = common_vendor.ref(null);
    const getBottomInfo = () => {
      const time = /* @__PURE__ */ new Date();
      const hour = time.getHours();
      const minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      currentTime.value = `${hour}:${minute}`;
    };
    const contentStyleInfo = common_vendor.reactive({
      fontSize: 20,
      lineHeight: 3
    });
    const contentStyle = common_vendor.computed(() => {
      return {
        fontSize: contentStyleInfo.fontSize + "px",
        lineHeight: contentStyleInfo.lineHeight,
        color: theme[0].content_color
      };
    });
    const chapterInfo = common_vendor.reactive({
      novel_id: 0,
      chapter_n: 1,
      lineNum: 0,
      page_fonts: 0,
      contents: []
    });
    common_vendor.onMounted(async () => {
      calculateChapterContent();
      const res = await api_index.getChapterContent(chapterInfo.novel_id, chapterInfo.chapter_n);
      chapterInfo.contents = pages_read_hook_splitContent.splitCurrentChapterContent(
        res.data.data[0].content,
        chapterInfo.page_fonts
      );
      getBottomInfo();
      isLoading.value = false;
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const calculateChapterContent = async () => {
      const instance = common_vendor.getCurrentInstance();
      const info = await utiles_getSelectorInfo.getSelectorInfo(instance, ".read-content");
      const lines = Math.floor(info.height / (contentStyleInfo.fontSize * contentStyleInfo.lineHeight));
      const line_fonts = Math.floor((info.width - 40) / contentStyleInfo.fontSize);
      const page_fonts = lines * line_fonts;
      chapterInfo.page_fonts = page_fonts;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      return common_vendor.e({
        a: common_vendor.p({
          loading: isLoading.value,
          bgColor: theme[0].backgroundColor,
          color: theme[0].color,
          ["loading-text"]: "加载中...",
          ["font-size"]: "24rpx"
        }),
        b: common_vendor.o(goBack),
        c: common_vendor.p({
          name: "arrow-left",
          color: theme[0].color
        }),
        d: theme[0].color,
        e: (_a = chapterInfo.contents[0]) == null ? void 0 : _a.content,
        f: common_vendor.s(contentStyle.value),
        g: common_vendor.t(currentTime.value),
        h: ((_b = batteryInfo.value) == null ? void 0 : _b.level) <= 10
      }, ((_c = batteryInfo.value) == null ? void 0 : _c.level) <= 10 ? {
        i: common_vendor.p({
          name: "battery-empty",
          ["custom-prefix"]: "custom-icon",
          size: "14",
          color: theme[0].color
        })
      } : ((_d = batteryInfo.value) == null ? void 0 : _d.level) > 10 && ((_e = batteryInfo.value) == null ? void 0 : _e.level) < 30 ? {
        k: common_vendor.p({
          name: "battery-low",
          ["custom-prefix"]: "custom-icon",
          size: "14",
          color: theme[0].color
        })
      } : ((_f = batteryInfo.value) == null ? void 0 : _f.level) >= 30 && ((_g = batteryInfo.value) == null ? void 0 : _g.level) < 50 ? {
        m: common_vendor.p({
          name: "battery-mid",
          ["custom-prefix"]: "custom-icon",
          size: "14",
          color: theme[0].color
        })
      } : ((_h = batteryInfo.value) == null ? void 0 : _h.level) >= 50 && ((_i = batteryInfo.value) == null ? void 0 : _i.level) < 90 ? {
        o: common_vendor.p({
          name: "battery-most",
          ["custom-prefix"]: "custom-icon",
          size: "14",
          color: theme[0].color
        })
      } : {
        p: common_vendor.p({
          name: "battery-full",
          ["custom-prefix"]: "custom-icon",
          size: "14",
          color: theme[0].color
        })
      }, {
        j: ((_j = batteryInfo.value) == null ? void 0 : _j.level) > 10 && ((_k = batteryInfo.value) == null ? void 0 : _k.level) < 30,
        l: ((_l = batteryInfo.value) == null ? void 0 : _l.level) >= 30 && ((_m = batteryInfo.value) == null ? void 0 : _m.level) < 50,
        n: ((_n = batteryInfo.value) == null ? void 0 : _n.level) >= 50 && ((_o = batteryInfo.value) == null ? void 0 : _o.level) < 90,
        q: theme[0].color,
        r: common_vendor.s(theme[0])
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9eaa75a3"]]);
wx.createPage(MiniProgramPage);

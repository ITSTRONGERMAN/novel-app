"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_loading_page2 = common_vendor.resolveComponent("uv-loading-page");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_read_more2 = common_vendor.resolveComponent("uv-read-more");
  (_easycom_uv_loading_page2 + _easycom_uv_icon2 + _easycom_uv_image2 + _easycom_uv_read_more2)();
}
const _easycom_uv_loading_page = () => "../../uni_modules/uv-loading-page/components/uv-loading-page/uv-loading-page.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_read_more = () => "../../uni_modules/uv-read-more/components/uv-read-more/uv-read-more.js";
if (!Math) {
  (_easycom_uv_loading_page + _easycom_uv_icon + _easycom_uv_image + _easycom_uv_read_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const novel = common_vendor.computed(() => store.state.currentNovelDetail);
    const isLoading = common_vendor.ref(true);
    const txtColor = common_vendor.ref("");
    const novel_chapters = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      await getCoverMainColor();
      await getChapters();
      isLoading.value = false;
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const getCoverMainColor = async () => {
      const {
        data: {
          data: maincolor
        }
      } = await api_index.calculateCoverMainColor(store.state.currentNovelDetail.cover);
      txtColor.value = maincolor;
    };
    const getChapters = async () => {
      const {
        data: chapters
      } = await api_index.getNovelChapters(24397);
      novel_chapters.value = chapters;
    };
    const goToChaptersPage = () => {
      store.commit("setCurrentNovelChapters", {
        novel_name: novel.value.name,
        chapters: novel_chapters.value
      });
      common_vendor.index.navigateTo({
        url: "/pages/chapters/chapters"
      });
    };
    const goToRead = () => {
      common_vendor.index.navigateTo({
        url: "/pages/read/read?novel_id=24397&chapter_n=1"
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.p({
          loading: isLoading.value,
          ["loading-text"]: "加载中...",
          ["font-size"]: "24rpx"
        }),
        b: common_vendor.o(goBack),
        c: common_vendor.p({
          bold: true,
          name: "arrow-left",
          color: txtColor.value == "white" ? "black" : "white",
          size: "28"
        }),
        d: common_vendor.p({
          src: novel.value.cover,
          ["lazy-load"]: true,
          observeLazyLoad: true,
          fade: true,
          radius: "5",
          width: "90",
          height: "120"
        }),
        e: common_vendor.t(novel.value.name),
        f: txtColor.value == "white" ? "black" : "white",
        g: common_vendor.t(novel.value.author),
        h: common_vendor.t(novel.value.genre),
        i: txtColor.value == "white" ? "black" : "white",
        j: `url(${novel.value.cover})`,
        k: common_vendor.t(novel.value.words_count),
        l: common_vendor.t(novel.value.status),
        m: common_vendor.t(novel.value.intro),
        n: common_vendor.p({
          ["show-height"]: "200rpx",
          toggle: true,
          color: "rgb(41, 121, 255)"
        }),
        o: common_vendor.t((_a = novel_chapters.value[novel_chapters.value.length - 1]) == null ? void 0 : _a.chapter_name),
        p: common_vendor.p({
          name: "arrow-right"
        }),
        q: common_vendor.o(goToChaptersPage),
        r: common_vendor.p({
          name: "bookshelfshujia",
          ["custom-prefix"]: "custom-icon",
          size: "20",
          color: "#000"
        }),
        s: common_vendor.o(goToRead)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2d6fc040"]]);
wx.createPage(MiniProgramPage);

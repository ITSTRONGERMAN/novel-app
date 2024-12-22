"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  _easycom_uv_image2();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
if (!Math) {
  _easycom_uv_image();
}
const _sfc_main = {
  __name: "novel-list",
  props: {
    novel: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const store = common_vendor.useStore();
    const props = __props;
    const goToNovelDetail = (detail) => {
      store.commit("setCurrentNovelDetail", props.novel);
      common_vendor.index.navigateTo({
        url: "/pages/nove-detail/index",
        animationType: "fade-in"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: __props.novel.cover,
          ["lazy-load"]: true,
          observeLazyLoad: true,
          fade: true,
          radius: "5",
          width: "90",
          height: "120"
        }),
        b: common_vendor.t(__props.novel.name),
        c: common_vendor.t(__props.novel.intro),
        d: common_vendor.t(__props.novel.status),
        e: common_vendor.t(__props.novel.words_count),
        f: common_vendor.o(goToNovelDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-092baf5a"]]);
wx.createComponent(Component);
